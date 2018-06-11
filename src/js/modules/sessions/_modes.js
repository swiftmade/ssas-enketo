module.exports = {
    MODE_STICKY: 'sticky',
    MODE_OFFLINE: 'offline',
    MODE_EPHEMERAL: 'ephemeral',
    // Checks if the given mode is valid
    isValidMode: function(mode) {
        return this.hasOwnProperty(mode);
    },
};