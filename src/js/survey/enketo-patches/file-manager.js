/**
 * This patches the file-manager module from enketo-core
 * The aim of this patch is to be able to retrieve attachments stored inside PouchDB
 * The actual source for this module can be found here:
 * https://github.com/enketo/enketo-core/blob/master/src/js/file-manager.js
 */
var fileManager = require("enketo-core/src/js/file-manager");

import queryParams from '../../common/QueryParams'
import sessionRepository from '../../common/repositories/SessionRepository'

// Preserve the original getFileUrl method
var originalGetFileUrl = fileManager.getFileUrl;

fileManager.setSession = function(session) {
    this.session = session;
};

fileManager.getFileUrlFromDatabase = function(subject) {
    return sessionRepo
        .getAttachment(this.session._id, subject)
        .then(function(attachment) {
            return URL.createObjectURL(attachment);
        });
};

fileManager.getFileUrlOnServer = function(subject) {
    return Promise.resolve(
        queryParams.getUrl(
            "submissions/"
            + this.session.instance_id
            + "/photo/" + subject
        )
    );
};

fileManager.getFileUrl = function (subject) {
    if (subject && typeof subject === 'string') {
        if (this.session.browser_mode) {
            // In browser mode, load the attachments directly from the server
            return this.getFileUrlOnServer(subject);
        }
        // When running against PouchDB load it from there
        return this.getFileUrlFromDatabase(subject);
    }
    return originalGetFileUrl(subject);
}

export default fileManager;