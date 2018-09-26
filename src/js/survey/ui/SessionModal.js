const emitter = require('tiny-emitter/instance')

import angular from 'angular'
const app = angular.module('sessionModal', [])

app.filter('timeAgo', () => {
    return value => {
        var date = new Date(value)
        return date.toLocaleString()
    }
})

app.controller('Controller', $scope => {

    $scope.show = false
    $scope.sessions = []
    $scope.disableCreateButton = false

    /**
     * Events coming from Persisted.js
     */
    emitter.on('SessionModal.activate', () => $scope.$apply(() => {
        $scope.show = true
    }))

    emitter.on('SessionModal.updateSessions', sessions => $scope.$apply(() => {
        $scope.sessions = sessions
    }))

    /**
     * UI Event Handlers
     */
    $scope.createSession = () => {
        var name = $scope.sessionName.trim()
        
        if (!name) {
            $scope.sessionName = ''
            return alert('Please enter a session name')
        }
        
        $scope.show = false
        $scope.disableCreateButton = true
        emitter.emit('Session.create', name)
    }

    $scope.delete = (session) => {
        if (confirm('Do you really want to delete this session? DATA WILL BE LOST!')) {
            emitter.emit('Session.delete', session)
        }
    }

    $scope.select = (session) => {
        $scope.show = false
        emitter.emit('Session.select', session)
    }
})

export default app