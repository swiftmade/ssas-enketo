var $ = require('jquery');
var toastr = require('toastr');
var angular = require('angular');
var app = angular.module('app', []);
var submit = require('./modules/submit');
var queryParams = require('./modules/utils/query-params');
var sessionRepo = require("./modules/repositories/sessions-repository");

app.filter('fileSize', function() {
    return function(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }
});

app.filter('date', function() {
    return function(date) {
        var date = new Date(value);
        return date.toLocaleString();
    };
});

app.directive('progress', function() {
    return {
        scope: {
            value: '='
        },
        restrict: 'E',
        replace: true,
        template: '<div class="progress"> ' +
            '<div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="100" style="width: {{value}}%"> ' +
            '<span class="sr-only">{{value}}% Complete (success)</span> ' +
            '</div> ' +
            '</div>'
    }
});

app.service('UploadManager', function() {
    var parallel = 4; // parallel uploads
    var active = 0;
    var queue = [];

    var manager = {
        run: function() {
            if (active == parallel || !queue.length) {
                return;
            }
            active++;

            var next = queue.shift();

            submit(queryParams.getPath('server'), next.packet, next.progress)
                .then(function() {
                    next.done(true);
                    active--;
                    manager.run();
                }).catch(function(err) {
                    next.done(false);
                    toastr.error(i18n._("submissions.error", { packet: next.packet.name }));
                });
        },
        queue: function(process) {
            if (process.packet.uploading || process.packet.uploaded) {
                return;
            }

            process.packet.uploading = true;
            queue.push(process);
            manager.run();
        }
    };

    return manager;
});

app.controller('SubmissionsCtrl', ['$scope', 'UploadManager', function($scope, $upload) {

    sessionRepo.all().then(function(sessions) {
        $scope.packets = sessions
            .filter(function (session) {
                return !session.draft && !session.submitted;
            })
            .map(function(packet) {
                packet.size = Object.values(packet._attachments)
                    .map(function(attachment) {
                        return attachment.length;
                    })
                    .reduce(function(total, attachment) {
                        return total + attachment.length;
                    }, 0);
                return packet;
            });

        $scope.$apply();
    });

    $scope.uploadAll = function() {
        angular.forEach($scope.packets, function(packet) {
            $scope.upload(packet);
        });
    };

    $scope.remove = function(packet) {
        var index = $scope.packets.indexOf(packet);
        $scope.packets.splice(index);
    };

    $scope.upload = function(packet) {
        $upload.queue({
            packet: packet,
            progress: function(p) {
                packet.progress = p * 100;
                $scope.$apply();
            },
            done: function(result) {
                packet.uploading = false;
                packet.uploaded = result;
                $scope.$apply();
                if(!result) {
                    return;
                }
                sessionRepo.get(packet._id).then(function(session) {
                    session.submitted = true;
                    return sessionRepo.update(session);
                }).then(function() {
                    toastr.success(i18n._("submissions.success", { packet: packet.name }));
                    $scope.remove(packet);
                });
            }
        });
    };
}]);
