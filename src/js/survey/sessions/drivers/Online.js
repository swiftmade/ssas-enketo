import Server from '../../../common/Server'
import Session from '../../../common/Session'
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
            }))
        }
        return this._loadSessionFromUrl(queryParams.getPath('edit'))
    }

    canSave() {
        return false
    }

    async finalize(session) {
        await Server.submit(session)
    }

    async _loadSessionFromUrl(url) {
        const data = await Server.json(url)

        return new Session({
            submitted: true,
            xml: data.instance,
            instance_id: data.instance_id,
            deprecated_id: data.deprecated_id,
        })
    }
}