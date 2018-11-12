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
return (window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

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

/***/ 27:
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

/***/ 372:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 379:
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * This patches the Form-model module from enketo-core
 * The aim of this patch is to allow arbitrarily adding session parameters to the survey file
 * https://github.com/enketo/enketo-core/blob/master/src/js/form-model.js
 */
var FormModel = __webpack_require__(155);

var parser = new DOMParser();

FormModel.prototype.createSession = function (id, sessObj) {
  var instance;
  var session;
  var model = this.xml.querySelector('model');

  if (!model) {
    return;
  }

  sessObj = _typeof(sessObj) === 'object' ? sessObj : {};
  instance = model.querySelector('instance[id="' + id + '"]');

  if (!instance) {
    instance = parser.parseFromString('<instance id="' + id + '"/>', 'text/xml').documentElement;
    this.xml.adoptNode(instance);
    model.appendChild(instance);
  } // fixed: /sesssion/context properties


  Object.keys(sessObj).forEach(function (prop) {
    sessObj[prop] = sessObj[prop] || utils.readCookie('__enketo_meta_' + prop) || prop + ' not found';
  });
  session = parser.parseFromString('<session><context>' + Object.keys(sessObj).map(function (prop) {
    return '<' + prop + '>' + sessObj[prop] + '</' + prop + '>';
  }).join('') + '</context></session>', 'text/xml').documentElement;
  this.xml.adoptNode(session);
  instance.appendChild(session);
};

module.exports = FormModel;

/***/ }),

/***/ 464:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/sass/survey.scss
var survey = __webpack_require__(372);

// EXTERNAL MODULE: ./src/js/i18n/i18n.js
var i18n_i18n = __webpack_require__(110);

// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.js
var jquery = __webpack_require__(1);
var jquery_default = /*#__PURE__*/__webpack_require__.n(jquery);

// CONCATENATED MODULE: ./src/js/plugins/overlay.js


(function () {
  var $body = jquery('body');

  function showOverlay($el) {
    jquery(window).scrollTop(0);
    setTimeout(function () {
      $body.addClass("noScroll");
      $el.show();
    });
  }

  function hideOverlay($el) {
    $body.removeClass('noScroll');
    $el.hide();
  }

  jquery["fn"].overlay = jquery["fn"].overlay = function (action) {
    switch (action) {
      case "show":
        showOverlay(this);
        break;

      case "hide":
        hideOverlay(this);
        break;

      default:
        throw new Exception("Unknown action. Either use show or hide.");
    }

    return this;
  };
})();
// EXTERNAL MODULE: ./node_modules/toastr/toastr.js
var toastr = __webpack_require__(34);
var toastr_default = /*#__PURE__*/__webpack_require__.n(toastr);

// EXTERNAL MODULE: ./node_modules/angular/index.js
var angular = __webpack_require__(43);
var angular_default = /*#__PURE__*/__webpack_require__.n(angular);

// EXTERNAL MODULE: ./node_modules/v-accordion/index.js
var v_accordion = __webpack_require__(376);

// CONCATENATED MODULE: ./src/js/survey/ui/JumpTo.js




var emitter = __webpack_require__(41);

var app = angular_default.a.module('jumpTo', ['vAccordion']);

var _ = __webpack_require__(82);

app.controller("jumpCtrl", ['$scope', function ($scope) {
  var rawPages = [];
  $scope.pages = {};
  $scope.search = {
    label: ""
  };
  emitter.on('EnketoForm.initialized', function () {
    return $scope.$apply(function () {
      jquery('[role="page"]').each(function () {
        var page = jquery(this);
        var labels = jquery(".question-label.active", page);
        labels.each(function () {
          var label = jquery(this).text();

          if (label.length < 2 || label[1] != ".") {
            return;
          }

          var firstSpace = label.indexOf(" ");
          var notations = label.substr(0, firstSpace).split(".").filter(function (str) {
            return str != '';
          });
          rawPages.push({
            el: page.children().first(),
            notations: notations,
            label: label
          });
        });
      });
      rawPages.forEach(function (page) {
        _.set($scope.pages, page.notations.join(".items."), page);

        if (page.notations.length > 1) {
          // lose something in the beginning
          page.notations.pop();
          var parentPage = page.notations.join(".items.");

          if (_.get($scope.pages, parentPage + ".label", null) == null) {
            _.set($scope.pages, parentPage + ".label", page.label);

            _.set($scope.pages, parentPage + ".el", page.el);
          }
        }
      });
    });
  });

  $scope.jump = function (page) {
    $scope.accordion.collapseAll();
    form.pages.flipToPageContaining(page.el);
    setTimeout(function () {
      jquery("#jump-to-block").overlay("hide");
    });
  };

  jquery("#jump-to-close").click(function () {
    $scope.accordion.collapseAll();
    jquery("#jump-to-block").overlay("hide");
  });
}]);
jquery("#jump-to").click(function () {
  jquery("#jump-to-block").overlay("show");
});
jquery("#jump-to-block").hide();
angular_default.a.bootstrap(document.getElementById('jump-to-block'), ["jumpTo"]);
// EXTERNAL MODULE: ./src/js/survey/enketo-patches/form-model.js
var form_model = __webpack_require__(379);

// EXTERNAL MODULE: ./src/js/common/QueryParams.js
var QueryParams = __webpack_require__(2);

// EXTERNAL MODULE: ./src/js/common/Server.js
var Server = __webpack_require__(56);

