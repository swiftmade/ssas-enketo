import "./enketo-patches/form-model";
import fileManager from "./enketo-patches/file-manager";

import { Form } from "enketo-core";
const emitter = require("tiny-emitter/instance");

import SurveyManager from "./SurveyManager";
import queryParams from "../common/QueryParams";
import SessionManager from "./sessions/SessionManager";

const makeEmitter = silent =>
  silent
    ? e => {
        /*do nothing*/
      }
    : e => emitter.emit(e);

class EnketoForm {
  async init() {
    this.saving = false;
    this.validating = false;

    if (queryParams.has("lang")) {
      i18n.set(queryParams.get("lang"));
    }

    await SurveyManager.loadAndAttach();
    await SessionManager.start();

    this._newFormInstance();
    this._initFormInstance();

    emitter.emit("EnketoForm.initialized");
  }

  _newFormInstance() {
    this.form = new Form(
      "form.or:eq(0)",
      {
        modelStr: SurveyManager.survey.model,
        ...SessionManager.session.toFormInstance()
      },
      {
        language: i18n.get("lang")
      }
    );
  }

  _initFormInstance() {
    var loadErrors = this.form.init();
    if (loadErrors.length) {
      console.error(loadErrors);
      throw new Error("The form could not be initialized");
    }
    setTimeout(this._restoreLastPage.bind(this), 50);
  }

  async save() {
    if (this.saving) {
      return null;
    }

    this.saving = true;
    emitter.emit("EnketoForm.saving");

    try {
      await this._saveSession();
    } catch (e) {
      this.saving = false;
      emitter.emit("EnketoForm.saveFailed");
      throw e;
    }

    this.saving = false;
    emitter.emit("EnketoForm.saveSucceded");
  }

  async _saveSession() {
    await SessionManager.save(await this._form());
  }

  async _form() {
    return {
      xml: this.form.getDataStr(),
      files: await this._formFiles(),
      current_page: this._getCurrentPage(),
      instance_id: this.form.instanceID,
      deprecated_id: this.form.deprecatedID
    };
  }

  _getCurrentPage() {
    return [...this.form.pages.$activePages].indexOf(
      this.form.pages.$current[0]
    );
  }

  _restoreLastPage() {
    if (
      !SessionManager.session.data.current_page ||
      SessionManager.session.data.current_page <= 0
    ) {
      return;
    }
    const page = SessionManager.session.data.current_page;
    const pagesArr = [...this.form.pages.$activePages];

    if (pagesArr[page]) {
      this.form.pages.flipTo(pagesArr[page]);
    }
  }

  _formFiles() {
    /**
     * Get currently attached files from Enketo
     */
    let files = fileManager.getCurrentFiles();
    /**
     * Also append previously uploaded files, but as strings.
     */
    $('form.or input[type="file"][data-loaded-file-name]').each(function() {
      files.push($(this).data("loaded-file-name"));
    });
    return files;
  }

  _validateForm() {
    // You can add ?novalidate=1 to the url to disable validation for that session
    if (queryParams.has("novalidate")) {
      return Promise.resolve(true);
    }
    return this.form.validate();
  }

  async validate(silent = false) {
    if (this.validating) {
      return;
    }

    const emitEvent = makeEmitter(silent);

    this.validating = true;
    emitEvent("EnketoForm.validating");
    const outcome = await this._validateForm();

    emitEvent(
      outcome ? "EnketoForm.validationSucceeded" : "EnketoForm.validationFailed"
    );

    this.validating = false;
    return outcome;
  }

  async finishAndSubmit() {
    const silent = true;

    if (!(await this.validate(silent))) {
      throw new Error("Form cannot be submitted. Check validation errors!");
    }

    try {
      await SessionManager.finalize(await this._form());
    } catch (e) {
      emitter.emit("EnketoForm.submitFailed", e);
      throw e;
    }

    if (SessionManager.driver.canSave() && !queryParams.get("instant_submit")) {
      return "Survey finished. It's ready to upload!";
    }
    return "Submission completed. Thank you!";
  }
}

export default new EnketoForm();
