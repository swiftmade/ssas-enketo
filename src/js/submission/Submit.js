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

    async chooseDriver() {
        window.chooseMethod = (method) => {
            emitter.emit('Submit.method.choose', method)
        }
        emitter.emit(
            'EnketoForm.submit.status',
            '<div style="text-align:center">Please choose submission method <br>' +
            '<a href="#" id="instantSubmit__sms" role="button" style="margin:16px" onclick="chooseMethod(\'sms\')" class="btn btn-primary">SMS</a>' +
            '<a href="#" id="instantSubmit__http" role="button" style="margin:16px" onclick="chooseMethod(\'http\')" class="btn btn-primary">Internet</a>' +
            '</div>'
        )
        return new Promise((resolve) => {
            emitter.once('Submit.method.choose', (method) => {
                emitter.emit('EnketoForm.submit.status', 'Please wait...')
                if (method === 'sms') {
                    return resolve(new Sms(this.session))
                }
                return resolve(new Http(this.session))
            })
        })
    }

    async send() {
        
        let driver
        emitter.emit('EnketoForm.submitting')

        // If instant submit is turned on, and sms settings are configured
        // We need to ask the user to choose which method to use.
        if (queryParams.get('instant_submit') && queryParams.get('sms')) {
            driver = await this.chooseDriver()
        } else {
            driver = this.getDriver()
        }

        await driver.submit()
    }

    _updateStatus(text) {
        emitter.emit('EnketoForm.submit.status', text)
    }
}

export default function(session) {
    const submission = new Submission(session)
    return submission.send()
}