// EXTERNAL MODULE: ./src/js/common/Session.js
var Session = __webpack_require__(22);

// CONCATENATED MODULE: ./src/js/submission/drivers/Sms.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var Sms_emitter = __webpack_require__(41);

var Sms_Sms =
/*#__PURE__*/
function () {
  function Sms(session) {
    _classCallCheck(this, Sms);

    this.session = session;
  }

  _createClass(Sms, [{
    key: "transcode",
    value: function transcode(xml) {
      return new Sms_EnketoXmlParser(xml).parse();
    }
  }, {
    key: "objectToText",
    value: function objectToText(object) {
      return Object.keys(object).map(function (key) {
        return "".concat(key, ":").concat(object[key]);
      }).join(';');
    }
  }, {
    key: "submit",
    value: function () {
      var _submit = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var number, output, smsLink;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                number = QueryParams["a" /* default */].get('sms');
                output = _objectSpread({}, _typeof(this.session.data.payload) === 'object' ? this.session.data.payload : {}, this.transcode(this.session.data.xml));
                smsLink = this._smsLink(number, this.objectToText(output));

                window.clickSendSms = function () {
                  Sms_emitter.emit('SMS.click');
                };

                Sms_emitter.emit('EnketoForm.submit.status', '<a href="' + smsLink + '" class="btn btn-primary" target="_blank" onclick="clickSendSms()">Click here to send SMS</a>');
                return _context.abrupt("return", new Promise(function (resolve) {
                  Sms_emitter.once('SMS.click', function () {
                    setTimeout(resolve, 200);
                  });
                }));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function submit() {
        return _submit.apply(this, arguments);
      };
    }()
  }, {
    key: "_smsLink",
    value: function _smsLink(number, body) {
      var sms = 'sms:' + encodeURIComponent(number);

      if (this._isPlatformApple()) {
        return sms + '&body=' + encodeURIComponent(body);
      }

      return sms + '?body=' + encodeURIComponent(body);
    }
  }, {
    key: "_isPlatformApple",
    value: function _isPlatformApple() {
      var userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipod|ipad|os\sx/.test(userAgent);
    }
  }]);

  return Sms;
}();


var IGNORED_TAGS = ['meta', 'start', 'end', 'today', 'username', 'simserial', 'subscriberid', 'deviceid', 'phonenumber'];

var Sms_EnketoXmlParser =
/*#__PURE__*/
function () {
  function EnketoXmlParser(xml) {
    _classCallCheck(this, EnketoXmlParser);

    this.$xml = jquery_default()(jquery_default.a.parseXML(xml));
    this.output = {};
  }

  _createClass(EnketoXmlParser, [{
    key: "parse",
    value: function parse() {
      this._appendMeta();

      this._appendFromNodes(this.$xml.find('data').children());

      return this.output;
    }
  }, {
    key: "_appendMeta",
    value: function _appendMeta() {
      var meta = this.$xml.find('meta');

      this._appendFromNodes(meta.children());
    }
  }, {
    key: "_appendFromNodes",
    value: function _appendFromNodes($children) {
      var _this = this;

      $children.each(function () {
        if (jquery_default()(this).children().length) {
          return _this._appendFromNodes(jquery_default()(this).children());
        }

        var node = jquery_default()(this)[0];

        if (IGNORED_TAGS.includes(node.nodeName)) {
          return;
        } else if (node.getAttribute('type') === 'file') {
          return;
        } else if (!node.textContent) {
          return;
        } else {
          _this.output[node.nodeName] = node.textContent;
        }
      });
    }
  }]);

  return EnketoXmlParser;
}();
// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__(61);
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);

// CONCATENATED MODULE: ./src/js/submission/drivers/Http.js
function Http_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Http_typeof = function _typeof(obj) { return typeof obj; }; } else { Http_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Http_typeof(obj); }

