import axios from 'axios'
import queryParams from '../../common/QueryParams'

export default class Http {

    constructor(session) {
        this.session = session
    }

    async submit() {
        const submitUrl = queryParams.get('submit')

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

        // TODO: Document auth parameter
        if (queryParams.get('auth')) {
            headers['Authorization'] = 'Bearer ' + queryParams.get('auth')
        }

        if (typeof this.session.data.payload === 'object') {
            form.append(
                'Payload',
                JSON.serialize(this.session.data.payload)
            )
        }

        await axios.post(
            submitUrl,
            form,
            {headers}
        )
    }
}