var storage = require("./storage");
var Promise = require('bluebird');
var sessionRepo = storage.instance("sessions");
var ImageCompressor = require("image-compressor.js");

ImageCompressor = new ImageCompressor();

// Files having greater size than this value (in bytes) will be optimized
var FILESIZE_TRESHOLD = 300000

function Optimizer(session, onProgressCb) {
    var id = session._id;
    var attachments = session._attachments;

    var progress = {
        total: 0,
        done: 0
    }

    function needsOptimization(attachment) {
        if (attachment.content_type.indexOf('image/') === -1) {
            return false; // This is not an image
        } else if (attachment.length < FILESIZE_TRESHOLD) {
            return false; // The file is already small enough
        }
        return true;
    }

    function getFileBlob(name, file) {
        if (session.hasOwnProperty('browser_mode')) {
            return Promise.resolve(file);
        }
        return sessionRepo.getAttachment(id, name);
    }

    function optimize(name, file) {
        return getFileBlob(name, file).then(function (blob) {
            return ImageCompressor.compress(blob, {
              maxWidth: 600,
              quality: 0.6,
              convertSize: 999999999 // prevent converting to JPG
            });
        }).then(function(result) {
            session._attachments[name] = {
                content_type: file.content_type,
                data: result
            }
            if (onProgressCb) {
                progress.done = progress.done + 1;
                onProgressCb(progress);
            }
        });
    }

    this.process = function() {
        
        var optimizableAttachments = [];
        
        for (var name in attachments) {
            if (needsOptimization(attachments[name])) {
                optimizableAttachments.push({
                    name: name,
                    attachment: attachments[name]
                })
            }
        }
        
        if ( ! optimizableAttachments.length) {
            return Promise.resolve(session);
        }
        
        // Set the total number of tasks to execute
        progress.total = optimizableAttachments.length;

        return Promise.reduce(optimizableAttachments, function (_, item) {
            return optimize(item.name, item.attachment)
        }, null).then(function() {
            if ( ! session.hasOwnProperty("browser_mode")) {
                return sessionRepo.update(session);
            }
            return session;
        });
    }
}

module.exports = function(session, onProgressCb) {
    var optimizer = new Optimizer(session, onProgressCb)
    return optimizer.process()
}