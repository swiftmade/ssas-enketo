var $ = require('jquery');
var toastr = require("toastr");
var Form = require('enketo-core/src/js/Form');

var JumpTo = require("./jump-to");
var getRecord = require('./record');
var submitProgress = require("./submit-progress");
var queryParams = require('./utils/query-params');
var SessionManager = require("./session/manager");

function Survey() {

    var _this = this;
    this.form = null;
    this.saving = null;
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

    /**
     * VALIDATE SURVEY SESSION
     */
    this.validate = function () {
        // Return the active validation promise
        // If a check is already going on
        if (this.validating) {
            return this.validating;
        }
        // You can add ?novalidate=1 to the url to disable validation for that session
        if (queryParams.has("novalidate")) {
            return Promise.resolve(true);
        }

        var previousContent = $(".submit-form").html();

        function disableSubmitButton() {
            $(".submit-form")
                .attr("disabled", "disabled")
                .html("Validating...");
            return new Promise(function (resolve) {
                setTimeout(resolve);
            });
        }

        var _this = this;

        this.validating = disableSubmitButton()
            .then(function () {
                return _this.form.validate();
            })
            .then(function (valid) {
                _this.validating = null;
                $(".submit-form")
                    .html(previousContent)
                    .removeAttr("disabled");
                return valid;
            })
            .then(function (valid) {
                if (!valid) {
                    throw new Error("Validation failed");
                }
            });

        return this.validating;
    }

    /**
     * SAVE SURVEY SESSION
     */
    var _finishSaving = function(outcome, message) {
        _this.saving = null;
        var $saveProgress = $(".save-progress");
        $saveProgress.html('<i class="fa fa-save"></i>');
        $saveProgress.removeAttr("disabled", "disabled");

        if (message) {
            toastr[outcome](message);
        }
    }        

    this.save = function(showMsg) {
        
        if (this.saving !== null) {
            // Prevent triggering a save repeatedly.
            return this.saving;
        }

        var _this = this;
        var $saveProgress = $(".save-progress");
        $saveProgress.html('<i class="fa fa-spinner fa-spin"></i>');
        $saveProgress.attr("disabled", "disabled");

        this.saving = getRecord(_this.form)
            .then(function(record) {
                return SessionManager.save(record)
            })
            .then(function() {
                _finishSaving("success", showMsg ? i18n._("survey.saved") : null);
            })
            .catch(function(error) {
                _finishSaving("error", "An error occured while saving this sesssion...");
                throw error;
            });

        return this.saving;
    };

    this.saveAndExit = function() {
        this.save(false)
            .then(function () {
                if (queryParams.has('return')) {
                    window.location(queryParams.getUrl('return'))
                    return
                }
                window.location = 'index.html'
            });
    }

    /**
     * SUBMIT SURVEY
     */

     var _stopLeaveCheck = function () {
        window.onbeforeunload = null;
    };
    
    this.submit = function() {
        
        return this.validate()
            .then(function () {
                submitProgress.show("Saving your session...");
                return _this.save();
            })
            .then(function () {
                submitProgress.show("Optimizing attachments...");
                return SessionManager.optimize(function (progress) {
                    submitProgress.show(
                        "Optimizing attachments " + progress.done + "/" + progress.total
                    );
                });
            })
            .then(function () {
                submitProgress.show("Finalizing your submission...");
                _stopLeaveCheck();
                return SessionManager.end();
            })
            .catch(function (error) {
                if (error.message == "redirected!") {
                    throw error;
                }
                console.error(error);

                setTimeout(function () {
                    submitProgress.hide();
                    // TODO: Re-implement autosave
                    // _this.toggleAutosave(true);
                }, 250);

                throw new Error(i18n._("survey.errors"));
            });
    
        }; 
};

module.exports = new Survey;
