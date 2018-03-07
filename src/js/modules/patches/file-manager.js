/**
 * This patches the file-manager module from enketo-core
 * The aim of this patch is to be able to retrieve attachments stored inside PouchDB
 * The actual source for this module can be found here:
 * https://github.com/enketo/enketo-core/blob/master/src/js/file-manager.js
 */

var fileManager = require("enketo-core/src/js/file-manager");
var sessionRepo = require("../repositories/sessions-repository");

fileManager.setSessionId = function(id) {
    this.sessionId = id;
};

var originalGetFileUrl = fileManager.getFileUrl;

fileManager.getFileUrl = function (subject) {
    if (subject && typeof subject === 'string') {
        return sessionRepo.getAttachment(this.sessionId, subject).then(function(attachment) {
            return URL.createObjectURL(attachment);
        });
    }
    return originalGetFileUrl(subject);
}

module.exports = fileManager;