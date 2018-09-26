import EnketoForm from './EnketoForm'
import SurveyManager from './SurveyManager'
import SessionManager from './sessions/SessionManager'

class Kernel {

    constructor() {
        this.saving = false
        this.validating = false
    }

    async boot() {
        EnketoForm.init()
    }

    save() {

    }
}

export default new Kernel()