function Http_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function Http_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { Http_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { Http_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function Http_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Http_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Http_createClass(Constructor, protoProps, staticProps) { if (protoProps) Http_defineProperties(Constructor.prototype, protoProps); if (staticProps) Http_defineProperties(Constructor, staticProps); return Constructor; }




var Http_Http =
/*#__PURE__*/
function () {
  function Http(session) {
    Http_classCallCheck(this, Http);

    this.session = session;
  }

  Http_createClass(Http, [{
    key: "submit",
    value: function () {
      var _submit = Http_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var submitUrl, form, headers;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                submitUrl = QueryParams["a" /* default */].get('submit');
                form = new FormData();
                form.append('Date', new Date().toUTCString());
                form.append('xml_submission_file', new Blob([this.session.data.xml]));
                headers = {
                  'Content-Type': 'multipart/form-data',
                  // Open-rosa Headers
                  'X-OpenRosa-Version': '1.0',
                  'X-OpenRosa-Instance-Id': this.session.data.instance_id,
                  'X-OpenRosa-Deprecated-Id': this.session.data.deprecated_id // TODO: Document auth parameter

                };

                if (QueryParams["a" /* default */].get('auth')) {
                  headers['Authorization'] = 'Bearer ' + QueryParams["a" /* default */].get('auth');
                }

                if (Http_typeof(this.session.data.payload) === 'object') {
                  form.append('Payload', JSON.stringify(this.session.data.payload));
                }

                _context.next = 9;
                return axios_default.a.post(submitUrl, form, {
                  headers: headers
                });

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function submit() {
        return _submit.apply(this, arguments);
      };
    }()
  }]);

  return Http;
}();


// CONCATENATED MODULE: ./src/js/submission/Submit.js
function Submit_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function Submit_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { Submit_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { Submit_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function Submit_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Submit_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Submit_createClass(Constructor, protoProps, staticProps) { if (protoProps) Submit_defineProperties(Constructor.prototype, protoProps); if (staticProps) Submit_defineProperties(Constructor, staticProps); return Constructor; }

var Submit_emitter = __webpack_require__(41);





var Submit_Submission =
/*#__PURE__*/
function () {
  function Submission(session) {
    Submit_classCallCheck(this, Submission);

    this.session = session;
  }

  Submit_createClass(Submission, [{
    key: "getDriver",
    value: function getDriver() {
      if (QueryParams["a" /* default */].has('sms')) {
        return new Sms_Sms(this.session);
      }

      return new Http_Http(this.session);
    }
  }, {
    key: "chooseDriver",
    value: function () {
      var _chooseDriver = Submit_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                window.chooseMethod = function (method) {
                  Submit_emitter.emit('Submit.method.choose', method);
                };

                Submit_emitter.emit('EnketoForm.submit.status', '<div style="text-align:center">Please choose submission method <br>' + '<a href="#" role="button" style="margin:16px" onclick="chooseMethod(\'sms\')" class="btn btn-primary">SMS</a>' + '<a href="#" role="button" style="margin:16px" onclick="chooseMethod(\'http\')" class="btn btn-primary">Internet</a>' + '</div>');
                return _context.abrupt("return", new Promise(function (resolve) {
                  Submit_emitter.once('Submit.method.choose', function (method) {
                    Submit_emitter.emit('EnketoForm.submit.status', 'Please wait...');

                    if (method === 'sms') {
                      return resolve(new Sms_Sms(_this.session));
                    }

                    return resolve(new Http_Http(_this.session));
                  });
                }));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function chooseDriver() {
        return _chooseDriver.apply(this, arguments);
      };
    }()
  }, {
    key: "send",
    value: function () {
      var _send = Submit_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var driver;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                Submit_emitter.emit('EnketoForm.submitting');

                if (!QueryParams["a" /* default */].get('instant_submit')) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 4;
                return this.chooseDriver();

              case 4:
                driver = _context2.sent;
                _context2.next = 8;
                break;

              case 7:
                driver = this.getDriver();

              case 8:
                _context2.next = 10;
                return driver.submit();

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function send() {
        return _send.apply(this, arguments);
      };
    }()
  }, {
    key: "_updateStatus",
    value: function _updateStatus(text) {
      Submit_emitter.emit('EnketoForm.submit.status', text);
    }
  }]);

  return Submission;
}();

/* harmony default export */ var Submit = (function (session) {
  var submission = new Submit_Submission(session);
  return submission.send();
});
// CONCATENATED MODULE: ./src/js/survey/sessions/drivers/Online.js
function Online_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function Online_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { Online_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { Online_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function Online_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Online_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Online_createClass(Constructor, protoProps, staticProps) { if (protoProps) Online_defineProperties(Constructor.prototype, protoProps); if (staticProps) Online_defineProperties(Constructor, staticProps); return Constructor; }





/**
 * Online session
 */

var Online_Online =
/*#__PURE__*/
function () {
  function Online() {
    Online_classCallCheck(this, Online);
  }

  Online_createClass(Online, [{
    key: "start",
    value: function start() {
      if (!QueryParams["a" /* default */].has('edit')) {
        return Promise.resolve(new Session["a" /* default */]({
          online: true,
          draft: false
        }));
      }

      return this._loadSessionFromUrl(QueryParams["a" /* default */].getPath('edit'));
    }
  }, {
    key: "canSave",
    value: function canSave() {
      return false;
    }
  }, {
    key: "finalize",
    value: function () {
      var _finalize = Online_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(session) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Submit(session);

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function finalize(_x) {
        return _finalize.apply(this, arguments);
      };
    }()
  }, {
    key: "attachmentUrl",
    value: function () {
      var _attachmentUrl = Online_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(session, fileName) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", QueryParams["a" /* default */].getUrl("submissions/" + session.data.instance_id + "/photo/" + fileName));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function attachmentUrl(_x2, _x3) {
        return _attachmentUrl.apply(this, arguments);
      };
    }()
  }, {
    key: "_loadSessionFromUrl",
    value: function () {
      var _loadSessionFromUrl2 = Online_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(url) {
        var data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return Server["a" /* default */].json(url);

              case 2:
                data = _context3.sent;
                return _context3.abrupt("return", new Session["a" /* default */]({
                  submitted: true,
                  xml: data.instance,
                  instance_id: data.instance_id,
                  deprecated_id: data.deprecated_id
                }));

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function _loadSessionFromUrl(_x4) {
        return _loadSessionFromUrl2.apply(this, arguments);
      };
    }()
  }]);

  return Online;
}();


// EXTERNAL MODULE: ./src/js/common/repositories/SessionRepository.js + 1 modules
var SessionRepository = __webpack_require__(27);

// CONCATENATED MODULE: ./src/js/survey/sessions/drivers/Offline.js
function Offline_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function Offline_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { Offline_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { Offline_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function Offline_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Offline_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Offline_createClass(Constructor, protoProps, staticProps) { if (protoProps) Offline_defineProperties(Constructor.prototype, protoProps); if (staticProps) Offline_defineProperties(Constructor, staticProps); return Constructor; }




var Offline_emitter = __webpack_require__(41);



/**
 * Offline session is stored on the device using IndexedDB (pouchdb)
 */

var Offline_Offline =
/*#__PURE__*/
function () {
  function Offline() {
    Offline_classCallCheck(this, Offline);
  }

  Offline_createClass(Offline, [{
    key: "start",
    value: function () {
      var _start = Offline_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._loadSessions();

              case 2:
                return _context.abrupt("return", this._chooseSession());

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function start() {
        return _start.apply(this, arguments);
      };
    }()
  }, {
    key: "canSave",
    value: function canSave() {
      return true;
    }
  }, {
    key: "save",
    value: function () {
      var _save = Offline_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(session) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = Session["a" /* default */];
                _context2.next = 3;
                return SessionRepository["a" /* default */].update(session.data);

              case 3:
                _context2.t1 = _context2.sent;
                return _context2.abrupt("return", new _context2.t0(_context2.t1));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function save(_x) {
        return _save.apply(this, arguments);
      };
    }()
  }, {
    key: "finalize",
    value: function () {
      var _finalize = Offline_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(session) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!QueryParams["a" /* default */].has('instant_submit')) {
                  _context3.next = 4;
                  break;
                }

                _context3.next = 3;
                return Submit(session);

              case 3:
                return _context3.abrupt("return", _context3.sent);

              case 4:
                _context3.next = 6;
                return this.save(session.setData({
                  draft: false
                }));

              case 6:
                return _context3.abrupt("return", _context3.sent);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function finalize(_x2) {
        return _finalize.apply(this, arguments);
      };
    }()
  }, {
    key: "attachmentUrl",
    value: function () {
      var _attachmentUrl = Offline_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(session, fileName) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", SessionRepository["a" /* default */].getAttachment(session.data._id, fileName).then(function (f) {
                  return URL.createObjectURL(f);
                }));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function attachmentUrl(_x3, _x4) {
        return _attachmentUrl.apply(this, arguments);
      };
    }()
  }, {
    key: "_loadSessions",
    value: function () {
      var _loadSessions2 = Offline_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return SessionRepository["a" /* default */].all();

              case 2:
                this.sessions = _context5.sent;
                Offline_emitter.emit('SessionModal.updateSessions', this.sessions.filter(function (session) {
                  return session.draft;
                }));

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function _loadSessions() {
        return _loadSessions2.apply(this, arguments);
      };
    }()
  }, {
    key: "_chooseSession",
    value: function () {
      var _chooseSession2 = Offline_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!QueryParams["a" /* default */].has('session')) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return", this._startFromName(QueryParams["a" /* default */].get('session')));

              case 2:
                return _context6.abrupt("return", this._sessionFromUi());

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function _chooseSession() {
        return _chooseSession2.apply(this, arguments);
      };
    }()
  }, {
    key: "_sessionFromUi",
    value: function () {
      var _sessionFromUi2 = Offline_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8() {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                Offline_emitter.emit('SessionModal.activate');
                return _context8.abrupt("return", new Promise(function (resolve) {
                  Offline_emitter.once('Session.create', function (name) {
                    resolve(_this._startFromName(name));
                  });
                  Offline_emitter.on('Session.delete',
                  /*#__PURE__*/
                  function () {
                    var _ref = Offline_asyncToGenerator(
                    /*#__PURE__*/
                    regeneratorRuntime.mark(function _callee7(session) {
                      return regeneratorRuntime.wrap(function _callee7$(_context7) {
                        while (1) {
                          switch (_context7.prev = _context7.next) {
                            case 0:
                              _context7.next = 2;
                              return SessionRepository["a" /* default */].remove(session);

                            case 2:
                              _context7.next = 4;
                              return _this._loadSessions();

                            case 4:
                            case "end":
                              return _context7.stop();
                          }
                        }
                      }, _callee7, this);
                    }));

                    return function (_x5) {
                      return _ref.apply(this, arguments);
                    };
                  }());
                  Offline_emitter.on('Session.select', function (session) {
                    resolve(new Session["a" /* default */](session));
                  });
                }));

              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function _sessionFromUi() {
        return _sessionFromUi2.apply(this, arguments);
      };
    }()
  }, {
    key: "_startFromName",
    value: function () {
      var _startFromName2 = Offline_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(name) {
        var existingSession;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                existingSession = this.sessions.find(function (s) {
                  return s.name == name;
                });

                if (!existingSession) {
                  _context9.next = 3;
                  break;
                }

                return _context9.abrupt("return", new Session["a" /* default */](existingSession));

              case 3:
                return _context9.abrupt("return", this._createFromName(name));

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function _startFromName(_x6) {
        return _startFromName2.apply(this, arguments);
      };
    }()
  }, {
    key: "_create",
    value: function () {
      var _create2 = Offline_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10(data) {
        var session, savedSessionData;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                session = new Session["a" /* default */](data);
                _context10.next = 3;
                return SessionRepository["a" /* default */].create(session.data);

              case 3:
                savedSessionData = _context10.sent;
                return _context10.abrupt("return", new Session["a" /* default */](savedSessionData));

              case 5:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      return function _create(_x7) {
        return _create2.apply(this, arguments);
      };
    }()
  }, {
    key: "_createFromName",
    value: function () {
      var _createFromName2 = Offline_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee11(name) {
        var payload,
            _args11 = arguments;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                payload = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : {};

                if (QueryParams["a" /* default */].has('session_extra')) {
                  payload = JSON.parse(QueryParams["a" /* default */].get('session_extra'));
                }

                return _context11.abrupt("return", this._create({
                  name: name,
                  payload: payload
                }));

              case 3:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      return function _createFromName(_x8) {
        return _createFromName2.apply(this, arguments);
      };
    }()
  }]);

  return Offline;
}();


// CONCATENATED MODULE: ./src/js/survey/sessions/SessionDrivers.js



var AVAILABLE_DRIVERS = {
  'online': Online_Online,
  'offline': Offline_Offline
};
/* harmony default export */ var SessionDrivers = ({
  getDriver: function getDriver() {
    var mode = QueryParams["a" /* default */].get('mode');
    var driver = AVAILABLE_DRIVERS[mode ? mode : 'offline'];
    return new driver();
  }
});
// CONCATENATED MODULE: ./src/js/survey/sessions/SessionManager.js
function SessionManager_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function SessionManager_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { SessionManager_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { SessionManager_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function SessionManager_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function SessionManager_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function SessionManager_createClass(Constructor, protoProps, staticProps) { if (protoProps) SessionManager_defineProperties(Constructor.prototype, protoProps); if (staticProps) SessionManager_defineProperties(Constructor, staticProps); return Constructor; }



var SessionManager_SessionManager =
/*#__PURE__*/
function () {
  function SessionManager() {
    SessionManager_classCallCheck(this, SessionManager);

    this.driver = SessionDrivers.getDriver();
  }

  SessionManager_createClass(SessionManager, [{
    key: "start",
    value: function () {
      var _start = SessionManager_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.driver.start();

              case 2:
                this.session = _context.sent;

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function start() {
        return _start.apply(this, arguments);
      };
    }()
  }, {
    key: "attachmentUrl",
    value: function () {
      var _attachmentUrl = SessionManager_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(fileName) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.driver.attachmentUrl(this.session, fileName);

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function attachmentUrl(_x) {
        return _attachmentUrl.apply(this, arguments);
      };
    }()
  }, {
    key: "finalize",
    value: function () {
      var _finalize = SessionManager_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(form) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.driver.canSave()) {
                  _context3.next = 5;
                  break;
                }

                _context3.next = 3;
                return this.save(form);

              case 3:
                _context3.next = 6;
                break;

              case 5:
                this.session.writeEnketoForm(form);

              case 6:
                _context3.next = 8;
                return this.driver.finalize(this.session);

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function finalize(_x2) {
        return _finalize.apply(this, arguments);
      };
    }() // Form 

  }, {
    key: "save",
    value: function () {
      var _save = SessionManager_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(form) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (this.driver.canSave()) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return", Promise.resolve(true));

              case 2:
                this.session.writeEnketoForm(form);
                _context4.next = 5;
                return this.driver.save(this.session);

              case 5:
                this.session = _context4.sent;

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function save(_x3) {
        return _save.apply(this, arguments);
      };
    }()
  }]);

  return SessionManager;
}();

/* harmony default export */ var sessions_SessionManager = (new SessionManager_SessionManager());
// CONCATENATED MODULE: ./src/js/survey/enketo-patches/file-manager.js
/**
 * This patches the file-manager module from enketo-core
 * The aim of this patch is to be able to retrieve attachments stored inside PouchDB
 * The actual source for this module can be found here:
 * https://github.com/enketo/enketo-core/blob/master/src/js/file-manager.js
 */
var fileManager = __webpack_require__(117);

 // Preserve the original getFileUrl method

var originalGetFileUrl = fileManager.getFileUrl;

fileManager.getFileUrl = function (subject) {
  if (subject && typeof subject === 'string') {
    return sessions_SessionManager.attachmentUrl(subject);
  }

  return originalGetFileUrl(subject);
};

/* harmony default export */ var file_manager = (fileManager);
// CONCATENATED MODULE: ./src/js/survey/SurveyManager.js
function SurveyManager_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function SurveyManager_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { SurveyManager_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { SurveyManager_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function SurveyManager_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function SurveyManager_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function SurveyManager_createClass(Constructor, protoProps, staticProps) { if (protoProps) SurveyManager_defineProperties(Constructor.prototype, protoProps); if (staticProps) SurveyManager_defineProperties(Constructor, staticProps); return Constructor; }




var SurveyManager_SurveyManager =
/*#__PURE__*/
function () {
  function SurveyManager() {
    SurveyManager_classCallCheck(this, SurveyManager);
  }

  SurveyManager_createClass(SurveyManager, [{
    key: "loadAndAttach",
    value: function () {
      var _loadAndAttach = SurveyManager_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._load();

              case 2:
                this._preprocessFormHtml();

                this._attachSurveyFormToDom();

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function loadAndAttach() {
        return _loadAndAttach.apply(this, arguments);
      };
    }()
  }, {
    key: "_load",
    value: function () {
      var _load2 = SurveyManager_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Server["a" /* default */].json(QueryParams["a" /* default */].getPath('survey'));

              case 2:
                this.survey = _context2.sent;

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function _load() {
        return _load2.apply(this, arguments);
      };
    }()
  }, {
    key: "_preprocessFormHtml",
    value: function _preprocessFormHtml() {
      // Redirect dropbox links to assets folder
      this.survey.form = this.survey.form.replace(/jr:\/\/images\//g, QueryParams["a" /* default */].getPath('assets') + '/');
    }
  }, {
    key: "_attachSurveyFormToDom",
    value: function _attachSurveyFormToDom() {
      document.querySelector('.form-header').insertAdjacentHTML('afterend', this.survey.form);
    }
  }]);

  return SurveyManager;
}();

/* harmony default export */ var survey_SurveyManager = (new SurveyManager_SurveyManager());
// CONCATENATED MODULE: ./src/js/survey/EnketoForm.js
function EnketoForm_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { EnketoForm_defineProperty(target, key, source[key]); }); } return target; }

function EnketoForm_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function EnketoForm_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function EnketoForm_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { EnketoForm_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { EnketoForm_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function EnketoForm_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function EnketoForm_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function EnketoForm_createClass(Constructor, protoProps, staticProps) { if (protoProps) EnketoForm_defineProperties(Constructor.prototype, protoProps); if (staticProps) EnketoForm_defineProperties(Constructor, staticProps); return Constructor; }





var Form = __webpack_require__(417);

var EnketoForm_emitter = __webpack_require__(41);





var makeEmitter = function makeEmitter(silent) {
  return silent ? function (e) {
    /*do nothing*/
  } : function (e) {
    return EnketoForm_emitter.emit(e);
  };
};

var EnketoForm_EnketoForm =
/*#__PURE__*/
function () {
  function EnketoForm() {
    EnketoForm_classCallCheck(this, EnketoForm);
  }

  EnketoForm_createClass(EnketoForm, [{
    key: "init",
    value: function () {
      var _init = EnketoForm_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.saving = false;
                this.validating = false;
                _context.next = 4;
                return survey_SurveyManager.loadAndAttach();

              case 4:
                _context.next = 6;
                return sessions_SessionManager.start();

              case 6:
                this._newFormInstance();

                this._initFormInstance();

                this._localizeForm();

                EnketoForm_emitter.emit('EnketoForm.initialized');

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function init() {
        return _init.apply(this, arguments);
      };
    }()
  }, {
    key: "_newFormInstance",
    value: function _newFormInstance() {
      this.form = new Form('form.or:eq(0)', EnketoForm_objectSpread({
        modelStr: survey_SurveyManager.survey.model
      }, sessions_SessionManager.session.toFormInstance()));
    }
  }, {
    key: "_initFormInstance",
    value: function _initFormInstance() {
      var loadErrors = this.form.init();

      if (loadErrors.length) {
        console.error(loadErrors);
        throw new Error("The form could not be initialized");
      }
    }
  }, {
    key: "_localizeForm",
    value: function _localizeForm() {
      if (QueryParams["a" /* default */].has("lang")) {
        i18n.set(QueryParams["a" /* default */].get("lang"));
      }

      var lang = i18n.get();
      this.form.langs.setAll(lang);
    }
  }, {
    key: "save",
    value: function () {
      var _save = EnketoForm_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.saving) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", null);

              case 2:
                this.saving = true;
                EnketoForm_emitter.emit('EnketoForm.saving');
                _context2.prev = 4;
                _context2.next = 7;
                return this._saveSession();

              case 7:
                _context2.next = 14;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](4);
                this.saving = false;
                EnketoForm_emitter.emit('EnketoForm.saveFailed');
                throw _context2.t0;

              case 14:
                this.saving = false;
                EnketoForm_emitter.emit('EnketoForm.saveSucceded');

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 9]]);
      }));

      return function save() {
        return _save.apply(this, arguments);
      };
    }()
  }, {
    key: "_saveSession",
    value: function () {
      var _saveSession2 = EnketoForm_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.t0 = sessions_SessionManager;
                _context3.next = 3;
                return this._form();

              case 3:
                _context3.t1 = _context3.sent;
                _context3.next = 6;
                return _context3.t0.save.call(_context3.t0, _context3.t1);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function _saveSession() {
        return _saveSession2.apply(this, arguments);
      };
    }()
  }, {
    key: "_form",
    value: function () {
      var _form2 = EnketoForm_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.t0 = this.form.getDataStr();
                _context4.next = 3;
                return this._formFiles();

              case 3:
                _context4.t1 = _context4.sent;
                _context4.t2 = this.form.instanceID;
                _context4.t3 = this.form.deprecatedID;
                return _context4.abrupt("return", {
                  xml: _context4.t0,
                  files: _context4.t1,
                  instance_id: _context4.t2,
                  deprecated_id: _context4.t3
                });

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function _form() {
        return _form2.apply(this, arguments);
      };
    }()
  }, {
    key: "_formFiles",
    value: function _formFiles() {
      /**
       * Get currently attached files from Enketo
       */
      var files = file_manager.getCurrentFiles();
      /**
       * Also append previously uploaded files, but as strings.
       */

      jquery('form.or input[type="file"][data-loaded-file-name]').each(function () {
        files.push(jquery(this).data('loaded-file-name'));
      });
      return files;
    }
  }, {
    key: "_validateForm",
    value: function _validateForm() {
      // You can add ?novalidate=1 to the url to disable validation for that session
      if (QueryParams["a" /* default */].has("novalidate")) {
        return Promise.resolve(true);
      }

      return this.form.validate();
    }
  }, {
    key: "validate",
    value: function () {
      var _validate = EnketoForm_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var silent,
            emitEvent,
            outcome,
            _args5 = arguments;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                silent = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : false;

                if (!this.validating) {
                  _context5.next = 3;
                  break;
                }

                return _context5.abrupt("return");

              case 3:
                emitEvent = makeEmitter(silent);
                this.validating = true;
                emitEvent('EnketoForm.validating');
                _context5.next = 8;
                return this._validateForm();

              case 8:
                outcome = _context5.sent;
                emitEvent(outcome ? 'EnketoForm.validationSucceeded' : 'EnketoForm.validationFailed');
                this.validating = false;
                return _context5.abrupt("return", outcome);

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function validate() {
        return _validate.apply(this, arguments);
      };
    }()
  }, {
    key: "finishAndSubmit",
    value: function () {
      var _finishAndSubmit = EnketoForm_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        var silent;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                silent = true;
                _context6.next = 3;
                return this.validate(silent);

              case 3:
                if (_context6.sent) {
                  _context6.next = 5;
                  break;
                }

                throw new Error('Form cannot be submitted. Check validation errors!');

              case 5:
                _context6.prev = 5;
                _context6.t0 = sessions_SessionManager;
                _context6.next = 9;
                return this._form();

              case 9:
                _context6.t1 = _context6.sent;
                _context6.next = 12;
                return _context6.t0.finalize.call(_context6.t0, _context6.t1);

              case 12:
                _context6.next = 18;
                break;

              case 14:
                _context6.prev = 14;
                _context6.t2 = _context6["catch"](5);
                EnketoForm_emitter.emit('EnketoForm.submitFailed', _context6.t2);
                throw _context6.t2;

              case 18:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[5, 14]]);
      }));

      return function finishAndSubmit() {
        return _finishAndSubmit.apply(this, arguments);
      };
    }()
  }]);

  return EnketoForm;
}();

