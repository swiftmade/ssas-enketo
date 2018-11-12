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

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {

var en = __webpack_require__(111);

var lo = __webpack_require__(112);

var zh = __webpack_require__(113);

var _ = __webpack_require__(82);

var Cookies = {
  set: function set(key, value) {
    window.localStorage.setItem(key, value);
  },
  get: function get(key) {
    return window.localStorage.getItem(key);
  }
};
var i18n = {};
var languages = {
  "en": en,
  "lo": lo,
  "zh": zh
};
var fallback = en;

i18n.set = function (language) {
  //
  if (!languages.hasOwnProperty(language)) {
    console.error("Language not found: " + language);
    return;
  }

  this.language = language;
  this.translations = languages[language];
  this.translateDocument();
  Cookies.set("language", this.language);
};

i18n.get = function () {
  return this.language;
};

i18n._ = function (key, bindings) {
  if (bindings == undefined) {
    bindings = {};
  }

  var t = _.get(this.translations, key, _.get(fallback, key, ""));

  for (var key in bindings) {
    t = t.replace(new RegExp(":" + key, "g"), bindings[key]);
  }

  return t;
};

i18n.translateDocument = function () {
  var matches = document.querySelectorAll('[data-i18n]');

  for (var i = 0; i < matches.length; i++) {
    var el = matches[i];
    var key = el.getAttribute('data-i18n');

    var translation = this._(key);

    el.innerHTML = translation;
  }
};

document.onreadystatechange = function () {
  var language = Cookies.get("language");

  if (language == undefined) {
    language = "en";
  }

  i18n.set(language);
};

window.i18n = i18n;
module.exports = i18n;

/***/ }),

/***/ 111:
/***/ (function(module, exports) {

module.exports = {
  "index": {
    "upload": "Upload"
  },
  "survey": {
    "loading": "Loading Survey!",
    "wait": "This will take a few moments...",
    "errors": "Form contains errors, please fix all errors before submitting.",
    "saved": "Active session has been saved",
    "camera": "Camera",
    "save": "Save",
    "validate": "Validate",
    "first": "First",
    "last": "Last",
    "jump_to": "Jump To",
    "submit": "Validate &amp; Submit",
    "back": "Back",
    "next": "Next"
  },
  "session": {
    "title": "Survey Session",
    "description": "Start a New Session",
    "name": "Name this Session",
    "start": "Start"
  },
  "constraint": {
    "required": "This field is required.",
    "invalid": "Value not allowed"
  },
  "submissions": {
    "back": "Back",
    "upload_all": "Upload All",
    "upload_single": "Upload This",
    "title": "Upload Surveys",
    "uploaded": "Uploaded!",
    "name": "Name",
    "hint": "Hint",
    "size": "Size",
    "created_at": "Created At",
    "error": "An error occured while trying to submit packet named :packet",
    "success": "Packet named :packet has been submitted!"
  }
};

/***/ }),

/***/ 112:
/***/ (function(module, exports) {

module.exports = {
  "index": {
    "upload": "ອັບໂຫລດ"
  },
  "survey": {
    "loading": "ກໍາລັງໂຫລດ",
    "wait": "ລໍຖ້າ",
    "errors": "ຜິດພາດ",
    "saved": "ບັນທຶກໄວ້ແລ້ວ",
    "camera": "ກ້ອງຖ່າຍຮູບ",
    "save": "ບັນທຶກ",
    "validate": "ກວດສອບ",
    "first": "ຫນ້າທໍາອິດ",
    "last": "ໜ້າສຸດທ້າຍ",
    "jump_to": "ຄົ້ນຫາ",
    "submit": "ສົ່ງຂໍ້ມູນ",
    "back": "ກັບຄືນໄປບ່ອນເກົ່າ",
    "next": "ຕໍ່ໄປ"
  },
  "session": {
    "title": "ຫົວຂໍ້",
    "description": "ລາຍລະອຽດ",
    "name": "ຊື່",
    "start": "ເລີ່ມຕົ້ນ"
  },
  "constraint": {
    "required": "ຕ້ອງການ",
    "invalid": "ບໍ່ຖືກຕ້ອງ"
  },
  "submissions": {
    "back": "Back",
    "upload_all": "ອັບໂຫລດທັງຫມົດ",
    "upload_single": "ອັບໂຫລດ",
    "title": "ຢູ່ລະຫວ່າງການສົ່ງຂໍ້ມູນ",
    "uploaded": "ອັບ!",
    "name": "ຊື່",
    "hint": "Hint",
    "size": "ຂະຫນາດ",
    "created_at": "ປະດິດສ້າງຂື້ນໃນ",
    "error": "ຜິດພາດ :packet",
    "success": "ສໍາເລັດ :packet ຊຸດ"
  }
};

/***/ }),

