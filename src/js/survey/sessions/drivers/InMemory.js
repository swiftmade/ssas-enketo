var $ = require('jquery')
//var submit = require('../../submit')
import Server from '../../../common/Server'
import queryParams from '../../../common/QueryParams'

var _getEmptySession = function () {
    return {
        'xml': null,
        'draft': false,
        'submitted': false,
        'browser_mode': true,
        'instance_id': null,
        'deprecated_id': null
    };
}

/**
 * In memory session is not stored anywhere.
 */
export default class InMemory {

    start() {
        if ( ! queryParams.has('edit')) {
            return Promise.resolve(_getEmptySession());
        }
        return this._loadSessionFromUrl(queryParams.getPath('edit'))
    }

    canSave() {
        return false
    }

    beforeEnd(session) {
        // Before ending the session, submit it to the server.
        return submit(
            queryParams.getPath('submit'),
            session
        );
    }

    async _loadSessionFromUrl(url) {
        const session = _getEmptySession()
        const data = await Server.json(url)

        return {
            ...session,
            submitted: true,
            xml: data.instance,
            instance_id: data.instance_id,
            deprecated_id: data.deprecated_id,
        }
    }
}