var en = require('./en');
var lo = require('./lo');
var zh = require('./zh');
var _ = require('../common/helpers');

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
	"lo": lo,
	"zh": zh,
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