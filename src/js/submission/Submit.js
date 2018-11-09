const emitter = require('tiny-emitter/instance')

import Sms from './drivers/Sms'
import Http from './drivers/Http'
import queryParams from '../common/QueryParams'

class Submission {

    constructor(session) {
        this.session = session
    }

    getDriver() {
        if(queryParams.has('sms')) {
            return new Sms(this.session)
        }
        return new Http(this.session)
    }

    async send() {
        emitter.emit('EnketoForm.submitting')
        await this.getDriver().submit()
        return new Promise(resolve => {})
    }

    _updateStatus(text) {
        emitter.emit('EnketoForm.submit.status', text)
    }
}

export default function(session) {
    const submission = new Submission(session)
    return submission.send()
}