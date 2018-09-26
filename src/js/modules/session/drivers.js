var modes = require('./modes');
var inMemory = require('./drivers/in-memory');
var persisted = require('./drivers/persisted').default;

var drivers = {}
drivers[modes.MODE_ONLINE] = inMemory
drivers[modes.MODE_OFFLINE] = persisted
// Register more session drivers here...

module.exports = {
    getDriverForMode: mode => drivers[mode]
};