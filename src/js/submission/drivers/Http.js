import Server from '../../common/Server'
import queryParams from '../../common/QueryParams'

export default class Http {

    constructor(session) {
        this.session = session
    }

    async submit() {
        return await Server.create().postForm(this.session)
    }
}