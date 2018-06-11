var Promise = require('lie');

var submit = require('./submit');
var Optimizer = require("./optimizer");
var modes = require('./sessions/_modes');
var queryParams = require('./utils/query-params');
var sessionDrivers = require('./sessions/_drivers');

var getPreferredMode = function () {
    if ( ! queryParams.has('mode')) {
        return modes.MODE_OFFLINE;
    }
    var mode = queryParams.get('mode');
    if ( ! modes.isValidMode(mode)) {
        throw new Error('Invalid mode: ' + mode);
    }
    return mode;
};

var SessionManager = {
    //
    driver: null,
    session: null,
    returnUrl: null,
    browserMode: false, // In browser mode, app submissions are immediate (not persisted on disk)

    start: function() {

        var _this = this;
        this.returnUrl = queryParams.getPath('return');

        var mode = getPreferredMode();
        this.driver = sessionDrivers.getDriverForMode(mode);

        return this.driver.start().then(function(session) {
            _this.session = session;
            return session;
        });
    },

    getAttachments: function(files) {
        var _this = this;
        var attachments = {};

        files.forEach(function(file) {
            /**
             * If the file value is a string
             * Then this is just a file name and should be marked as a stub
             * This prevents our storage engine from rewriting the stored file for this file.
             */ 
            if (typeof file == 'string') {
                if (_this.session.hasOwnProperty('_attachments') && _this.session._attachments.hasOwnProperty(file)) {
                    attachments[file] = _this.session['_attachments'][file];
                    attachments[file].stub = true;
                }
                return;
            }
            attachments[file.name] = {
                'content_type': file.type,
                'data': file
            };
        });

        return attachments;
    },

    save: function(record) {
        var _this = this;
        this.session.xml = record.xml;
        this.session._attachments = this.getAttachments(record.files);
        this.session.instance_id = record.instance_id;
        this.session.deprecated_id = record.deprecated_id;

        if (this.browserMode) {
            return Promise.resolve(this.session);
        }

        return sessionRepo.update(this.session)
            .then(function(session) {
                _this.session = session;
            });
    },

    optimize: function(progressCb) {
        var _this = this;
        return Optimizer(this.session, progressCb).then(function(session) {
            _this.session = session;
        });
    },

    end: function() {
        this.session.draft = false;
        this.session.last_update = Date.now();
        if (this.browserMode) {
            // Immediately submit and return
            return submit(queryParams.getPath('submit_url'), this.session).then(function() {
                window.location = this.returnUrl;
                throw new Error("redirected!");
            }.bind(this));
        }
        return sessionRepo.update(this.session);
    }
};

module.exports = SessionManager;