/* harmony default export */ var survey_EnketoForm = (new EnketoForm_EnketoForm());
// CONCATENATED MODULE: ./src/js/survey/Kernel.js
function Kernel_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function Kernel_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { Kernel_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { Kernel_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function Kernel_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Kernel_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Kernel_createClass(Constructor, protoProps, staticProps) { if (protoProps) Kernel_defineProperties(Constructor.prototype, protoProps); if (staticProps) Kernel_defineProperties(Constructor, staticProps); return Constructor; }




var Kernel_emitter = __webpack_require__(41);

var Kernel_Kernel =
/*#__PURE__*/
function () {
  function Kernel() {
    Kernel_classCallCheck(this, Kernel);

    this.saving = false;
    this.validating = false;
  }

  Kernel_createClass(Kernel, [{
    key: "boot",
    value: function () {
      var _boot = Kernel_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                survey_EnketoForm.init();

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function boot() {
        return _boot.apply(this, arguments);
      };
    }()
  }, {
    key: "submit",
    value: function () {
      var _submit = Kernel_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", survey_EnketoForm.finishAndSubmit().then(function (_) {
                  return _this.exit();
                }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function submit() {
        return _submit.apply(this, arguments);
      };
    }()
  }, {
    key: "_save",
    value: function () {
      var _save2 = Kernel_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return survey_EnketoForm.save();

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function _save() {
        return _save2.apply(this, arguments);
      };
    }()
  }, {
    key: "exit",
    value: function () {
      var _exit = Kernel_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!QueryParams["a" /* default */].has('return')) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return", window.location = QueryParams["a" /* default */].getPath('return'));

              case 2:
                window.location = 'index.html';

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function exit() {
        return _exit.apply(this, arguments);
      };
    }()
  }, {
    key: "saveAndExit",
    value: function () {
      var _saveAndExit = Kernel_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._save();

              case 2:
                _context5.next = 4;
                return this.exit();

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function saveAndExit() {
        return _saveAndExit.apply(this, arguments);
      };
    }()
  }]);

  return Kernel;
}();

