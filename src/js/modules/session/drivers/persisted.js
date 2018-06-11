var Promise = require('lie');
var vue = require('../../app-vue');
var sessionRepo = require("../../repositories/sessions-repository");

/**
 * Persisted session is stored on the device using IndexedDB (pouchdb)
 */

 function Persisted() {

    var _this = this;

    this.start = function() {
        return _loadSessions()
            .then(_showSessionModal)
            .then(_onSelectSession);
    };

    this.save = function (session) {
        return sessionRepo.update(session);
    };

    // Save session before ending...
    this.beforeEnd = this.save;

    var _loadSessions = function() {
        return sessionRepo.all().then(function (sessions) {
            // Only display draft sessions
            sessions = sessions.filter(function (session) {
                return session.draft;
            });
            vue.$set('sessions', sessions);
            return sessions;
        });
    };

    var _showSessionModal = function (sessions) {
        var that = this;
        vue.$set('showModal', true);

        return new Promise(function (resolve) {
            _listenSessionEvents(resolve);
        });
    };

    var _listenSessionEvents = function(resolve) {
        //
        var that = this;
        var app = document.getElementById('app');

        app.addEventListener('session:destroy', function (event) {
            sessionRepo
                .remove(event.detail.session)
                .then(_loadSessions);
        });

        app.addEventListener('session:load', function (event) {
            resolve(event.detail.session);
        });

        app.addEventListener("session:create", function (event) {
            return sessionRepo.create({
                name: event.detail.name,
                xml: "",
                submitted: false,
                draft: true,
                last_update: Date.now()
            }).then(resolve);
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

 module.exports = new Persisted;