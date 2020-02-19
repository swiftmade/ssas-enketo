/**
 * This patches the file-manager module from enketo-core
 * The aim of this patch is to be able to retrieve attachments stored inside PouchDB
 * The actual source for this module can be found here:
 * https://github.com/enketo/enketo-core/blob/master/src/js/file-manager.js
 */
import fileManager from "enketo-core/src/js/file-manager";
import SessionManager from "../sessions/SessionManager";

// Preserve the original getFileUrl method
const originalGetFileUrl = fileManager.getFileUrl;

fileManager.getFileUrl = function(subject) {
  if (subject && typeof subject === "string") {
    return SessionManager.attachmentUrl(subject);
  }
  return originalGetFileUrl(subject);
};

export default fileManager;
