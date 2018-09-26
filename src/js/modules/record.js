var appendRecordFiles = require('./record-files');

module.exports = function(form) {

    console.log(form.getDataStr())

    const record = {
        instance_id: form.instanceID,
        deprecated_id: form.deprecatedID,
        xml: form.getDataStr()
    };

    return appendRecordFiles(
        record
    );
};