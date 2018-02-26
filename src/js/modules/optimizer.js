var storage = require("./storage");
var sessionRepo = storage.instance("sessions");
var ImageCompressor = require("image-compressor.js");

ImageCompressor = new ImageCompressor();

// Files having greater size than this value (in bytes) will be optimized
var FILESIZE_TRESHOLD = 300000

function Optimizer(session) {
    var id = session._id;
    var attachments = session._attachments;

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
            return Promise.resolve(file.data)
        }
        return sessionRepo.getAttachment(id, name);
    }

    function optimize(name, file) {
        return getFileBlob(name, file).then(function (blob) {
            return ImageCompressor.compress(blob, {
              maxWidth: 600,
              quality: 0.7,
              convertSize: 999999999 // prevent converting to JPG
            });
        }).then(function(result) {
            session._attachments[name] = {
                'content_type': file.type,
                'data': result
            }
        });
    }

    this.process = function() {
        var promises = [];
        for (var name in attachments) {
            if (needsOptimization(attachments[name])) {
                promises.push(optimize(name, attachments[name]));
            }
        }
        if ( ! promises.length) {
            return Promise.resolve(session);
        }
        return Promise.all(promises).then(function() {
            if ( ! session.hasOwnProperty('browser_mode')) {
                return sessionRepo.update(session);
            }
            return session;
        });
    }
}

module.exports = function(session) {
    var optimizer = new Optimizer(session)
    return optimizer.process()
}