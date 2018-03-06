var $ = require('jquery');
var Promise = require('lie');
var queryParams = require('./utils/query-params');

module.exports = function() {
    var session = {
        'xml': null,
        'draft': false,
        'submitted': false,
        'browser_mode': true,
        'instance_id': null,
        'deprecated_id': null
    };
    return new Promise(function(resolve) {
        if ( ! queryParams.has('edit')) {
            resolve(session);
            return;
        }
        $.getJSON(queryParams.getPath('edit'))
            .done(function(data) {
                session.submitted = true;
                session.xml = data.instance;
                session.instance_id = data.instance_id;
                session.deprecated_id = data.deprecated_id;
                resolve(session);
            })
            .fail(function() {
                throw new Error("Could not load the document");
            });
    });
};
