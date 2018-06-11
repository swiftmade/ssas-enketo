var modes = require('./modes');
var inMemory = require('./drivers/in-memory');
var persisted = require('./drivers/persisted');

var drivers = {};
drivers[modes.MODE_STICKY] = persisted;
drivers[modes.MODE_OFFLINE] = persisted;
drivers[modes.MODE_EPHEMERAL] = inMemory;
// Register more session drivers here...

module.exports = {
    getDriverForMode: function(mode) {
        return drivers[mode];
    }
};