export default {
    /**
     * SERVER
     */
    // Maximum file size acceptable by the server in btes
    SERVER_MAX_UPLOAD_SIZE: 50 * 1024 * 1024,

    /**
     * ATTACHMENT OPTIMIZATION
     */
    // Files having greater size than this value (in bytes) will be optimized
    OPTIMIZE_TRESHOLD: 300000,
    // Image maximum width
    OPTIMIZE_MAX_WIDTH: 600,
    // Image quality
    OPTIMIZE_QUALITY: 0.6,
    // This value prevents converting image to JPG
    OPTIMIZE_CONVERT_SIZE: 999999999,

    /**
     * SURVEY
     */
    // Autosave interval in milliseconds
    SURVEY_AUTOSAVE_INTERVAL: 60 * 1000,
}