var Promise = require('lie');
var vue = require('../ui/session-vue');
var queryParams = require('../../utils/query-params');
import sessionRepo from '../../repositories/sessions-repository'

/**
 * Persisted session is stored on the device using IndexedDB (pouchdb)
 */

 function Persisted() {

    var _this = this;

    this.start = function() {
        return _loadSessions()
            .then(_chooseSession)
            .then(_onSelectSession);
    };

    this.save = function (session) {
        return sessionRepo.update(session);
    };

    // Save session before ending...
    this.beforeEnd = this.save;

    var _chooseSession = function(sessions) {

        if (queryParams.has('session')) {
            return _startSessionByName(
                sessions,
                queryParams.get('session')
            );
        }

        return _startSessionViaUI(sessions);
    };

    var _startSessionByName = function(sessions, name) {
        
        // If possible, return existing session.
        for (var i = 0; i < sessions.length; i++) {
            if (sessions[i].name == name) {
                return sessions[i];
            }
        }
    
        return _createSessionByName(name)
    }

    var _loadSessions = function() {
        return sessionRepo.all();
    };

    var _showSessionsInUI = function (sessions) {
        vue.$set('sessions', sessions.filter(function (session) {
            return session.draft;
        }));
    };

    var _startSessionViaUI = function (sessions) {
        var that = this;
        vue.$set('showModal', true);
        // Display only draft sessions
        _showSessionsInUI(sessions);
        
        return new Promise(function (resolve) {
            _listenSessionEvents(resolve);
        });
    };

    var _createSessionByName = function(name) {

        var payload = {};

        if (queryParams.has('session_extra')) {
            payload = JSON.parse(queryParams.get('session_extra'));
        }

        return sessionRepo.create({
            name,
            xml: '',
            payload,
            draft: true,
            submitted: false,
            last_update: Date.now(),
        });
    }

    var _listenSessionEvents = function(resolve) {
        //
        var that = this;
        var app = document.getElementById('app');

        app.addEventListener('session:destroy', function (event) {
            sessionRepo
                .remove(event.detail.session)
                .then(_loadSessions)
                .then(_showSessionsInUI);
        });

        app.addEventListener('session:load', function (event) {
            resolve(event.detail.session);
        });

        app.addEventListener("session:create", function (event) {
            return _createSessionByName(event.detail.name)
                .then(resolve);
        });
    };

    var _onSelectSession = function(session) {
        vue.$set('showModal', false);
        return new Promise(function(resolve) {
            setTimeout(function() {
                resolve(session);
            }, 50);
        });
    };
}

export default new Persisted