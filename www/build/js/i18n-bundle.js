(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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
		"next": "Next",
	},
	"session": {
		"title": "Survey Session",
		"description": "Start a New Session",
		"name": "Name this Session",
		"start": "Start",
	},
	"constraint": {
		"required": "This field is required.",
		"invalid": "Value not allowed"
	},
	"submissions": {
		"upload_all": "Upload All",
		"upload_single": "Upload This",
		"title": "Pending Data Submissions",
		"uploaded": "Uploaded!",
		"name": "Name",
		"hint": "Hint",
		"size": "Size",
		"created_at": "Created At",
		"error": "An error occured while trying to submit packet named :packet",
		"success": "Packet named :packet has been submitted!"
	}
};
},{}],2:[function(require,module,exports){
var en = require('./en');
var lo = require('./lo');
var _ = require('../utils/helpers');

var Cookies = {
	set: function(key, value) {
		window.localStorage.setItem(key, value);
	},
	get: function(key) {
		return window.localStorage.getItem(key);
	}
};

var i18n = {};

var languages = {
	"en": en,
	"lo": lo
};

var fallback = en;

i18n.set = function(language) {
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

i18n.get = function() {
	return this.language;
};

i18n._ = function(key, bindings) {
	
	if(bindings == undefined) {
		bindings = {};
	}

	var t = _.get(this.translations, key, _.get(fallback, key, ""));

	for (var key in bindings) {
		t = t.replace(new RegExp(":" + key, "g"), bindings[key]);
	}

	return t;
};

i18n.translateDocument = function() {
	var matches = document.querySelectorAll('[data-i18n]');
	for (var i = 0; i < matches.length; i++) {
		var el = matches[i];
		var key = el.getAttribute('data-i18n');
		var translation = this._(key);
		el.innerHTML = translation;
	}
}

document.onreadystatechange = function() {
	var language = Cookies.get("language");
	if(language == undefined) {
		language = "en";
	}

	i18n.set(language);
};

window.i18n = i18n;
module.exports = i18n;
},{"../utils/helpers":4,"./en":1,"./lo":3}],3:[function(require,module,exports){
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
		"next": "ຕໍ່ໄປ",
	},
	"session": {
		"title": "ຫົວຂໍ້",
		"description": "ລາຍລະອຽດ",
		"name": "ຊື່",
		"start": "ເລີ່ມຕົ້ນ",
	},
	"constraint": {
		"required": "ຕ້ອງການ",
		"invalid": "ບໍ່ຖືກຕ້ອງ"
	},
	"submissions": {
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

},{}],4:[function(require,module,exports){
module.exports = {
  get: function(obj, path, def) {
    var fullPath = path
      .replace(/\[/g, ".")
      .replace(/]/g, "")
      .split(".")
      .filter(Boolean);

    return fullPath.every(everyFunc) ? obj : def;

    function everyFunc(step) {
      return !(step && (obj = obj[step]) === undefined);
    }
  },
};
},{}]},{},[2]);
