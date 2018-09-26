import queryParams from '../../common/QueryParams'

import InMemory from './drivers/InMemory'
import Persisted from './drivers/Persisted'

const AVAILABLE_DRIVERS = {
    'online': InMemory,
    'offline': Persisted,
}

export default {
    getDriver() {
        const mode = queryParams.get('mode')
        const driver = AVAILABLE_DRIVERS[mode ? mode : 'offline']
        return new driver
    }
}