/* harmony default export */ var survey_Kernel = (new Kernel_Kernel());
// CONCATENATED MODULE: ./src/js/survey/ui/Toolbar.js




jquery(document).ready(function () {
  jquery('.save-progress').click(function () {
    survey_EnketoForm.save();
  });
  jquery('#close-button').click(function () {
    survey_Kernel.saveAndExit();
  });
  jquery('.validate-form').on('click', function () {
    survey_EnketoForm.validate();
  });
  jquery('.first-page-alias').click(function () {
    jquery('.first-page').click();
  });
  jquery('.last-page-alias').click(function () {
    jquery('.last-page').click();
  }); // validate handler for validate button

  jquery('.submit-form').on('click', function () {
    var $self = jquery(this);
    $self.attr('disabled', 'disabled');
    survey_Kernel.submit().catch(function (e) {
      console.error(e);
      $self.removeAttr('disabled');
    });
    return false;
  });
});
// CONCATENATED MODULE: ./src/js/survey/ui/Overlays.js



var Overlays_emitter = __webpack_require__(41);



/**
 * Set event listeners
 */

jquery(document).ready(function () {
  return Overlays_setBackgroundImage();
});
Overlays_emitter.once('EnketoForm.initialized', function () {
  return Overlays_showSurvey();
});
Overlays_emitter.on('EnketoForm.saving', function () {
  return Overlays_saving();
});
Overlays_emitter.on('EnketoForm.saveFailed', function () {
  return saveFailed();
});
Overlays_emitter.on('EnketoForm.saveSucceded', function () {
  return saveSucceded();
});
Overlays_emitter.on('EnketoForm.validating', function () {
  return Overlays_validating();
});
Overlays_emitter.on('EnketoForm.validationFailed', function () {
  return validationFailed();
});
Overlays_emitter.on('EnketoForm.validationSucceeded', function () {
  return Overlays_validationSucceeded();
});
Overlays_emitter.on('EnketoForm.submitting', function () {
  return Overlays_submitting();
});
Overlays_emitter.on('EnketoForm.submitFailed', function (e) {
  return Overlays_submitFailed(e);
});
Overlays_emitter.on('EnketoForm.submitSucceeded', function () {
  return submitSucceeded();
});
Overlays_emitter.on('EnketoForm.submit.status', function (status) {
  return Overlays_submitStatus(status);
});
/**
 * Callbacks
*/

