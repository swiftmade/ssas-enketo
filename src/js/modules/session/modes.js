var modes = [
    'online',
    'offline',
];

module.exports = {
    MODE_ONLINE: modes[0],
    MODE_OFFLINE: modes[1],
    // Checks if the given mode is valid
    isValidMode: function(mode) {
        return modes.indexOf(mode) >= 0;
    },
};