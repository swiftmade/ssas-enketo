(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return (window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/pouchdb/lib/index-browser.js
var index_browser = __webpack_require__(58);
var index_browser_default = /*#__PURE__*/__webpack_require__.n(index_browser);

// CONCATENATED MODULE: ./src/js/common/repositories/PouchDB.js

window.PouchDB = index_browser_default.a;

function getStorageDriver(name) {
  var storage = new index_browser_default.a(name, {
    adapter: 'idb',
    // We don't really want to keep revisions at all.
    revs_limit: 1,
    // Get rid of redundant documents after each write
    auto_compaction: true
  });
  return storage;
}

var instances = {};

function Storage(dbName) {
  var driver = getStorageDriver(dbName);

  this.all = function () {
    return driver.allDocs({
      include_docs: true
    }).then(function (result) {
      return result.rows.map(function (row) {
        return row.doc;
      });
    });
  };

  this.create = function (doc) {
    return driver.post(doc).then(function (result) {
      return driver.get(result.id);
    });
  };

  this.update = function (doc) {
    return driver.put(doc).then(function (result) {
      return driver.get(result.id);
    });
  };

  this.get = function (id) {
    return driver.get(id);
  };

  this.remove = function (doc) {
    return driver.remove(doc);
  };

  this.attach = function (id, attachmentId, blob) {
    return driver.putAttachment(id, attachmentId, blob);
  };

  this.getAttachment = function (id, filename) {
    return driver.getAttachment(id, filename);
  };
}

var getInstance = function getInstance(name) {
  if (!instances.hasOwnProperty(name)) {
    instances[name] = new Storage(name);
  }

  return instances[name];
};
// EXTERNAL MODULE: ./src/js/common/QueryParams.js
var QueryParams = __webpack_require__(4);

// CONCATENATED MODULE: ./src/js/common/repositories/SessionRepository.js


var databaseName = 'sessions';

if (QueryParams["a" /* default */].has('db')) {
  databaseName = QueryParams["a" /* default */].get('db');
}

/* harmony default export */ var SessionRepository = __webpack_exports__["a"] = (getInstance(databaseName));

/***/ }),

/***/ 4:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var UrlSearchParams = __webpack_require__(149);

var queryParams = new UrlSearchParams(window.location.search);

queryParams.getPath = function (key) {
  var path = '';

  if (queryParams.has('base')) {
    path = queryParams.get('base') + '/';
  }

  return path + queryParams.get(key);
};

queryParams.getUrl = function (uri) {
  var url = '';

  if (queryParams.has('base')) {
    url = queryParams.get('base') + '/';
  }

  return url + uri;
};

/* harmony default export */ __webpack_exports__["a"] = (queryParams);

/***/ }),

/***/ 460:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 463:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/sass/submissions.scss
var submissions = __webpack_require__(460);

// EXTERNAL MODULE: ./node_modules/angular/index.js
var node_modules_angular = __webpack_require__(40);

// EXTERNAL MODULE: ./src/js/common/repositories/SessionRepository.js + 1 modules
var SessionRepository = __webpack_require__(22);

// CONCATENATED MODULE: ./src/js/submission/ui/Submissions.js

var app = angular.module('app', []);
app.filter('fileSize', function () {
  return function (bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  };
});
app.filter('date', function () {
  return function (value) {
    var date = new Date(value);
    return date.toLocaleString();
  };
});
app.directive('progress', function () {
  return {
    scope: {
      value: '='
    },
    restrict: 'E',
    replace: true,
    template: '<div class="progress"> ' + '<div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="100" style="width: {{value}}%"> ' + '<span class="sr-only">{{value}}% Complete (success)</span> ' + '</div> ' + '</div>'
  };
});
app.controller('SubmissionsCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
  function loadPackets(showSubmitted) {
    return SessionRepository["a" /* default */].all().then(function (sessions) {
      $scope.packets = sessions.filter(function (session) {
        if (showSubmitted) {
          return !session.draft;
        }

        return !session.draft && !session.submitted;
      }).map(function (session) {
        var xmlSize = session.xml.length * 2;
        session.size = Object.values(session._attachments).reduce(function (total, attachment) {
          return total + attachment.length;
        }, xmlSize);
        return session;
      });
      $scope.$apply();
    });
  }
  /**
   * Only shows packets that haven't yet been uploaded
   */


  function loadPendingPackets() {
    return loadPackets(false);
  }
  /**
   * Shows all of the packets regardless of upload status
   */


  function loadAllPackets() {
    return loadPackets(true).then(function () {
      if (!$scope.packets.length) {
        alert('No submitted packets were found...');
      }

      document.querySelector('.reveal-all').remove();
    });
  } // Start by loading pending packets only...


  loadPendingPackets();

  $scope.revealAll = function () {
    loadAllPackets();
  };

  $scope.uploadAll = function () {
    angular.forEach($scope.packets, function (packet) {
      $scope.upload(packet);
    });
  };

  $scope.remove = function (packet) {
    $timeout(function () {
      var index = $scope.packets.indexOf(packet);

      if (index >= 0) {
        $scope.packets.splice(index, 1);
      }
    });
  };

  $scope.upload = function (packet) {
    $timeout(function () {
      if (packet.uploading) {
        return; // Already uploading.. Don't do anything
      }

      packet.uploading = true;
      packet.progress = 0;

      var onUploadProgress = function onUploadProgress(progress) {
        $timeout(function () {
          packet.progress = progress * 100;
        });
      };

      submit(queryParams.getPath("server"), packet, onUploadProgress).then(function (result) {
        return SessionRepository["a" /* default */].get(packet._id);
      }).then(function (session) {
        session.submitted = true;
        return SessionRepository["a" /* default */].update(session);
      }).then(function () {
        toastr.success(i18n._("submissions.success", {
          packet: packet.name
        }));
        $scope.remove(packet);
      }).catch(function (err) {
        packet.uploading = false;
        packet.uploaded = false;
        $scope.$apply();
        toastr.error(i18n._("submissions.error", {
          packet: next.packet.name
        }));
      });
    });
  };
}]);
// CONCATENATED MODULE: ./src/js/submissions.js
/**
 * Entrypoint for submissions.html
 */

/**
 * UI Controllers
 */




/***/ })

},[[463,1,0]]]);
});