var Overlays_setBackgroundImage = function setBackgroundImage() {
  if (!QueryParams["a" /* default */].has('bg')) {
    return;
  }

  var style = "content: ' ';" + "display: block;" + "position: absolute;" + "top: 0;" + "left: 0;" + "width: 100%;" + "height: 100%;" + "opacity: 0.2;" + "z-index: -1;" + "background-image: url('" + QueryParams["a" /* default */].get('bg') + "');" + "background-size: cover;" + "background-position: center;" + "background-repeat: no-repeat;";
  jquery('<style>' + '#loading-block:after { ' + style + '} </style>').appendTo('head');
};

var Overlays_showSurvey = function showSurvey() {
  if (!sessions_SessionManager.driver.canSave()) {
    document.querySelector('.save-progress').remove();
  }

  document.querySelector('.form-header').style.display = 'block';
  document.querySelector('#submit-progress').style.display = 'none';
  document.querySelector('#loading-block').remove();
  window.scrollTo(0, 0);
};

var Overlays_saving = function saving() {
  var $saveProgress = jquery(".save-progress");
  $saveProgress.html('<i class="fa fa-spinner fa-spin"></i>');
  $saveProgress.attr("disabled", "disabled");
};

var Overlays_finishSaving = function _finishSaving(outcome, message) {
  var $saveProgress = jquery(".save-progress");
  $saveProgress.html('<i class="fa fa-save"></i>');
  $saveProgress.removeAttr("disabled", "disabled");

  if (message) {
    toastr_default.a[outcome](message);
  }
};

