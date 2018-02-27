var repository = require('./repository');
var queryParams = require('../utils/query-params');

var dbName = 'sessions';

if (queryParams.has('db')) {
    dbName = queryParams.get('db');
}

module.exports = repository.instance(dbName);
