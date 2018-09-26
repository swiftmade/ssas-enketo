var $ = require('jquery')
//var submit = require('../../submit')

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
};

var _loadSessionFromUrl = function (url) {
    return new Promise(function (resolve) {
        $.getJSON(url).done(function (data) {
                var session = _getEmptySession();
                session.submitted = true;
                session.xml = data.instance;
                session.instance_id = data.instance_id;
                session.deprecated_id = data.deprecated_id;
                resolve(session);
            })
            .fail(function () {
                throw new Error("Could not load the document");
            });
    });
};

/**
 * In memory session is not stored anywhere.
 */
export default class InMemory {

    start() {
        // Removes the save button from UI
        $('.save-progress').remove();
        if ( ! queryParams.has('edit')) {
            return Promise.resolve(_getEmptySession());
        }
        return _loadSessionFromUrl(queryParams.getPath('edit'));
    }

    save(session) {
        // Do nothing...
        return session;
    }

    beforeEnd(session) {
        // Before ending the session, submit it to the server.
        return submit(
            queryParams.getPath('submit'),
            session
        );
    }


}