/***/ 113:
/***/ (function(module, exports) {

module.exports = {
  "index": {
    "upload": "上传"
  },
  "survey": {
    "loading": "加载问卷！",
    "wait": "需要一些时间...",
    "errors": "表单包含错误，请在提交之前修复所有错误。",
    "saved": "已保存操作",
    "camera": "相机",
    "save": "保存",
    "validate": "确认",
    "first": "首页",
    "last": "末页",
    "search": "搜索",
    "submit": "确认并提交",
    "back": "返回",
    "next": "下一页"
  },
  "session": {
    "title": "问卷调查会话",
    "description": "开始一个新的会话",
    "name": "会话命名",
    "start": "开始"
  },
  "constraint": {
    "required": "此字段必填.",
    "invalid": "值不可用"
  },
  "submissions": {
    "upload_all": "上传所有",
    "upload_single": "上传此次数据",
    "title": "申请数据提交",
    "uploaded": "上传完成！",
    "name": "名称",
    "hint": "提示",
    "size": "大小",
    "created_at": "创建于",
    "error": "试图提交名为:packet的数据包时出错。",
    "success": "包名:packet已提交！"
  }
};

/***/ }),

/***/ 2:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var UrlSearchParams = __webpack_require__(157);

var queryParams = new UrlSearchParams(window.location.search);

