import Server from "../common/Server";
import queryParams from "../common/QueryParams";

class SurveyManager {
  async loadAndAttach() {
    await this._load();
    this._preprocessFormHtml();
    this._attachSurveyFormToDom();
  }

  async _load() {
    this.survey = await Server.create().json(queryParams.getPath("survey"));

    if (queryParams.has("readonly")) {
      const $form = $(this.survey.form);
      $("input,select", $form).attr("readonly", "true()");
      this.survey.form = $form.prop("outerHTML");
    }
  }

  _preprocessFormHtml() {
    // Redirect dropbox links to assets folder
    this.survey.form = this.survey.form.replace(
      /jr:\/\/images\//g,
      queryParams.getPath("assets") + "/"
    );
  }

  _attachSurveyFormToDom() {
    document
      .querySelector(".form-header")
      .insertAdjacentHTML("afterend", this.survey.form);

    this._hideSurveyTitle();
  }

  _hideSurveyTitle() {
    if (queryParams.get("title") === "off") {
      document.getElementById("form-title").remove();
    }
  }
}

export default new SurveyManager();
