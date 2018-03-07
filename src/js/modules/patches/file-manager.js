/**
 * This patches the file-manager module from enketo-core
 * The aim of this patch is to be able to retrieve attachments stored inside PouchDB
 * The actual source for this module can be found here:
 * https://github.com/enketo/enketo-core/blob/master/src/js/file-manager.js
 */

var fileManager = require("enketo-core/src/js/file-manager");
var sessionRepo = require("../repositories/sessions-repository");
var queryParams = require("../utils/query-params");

fileManager.setSession = function(session) {
    console.log(session);
    this.session = session;
};

var originalGetFileUrl = fileManager.getFileUrl;

fileManager.getFileUrl = function (subject) {
    if (subject && typeof subject === 'string') {
        // In browser mode, load the attachments directly from the server
        if (this.session.browser_mode) {
            return Promise.resolve(
                queryParams.getUrl("submissions/" + this.session.instance_id + "/photo/" + subject)
            )
        }
        // When running against PouchDB load it from there
        return sessionRepo.getAttachment(this.session._id, subject).then(function(attachment) {
            return URL.createObjectURL(attachment);
        });
    }
    return originalGetFileUrl(subject);
}

module.exports = fileManager;