queryParams.getPath = function (key) {
  return queryParams.getUrl(queryParams.get(key));
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

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Session; });
/* harmony import */ var _QueryParams__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Session =
/*#__PURE__*/
function () {
  function Session(data) {
    _classCallCheck(this, Session);

    this.data = _objectSpread({
      xml: null,
      online: false,
      draft: true,
      payload: {},
      _attachments: {},
      submitted: false,
      instance_id: null,
      deprecated_id: null,
      last_update: Date.now()
    }, data);

    if (!data.hasOwnProperty('payload')) {
      this._setPayloadFromUrl();
    }
  }

  _createClass(Session, [{
    key: "setData",
    value: function setData(data) {
      this.data = _objectSpread({}, this.data, data, {
        last_update: Date.now()
      });
      return this;
    }
  }, {
    key: "_setPayloadFromUrl",
    value: function _setPayloadFromUrl() {
      try {
        var sessionExtra = _QueryParams__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].get('session_extra');
        this.setData({
          payload: JSON.parse(sessionExtra)
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, {
    key: "writeEnketoForm",
    value: function writeEnketoForm(form) {
      this.setData({
        xml: form.xml,
        instance_id: form.instance_id,
        deprecated_id: form.deprecated_id,
        _attachments: this._getFiles(form.files)
      });
    }
  }, {
    key: "toFormInstance",
    value: function toFormInstance() {
      return {
        instanceStr: this.data.xml,
        submitted: this.data.submitted
      };
    }
  }, {
    key: "isOnline",
    value: function isOnline() {
      return this.data.online;
    }
  }, {
    key: "_getFiles",
    value: function _getFiles(files) {
      var _this = this;

      if (!files || _typeof(files) !== 'object') {
        return this.data._attachments;
      }

      var attachments = {};
      files.forEach(function (file) {
        // Mark already existing attachments as stub
        if (_this._isFileStub(file)) {
          if (_this._attachmentExists(file)) {
            attachments[file] = _objectSpread({}, _this.data._attachments[file], {
              stub: true
            });
          }

          return;
        }

        attachments[file.name] = {
          data: file,
          content_type: file.type
        };
      });
      return attachments;
    }
  }, {
    key: "_isFileStub",
    value: function _isFileStub(file) {
      return typeof file === 'string';
    }
  }, {
    key: "_attachmentExists",
    value: function _attachmentExists(name) {
      return this.data.hasOwnProperty('_attachments') && this.data._attachments.hasOwnProperty(name);
    }
  }]);

  return Session;
}();



/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/pouchdb/lib/index-browser.js
var index_browser = __webpack_require__(62);
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
var QueryParams = __webpack_require__(2);

// CONCATENATED MODULE: ./src/js/common/repositories/SessionRepository.js


var databaseName = 'sessions';

if (QueryParams["a" /* default */].has('db')) {
  databaseName = QueryParams["a" /* default */].get('db');
}

/* harmony default export */ var SessionRepository = __webpack_exports__["a"] = (getInstance(databaseName));

/***/ }),

/***/ 462:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 465:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/sass/submissions.scss
var submissions = __webpack_require__(462);

// EXTERNAL MODULE: ./src/js/i18n/i18n.js
var i18n_i18n = __webpack_require__(110);

// EXTERNAL MODULE: ./node_modules/angular/index.js
var node_modules_angular = __webpack_require__(43);

// EXTERNAL MODULE: ./node_modules/toastr/toastr.js
var toastr = __webpack_require__(27);
var toastr_default = /*#__PURE__*/__webpack_require__.n(toastr);

// EXTERNAL MODULE: ./src/js/common/Server.js
var Server = __webpack_require__(56);

// EXTERNAL MODULE: ./src/js/common/Session.js
var Session = __webpack_require__(22);

// EXTERNAL MODULE: ./src/js/common/repositories/SessionRepository.js + 1 modules
var SessionRepository = __webpack_require__(28);

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
      }; // TODO: Handle progress


      Server["a" /* default */].submit(new Session["a" /* default */](packet)).then(function (result) {
        return SessionRepository["a" /* default */].get(packet._id);
      }).then(function (session) {
        session.submitted = true;
        return SessionRepository["a" /* default */].update(session);
      }).then(function () {
        toastr_default.a.success(i18n._("submissions.success", {
          packet: packet.name
        }));
        $scope.remove(packet);
      }).catch(function (err) {
        packet.uploading = false;
        packet.uploaded = false;
        $scope.$apply();
        toastr_default.a.error(i18n._("submissions.error", {
          packet: packet.name
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
 * Localization Module
 */


/**
 * UI Controllers
 */




/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(61);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Server =
/*#__PURE__*/
function () {
  function Server() {
    _classCallCheck(this, Server);
  }

  _createClass(Server, [{
    key: "json",
    value: function () {
      var _json = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(url) {
        var _ref, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url);

              case 2:
                _ref = _context.sent;
                data = _ref.data;
                return _context.abrupt("return", data);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function json(_x) {
        return _json.apply(this, arguments);
      };
    }()
  }]);

  return Server;
}();

/* harmony default export */ __webpack_exports__["a"] = (new Server());

/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

var lodashSet = __webpack_require__(154);

module.exports = {
  get: function get(obj, path, def) {
    var fullPath = path.replace(/\[/g, ".").replace(/]/g, "").split(".").filter(Boolean);
    return fullPath.every(everyFunc) ? obj : def;

    function everyFunc(step) {
      return !(step && (obj = obj[step]) === undefined);
    }
  },
  set: lodashSet
};

/***/ })

},[[465,1,0]]]);
});