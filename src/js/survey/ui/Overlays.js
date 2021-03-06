import toastr from "toastr";
const emitter = require("tiny-emitter/instance");
import queryParams from "../../common/QueryParams";
import SessionManager from "../sessions/SessionManager";

/**
 * Set event listeners
 */
$(document).ready(() => setBackgroundImage());
emitter.once("EnketoForm.initialized", () => showSurvey());

emitter.on("EnketoForm.saving", () => saving());
emitter.on("EnketoForm.savingProgress", (total, completed) =>
  savingProgress(total, completed)
);
emitter.on("EnketoForm.saveFailed", () => saveFailed());
emitter.on("EnketoForm.saveSucceded", () => saveSucceded());

emitter.on("EnketoForm.validating", () => validating());
emitter.on("EnketoForm.validationFailed", () => validationFailed());
emitter.on("EnketoForm.validationSucceeded", () => validationSucceeded());

emitter.on("EnketoForm.submitting", () => submitting());
emitter.on("EnketoForm.submitFailed", e => submitFailed(e));
emitter.on("EnketoForm.submitSucceeded", () => submitSucceeded());
emitter.on("EnketoForm.submit.status", status => submitStatus(status));

/**
 * Callbacks
 */

const setBackgroundImage = () => {
  if (!queryParams.has("bg")) {
    return;
  }
  var style =
    "content: ' ';" +
    "display: block;" +
    "position: absolute;" +
    "top: 0;" +
    "left: 0;" +
    "width: 100%;" +
    "height: 100%;" +
    "opacity: 0.2;" +
    "z-index: -1;" +
    "background-image: url('" +
    queryParams.get("bg") +
    "');" +
    "background-size: cover;" +
    "background-position: center;" +
    "background-repeat: no-repeat;";

  $("<style>" + "#loading-block:after { " + style + "} </style>").appendTo(
    "head"
  );
};

const showSurvey = () => {
  if (!SessionManager.driver.canSave()) {
    document.querySelector(".save-progress").remove();
  }

  if (queryParams.has("readonly")) {
    document.querySelector(".save-progress").remove();
    document.querySelector(".submit-form").remove();
    document.querySelector(".validate-form").remove();
  }

  document.querySelector(".form-header").style.display = "block";
  document.querySelector("#submit-progress").style.display = "none";
  document.querySelector("#loading-block").remove();
  window.scrollTo(0, 0);
};

const saving = () => {
  var $saveProgress = $(".save-progress");
  $saveProgress.html('<i class="fa fa-spinner fa-spin"></i>');
  $saveProgress.attr("disabled", "disabled");
};

const savingProgress = ({ total, done }) => {
  if (total === 1 && done === 1) {
    return;
  }
  $("#submit-progress").overlay("show");
  submitStatus(`Optimizing attachments... ${done} out of ${total}`);
};

var _finishSaving = function(outcome, message) {
  $("#submit-progress").overlay("hide");
  var $saveProgress = $(".save-progress");
  $saveProgress.html('<i class="fa fa-save"></i>');
  $saveProgress.removeAttr("disabled", "disabled");

  if (message) {
    toastr[outcome](message);
  }

  //$('#submit-progress').overlay('hide')
};

const saveFailed = () => {
  _finishSaving("error", "An error occured while saving this sesssion...");
};

const saveSucceded = () => {
  _finishSaving("success", i18n._("survey.saved"));
};

const validating = () => {
  $(".submit-form")
    .data("original-content", $(".submit-form").text())
    .attr("disabled", "disabled")
    .text("Validating...");
};

const _finishValidating = (outcome, message) => {
  $(".submit-form")
    .removeAttr("disabled")
    .text($(".submit-form").data("original-content"));
  toastr[outcome](message);
};

const validationFailed = () => {
  _finishValidating("error", "The form contains validation errors.");
};

const validationSucceeded = () => {
  _finishValidating("success", "The data looks valid!");
  $(".last-page").click();
};

const submitting = () => {
  $("#submit-progress").overlay("show");
};

const submitFailed = e => {
  $("#submit-progress").overlay("hide");
  toastr.error("Submission failed", typeof e === "string" ? e : e.toString());
};

const submitStatus = submitStatus => {
  $("#submit-progress-text").html(submitStatus);
};
