const TaskQueue = require('../../libs/TaskQueue')
const compressImage = require('../../libs/ImageCompressor')
const sessionRepo = require('../../common/repositories/SessionRepository').default

// Files having greater size than this value (in bytes) will be optimized
var FILESIZE_TRESHOLD = 300000

function Optimizer(session, onProgressCb) {
  var id = session.data._id;
  var attachments = session.data._attachments;

  function needsOptimization(attachment) {
    if (attachment.content_type.indexOf('image/') === -1) {
      return false; // This is not an image
    } else if (attachment.length < FILESIZE_TRESHOLD) {
      return false; // The file is already small enough
    }
    return true;
  }

  function getFileBlob(name, file) {
    return Promise.resolve(file.data);
  }

  function optimize(name, file) {
    return getFileBlob(name, file)
      .then(function (blob) {
        return compressImage(blob, 600)
      })
      .then(function (result) {
        session.data._attachments[name] = {
          content_type: file.content_type,
          data: result
        };
      });
  }

  this.process = function () {
    // Create a new task queue to optimize photos sequentially
    var queue = new TaskQueue();
    // Register progress callback
    if (onProgressCb) {
      queue.onProgress(onProgressCb);
    }

    Object.keys(attachments).forEach(function (key) {
      var fileName = key;
      var file = attachments[key];

      if (needsOptimization(file)) {
        queue.add(function () {
          return optimize(fileName, file);
        });
      }
    });

    // If the queue is empty, no work is to be done.
    if (queue.isEmpty()) {
      return Promise.resolve(session);
    }

    return queue.run().then(function () {
      return session;
    });
  }
}

module.exports = function (session, onProgressCb) {
  var optimizer = new Optimizer(session, onProgressCb)
  return optimizer.process()
}