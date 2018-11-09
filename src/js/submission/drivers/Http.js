
import queryParams from '../../common/QueryParams'

export default class Http {

    constructor(session) {
        this.session = session
    }

    async submit() {
        const submitUrl = queryParams.get('submit')
        await axios.post(submitUrl, this.session.data, {
            headers: {
                'X-OpenRosa-Version': '1.0',
                'X-OpenRosa-Instance-Id': this.session.data.instance_id,
                'X-OpenRosa-Deprecated-Id': this.session.data.deprecated_id,
            }
        })
    }
}