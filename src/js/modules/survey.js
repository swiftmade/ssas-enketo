var $ = require('jquery');
var Form = require('enketo-core/src/js/Form');

var JumpTo = require("./jump-to");
var queryParams = require('./utils/query-params');
var SessionManager = require("./session/manager");

function Survey() {

    var _this = this;
    this.form = null;
    this.session = null;

    var $header = $(".form-header");

    this.boot = function() {

        _loadSurvey()
            .then(_preprocessSurvey)
            .then(_attachSurveyToDOM)
            .then(_startSurveySession)
            // Bootstrap enketo
            .then(_createEnketoForm)
            .then(_initEnketoForm)
            .then(_localizeEnketoForm)
            // Additional/custom UI features
            .then(_initializeJumpTo)
            .then(_showSurvey)
        
            // TODO: File manager set session
    };

    var _loadSurvey = function() {
        return $.getJSON(queryParams.getPath('survey'))
    };

    var _preprocessSurvey = function(survey) {
        survey.form = survey.form.replace(
            /jr:\/\/images\/https:\/\/www.dropbox.com\/s\/.*?\//g,
            "assets/"
        );
        return survey;
    };

    var _attachSurveyToDOM = function(survey) {
        $header.after(survey.form);
        return survey;
    };

    var _startSurveySession = function(survey) {
        return SessionManager
            .start()
            .then(function(session) {
                _this.session = session;
                return survey;
            });
    };

    var _createEnketoForm = function(survey) {
        _this.form = new Form('form.or:eq(0)', {
            modelStr: survey.model,
            instanceStr: _this.session.xml,
            submitted: _this.session.submitted,
        });
    };

    var _initEnketoForm = function() {
        var loadErrors = _this.form.init();
        if (loadErrors.length) {
            console.error(loadErrors);
            throw new Error("The form could not be initialized");
        }
    };

    var _localizeEnketoForm = function() {
        if (queryParams.has("lang")) {
            i18n.set(queryParams.get("lang"));
        }
        var lang = i18n.get();
        _this.form.langs.setAll(lang);        
    };

    var _initializeJumpTo = function(survey) {
        JumpTo(_this.form);
    };

    var _showSurvey = function() {
        $header.show();
        $("#submit-progress").hide();
        $("#loading-block").remove();
        $(window).scrollTop(0);
    };
};

module.exports = new Survey;
