import Server from '../../../common/Server'
import Session from '../../../common/Session'
import Submit from '../../../submission/Submit'
import queryParams from '../../../common/QueryParams'

/**
 * Online session
 */
export default class Online {

    start() {
        if ( ! queryParams.has('edit')) {
            return Promise.resolve(new Session({
                online: true,
                draft: false,
                submitted: false,
            }))
        }
        return this._loadSessionFromUrl(queryParams.getPath('edit'))
    }

    canSave() {
        return false
    }

    async finalize(session) {
        await Submit(session)
    }

    async attachmentUrl(session, fileName) {
        return queryParams.getUrl(
            "submissions/" +
            session.data.instance_id +
            "/photo/" + fileName
        )
    }

    async _loadSessionFromUrl(url) {
        const data = await Server.create().json(url)

        return new Session({
            submitted: true,
            xml: data.instance,
            instance_id: data.instance_id,
            deprecated_id: data.deprecated_id,
        })
    }
}