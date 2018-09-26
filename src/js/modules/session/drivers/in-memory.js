var $ = require('jquery')
var Promise = require('lie')
var submit = require('../../submit')
var queryParams = require('../../utils/query-params')

/**
 * In memory session is not stored anywhere.
 */
function InMemory() {

    this.start = function () {
        // Removes the save button from UI
        $('.save-progress').remove();
        if ( ! queryParams.has('edit')) {
            return Promise.resolve(_getEmptySession());
        }
        return _loadSessionFromUrl(queryParams.getPath('edit'));
    };

    this.save = function(session) {
        // Do nothing...
        return session;
    };

    this.beforeEnd = function (session) {
        // Before ending the session, submit it to the server.
        return submit(
            queryParams.getPath('submit'),
            session
        );
    };

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

    var _loadSessionFromUrl = function(url) {
        return new Promise(function(resolve) {
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
}

module.exports = new InMemory;