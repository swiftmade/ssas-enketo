import EnketoForm from './EnketoForm'
import SurveyManager from './SurveyManager'
import SessionManager from './sessions/SessionManager'

class Kernel {

    async boot() {
        EnketoForm.init()
    }

}

export default new Kernel()