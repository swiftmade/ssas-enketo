var $ = require("jquery");
var angular = require("angular");
var vAccordion = require("v-accordion");
var app = angular.module("app", ["vAccordion"]);
var _ = require('./utils/helpers');

module.exports = function(form) {
  app.controller("jumpCtrl", ['$scope', function($scope) {
    var rawPages = [];
    $scope.pages = {};
    $scope.search = {
      label: ""
    };

    $('[role="page"]').each(function() {
      var page = $(this);
      var labels = $(".question-label.active", page);

      labels.each(function() {
        var label = $(this).text();

        if (label.length < 2 || label[1] != ".") {
          return;
        }

        var firstSpace = label.indexOf(" ");
        var notations = label.substr(0, firstSpace)
          .split(".")
          .filter(function(str) {
            return str != '';
          });

        rawPages.push({
          el: page.children().first(),
          notations: notations,
          label: label
        });
      });
    });

    rawPages.forEach(function(page) {
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

    $scope.jump = function(page) {
      $scope.accordion.collapseAll();
      form.pages.flipToPageContaining(page.el);
      setTimeout(function() {
        $("#jump-to-block").overlay("hide");
      });
    };

    $("#jump-to-close").click(function() {
      $scope.accordion.collapseAll();
      $("#jump-to-block").overlay("hide");
    });
  }]);

  $("#jump-to-block")
    .attr("ng-app", "app")
    .attr("ng-controller", "jumpCtrl");

  $("#jump-to").click(function() {
    $("#jump-to-block").overlay("show");
  });

  $("#jump-to-block").hide();
  angular.bootstrap(document, ["app"]);
};