var saveFailed = function saveFailed() {
  Overlays_finishSaving("error", "An error occured while saving this sesssion...");
};

var saveSucceded = function saveSucceded() {
  Overlays_finishSaving("success", i18n._("survey.saved"));
};

var Overlays_validating = function validating() {
  jquery(".submit-form").data('original-content', jquery('.submit-form').text()).attr("disabled", "disabled").text("Validating...");
};

var Overlays_finishValidating = function _finishValidating(outcome, message) {
  jquery(".submit-form").removeAttr('disabled').text(jquery('.submit-form').data('original-content'));
  toastr_default.a[outcome](message);
};

var validationFailed = function validationFailed() {
  Overlays_finishValidating('error', 'The form contains validation errors.');
};

var Overlays_validationSucceeded = function validationSucceeded() {
  Overlays_finishValidating('success', 'The data looks valid!');

  jquery('.last-page').click();
};

var Overlays_submitting = function submitting() {
  jquery('#submit-progress').overlay('show');
};

var Overlays_submitFailed = function submitFailed(e) {
  jquery('#submit-progress').overlay('hide');
  toastr_default.a.error('Submission failed', typeof e === 'string' ? e : e.toString());
};

var Overlays_submitStatus = function submitStatus(_submitStatus) {
  jquery('#submit-progress-text').html(_submitStatus);
};
// CONCATENATED MODULE: ./src/js/survey/ui/SessionModal.js
var SessionModal_emitter = __webpack_require__(41);


