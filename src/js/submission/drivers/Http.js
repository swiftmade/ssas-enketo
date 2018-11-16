import Server from '../../common/Server'
import queryParams from '../../common/QueryParams'

export default class Http {

    constructor(session) {
        this.session = session
    }

    async submit() {
        const submitUrl = queryParams.getPath('submit')

        const form = new FormData()
        form.append('Date', new Date().toUTCString())
        form.append('xml_submission_file', new Blob([this.session.data.xml]))

        const headers = {
            'Content-Type': 'multipart/form-data',
            // Open-rosa Headers
            'X-OpenRosa-Version': '1.0',
            'X-OpenRosa-Instance-Id': this.session.data.instance_id,
            'X-OpenRosa-Deprecated-Id': this.session.data.deprecated_id,            
        }

        if (typeof this.session.data.payload === 'object') {
            form.append(
                'Payload',
                JSON.stringify(this.session.data.payload)
            )
        }

        await Server.postForm(
            submitUrl,
            form,
            headers
        )
    }
}