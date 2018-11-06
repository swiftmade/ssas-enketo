import queryParams from '../../common/QueryParams'

import Online from './drivers/Online'
import Offline from './drivers/Offline'

const AVAILABLE_DRIVERS = {
    'online': Online,
    'offline': Offline,
}

export default {
    getDriver() {
        const mode = queryParams.get('mode')
        const driver = AVAILABLE_DRIVERS[mode ? mode : 'offline']
        return new driver
    }
}