var SessionModal_app = angular_default.a.module('sessionModal', []);
SessionModal_app.filter('timeAgo', function () {
  return function (value) {
    var date = new Date(value);
    return date.toLocaleString();
  };
});
SessionModal_app.controller('Controller', function ($scope) {
  $scope.form = {
    name: ''
  };
  $scope.show = false;
  $scope.sessions = [];
  $scope.disableCreateButton = false;
  /**
   * Events coming from Persisted.js
   */

  SessionModal_emitter.on('SessionModal.activate', function () {
    return $scope.$apply(function () {
      $scope.show = true;
    });
  });
  SessionModal_emitter.on('SessionModal.updateSessions', function (sessions) {
    return $scope.$apply(function () {
      $scope.sessions = sessions;
    });
  });
  /**
   * UI Event Handlers
   */

  $scope.createSession = function () {
    var name = $scope.form.name.trim();

    if (!name) {
      $scope.name = '';
      return alert('Please enter a session name');
    }

    $scope.show = false;
    $scope.disableCreateButton = true;
    SessionModal_emitter.emit('Session.create', name);
  };

  $scope.delete = function (session) {
    if (confirm('Do you really want to delete this session? DATA WILL BE LOST!')) {
      SessionModal_emitter.emit('Session.delete', session);
    }
  };

  $scope.select = function (session) {
    $scope.show = false;
    SessionModal_emitter.emit('Session.select', session);
  };
});
angular_default.a.bootstrap(document.getElementById('sessionModal'), ['sessionModal']);
// CONCATENATED MODULE: ./src/js/survey.js
/**
 * Stylesheets
 */

/**
 * Localization Module
 */


/**
 * Misc. Plug-ins
 */



toastr_default.a.options = {
  "positionClass": "toast-top-left"
  /**
   * UI Controllers
   */

};





/**
 * Entrypoint
 */


survey_Kernel.boot();

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

},[[464,1,0]]]);
});