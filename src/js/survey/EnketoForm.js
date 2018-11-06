import * as $ from 'jquery'
import './enketo-patches/form-model'
import fileManager from './enketo-patches/file-manager'

const Form = require('enketo-core/src/js/Form')
const emitter = require('tiny-emitter/instance')

import SurveyManager from './SurveyManager'
import queryParams from '../common/QueryParams'
import SessionManager from './sessions/SessionManager'

const makeEmitter = silent => silent
    ? e => { /*do nothing*/ }
    : e => emitter.emit(e)

class EnketoForm {

    async init() {
        
        this.saving = false
        this.validating = false
        
        await SurveyManager.loadAndAttach()
        await SessionManager.start()
      
        this._newFormInstance()
        this._initFormInstance()
        this._localizeForm()

        emitter.emit('EnketoForm.initialized')
    }

    _newFormInstance() {
        this.form = new Form('form.or:eq(0)', {
            modelStr: SurveyManager.survey.model,
            ...SessionManager.session.toFormInstance(),
        })
    }

    _initFormInstance() {
        var loadErrors = this.form.init();
        if (loadErrors.length) {
            console.error(loadErrors);
            throw new Error("The form could not be initialized");
        }
    }

    _localizeForm() {
        if (queryParams.has("lang")) {
            i18n.set(queryParams.get("lang"))
        }
        var lang = i18n.get()
        this.form.langs.setAll(lang)
    }

    async save() {

        if (this.saving) {
            return null
        }

        this.saving = true
        emitter.emit('EnketoForm.saving')

        try {
            await this._saveSession()
        } catch(e) {
            this.saving = false
            emitter.emit('EnketoForm.saveFailed')
            throw e
        }

        this.saving = false
        emitter.emit('EnketoForm.saveSucceded')        
    }

    async _saveSession() {
        await SessionManager.save(
            await this._form()
        )
    }

    async _form() {
        return {
            xml: this.form.getDataStr(),
            files: await this._formFiles(),
            instance_id: this.form.instanceID,
            deprecated_id: this.form.deprecatedID,
        }
    }

    _formFiles() {
        /**
         * Get currently attached files from Enketo
         */
        let files = fileManager.getCurrentFiles()
        /**
         * Also append previously uploaded files, but as strings.
         */
        $('form.or input[type="file"][data-loaded-file-name]').each(function() {
            files.push($(this).data('loaded-file-name'));
        });
        return files
    }

    _validateForm() {
        // You can add ?novalidate=1 to the url to disable validation for that session
        if (queryParams.has("novalidate")) {
            return Promise.resolve(true);
        }
        return this.form.validate()
    }

    async validate(silent = false) {

        if (this.validating) {
            return
        }

        const emitEvent = makeEmitter(silent)

        this.validating = true
        emitEvent('EnketoForm.validating')
        const outcome = await this._validateForm()

        emitEvent(outcome
            ? 'EnketoForm.validationSucceeded'
            : 'EnketoForm.validationFailed'
        )

        this.validating = false
        return outcome
    }

    async finishAndSubmit() {

        const silent = true

        if (!(await this.validate(silent))) {
            throw new Error('Form cannot be submitted. Check validation errors!')
        }

        await SessionManager.finalize(
            await this._form()
        )
    }
}

export default new EnketoForm