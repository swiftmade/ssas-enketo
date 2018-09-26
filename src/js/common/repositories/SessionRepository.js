import {getInstance} from './PouchDB'
import queryParams from '../QueryParams'

let databaseName = 'sessions'

if (queryParams.has('db')) {
    databaseName = queryParams.get('db')
}

export default getInstance(databaseName)