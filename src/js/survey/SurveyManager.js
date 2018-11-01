import Server from '../common/Server'
import queryParams from '../common/QueryParams'

class SurveyManager {

    async loadAndAttach() {
        await this._load()
        this._preprocessFormHtml()
        this._attachSurveyFormToDom()
    }

    async _load() {
        this.survey = await Server.json(queryParams.getPath('survey'))
    }

    _preprocessFormHtml() {
        // Redirect dropbox links to assets folder
        this.survey.form = this.survey.form.replace(
            /jr:\/\/images\//g,
            queryParams.getPath('assets') + '/'
        )
    }

    _attachSurveyFormToDom() {
        document.querySelector('.form-header')
            .insertAdjacentHTML('afterend', this.survey.form)
    }

}

export default new SurveyManager()