import toastr from 'toastr'
import Server from '../../common/Server'
import Session from '../../common/Session'
import sessionRepo from '../../common/repositories/SessionRepository'

const app = angular.module('app', [])

app.filter('fileSize', function () {
    return function (bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }
})

app.filter('date', function () {
    return function (value) {
        var date = new Date(value);
        return date.toLocaleString();
    }
})

app.directive('progress', function () {
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
})

app.controller('SubmissionsCtrl', ['$scope', '$timeout', function ($scope, $timeout) {

    function loadPackets(showSubmitted) {
        return sessionRepo.all().then(function (sessions) {
            $scope.packets = sessions
                .filter(function (session) {
                    if (showSubmitted) {
                        return !session.draft;
                    }
                    return !session.draft && !session.submitted;
                })
                .map(function (session) {
                    var xmlSize = session.xml.length * 2;
                    session.size = Object.values(session._attachments)
                        .reduce(function (total, attachment) {
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
                alert('No submitted packets were found...')
            }
            document.querySelector('.reveal-all').remove()
        })
    }

    // Start by loading pending packets only...
    loadPendingPackets()

    $scope.revealAll = function () {
        loadAllPackets()
    }

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

            var onUploadProgress = function (progress) {
                $timeout(function () {
                    packet.progress = progress * 100;
                });
            };

            Server.create()
                .postForm(
                    new Session(packet),
                    onUploadProgress
                )
                .then(() => sessionRepo.get(packet._id))
                .then(session => {
                    session.submitted = true;
                    return sessionRepo.update(session);
                })
                .then(() => {
                    toastr.success(i18n._("submissions.success", {
                        packet: packet.name
                    }));
                    $scope.remove(packet);
                })
                .catch(function (err) {
                    console.error(err);
                    packet.uploading = false;
                    packet.uploaded = false;
                    $scope.$apply();
                    toastr.error(i18n._("submissions.error", {
                        packet: packet.name
                    }));
                });
        });

    };
}]);