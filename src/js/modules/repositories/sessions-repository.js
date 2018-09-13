import {getInstance} from './repository'
var queryParams = require('../utils/query-params');

var dbName = 'sessions';

if (queryParams.has('db')) {
    dbName = queryParams.get('db');
}

export default getInstance(dbName)
