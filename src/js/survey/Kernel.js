import EnketoForm from './EnketoForm'
import queryParams from '../common/QueryParams'
const emitter = require('tiny-emitter/instance')
import SessionManager from './sessions/SessionManager'

class Kernel {

    constructor() {
        this.saving = false
        this.validating = false
    }

    async boot() {
        EnketoForm.init()
    }

    async exit() {
        await EnketoForm.save()
        if (queryParams.has('return')) {
            return window.location(queryParams.getUrl('return'))
        }
        window.location = 'index.html'
    }
}

export default new Kernel()
