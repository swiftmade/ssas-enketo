import './enketo-patches/form-model'
import fileManager from './enketo-patches/file-manager'

const Form = require('enketo-core/src/js/Form')
const emitter = require('tiny-emitter/instance')

import SurveyManager from './SurveyManager'
import queryParams from '../common/QueryParams'
import SessionManager from './sessions/SessionManager'

class EnketoForm {

    async init() {
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
            instanceStr: SessionManager.session.xml,
            submitted: SessionManager.session.submitted,
            session: SessionManager.session.payload,
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

    async record() {
        return {
            xml: this.form.getDataStr(),
            files: await this.formFiles(),
            instance_id: this.form.instanceID,
            deprecated_id: this.form.deprecatedID,
        }
    }

    formFiles() {
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

}

export default new EnketoForm