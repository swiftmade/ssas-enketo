var modes = [
    'sticky',
    'offline',
    'ephemeral',
];

module.exports = {
    MODE_STICKY: modes[0],
    MODE_OFFLINE: modes[1],
    MODE_EPHEMERAL: modes[2],
    // Checks if the given mode is valid
    isValidMode: function(mode) {
        return modes.indexOf(mode) >= 0;
    },
};