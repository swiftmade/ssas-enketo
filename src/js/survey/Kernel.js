import EnketoForm from './EnketoForm'
import queryParams from '../common/QueryParams'
const emitter = require('tiny-emitter/instance')

class Kernel {

    constructor() {
        this.saving = false
        this.validating = false
    }

    async boot() {
        EnketoForm.init()
    }

    async submit() {
        return EnketoForm
            .finishAndSubmit()
            .then(message => this.exit({
                message: message,
                message_type: 'success'
            }))
    }

    async _save() {
        await EnketoForm.save()
    }    

    async exit(message = null) {
        if (queryParams.has('return')) {
            return window.location = queryParams.getPath('return')
        }
        window.location = 'index.html?' + $.param(message)
    }

    async saveAndExit() {
        await this._save()
        await this.exit()
    }
}

export default new Kernel()
