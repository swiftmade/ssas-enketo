import SurveyManager from './SurveyManager'
import SessionManager from './sessions/SessionManager'

class Kernel {

    async boot() {
        await SurveyManager.loadAndAttach()
        await SessionManager.start()
    }

}

export default new Kernel()