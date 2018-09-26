import SessionDrivers from './SessionDrivers'

class SessionManager
{
    constructor() {
        this.driver = SessionDrivers.getDriver()
    }

    async start() {
        await this.driver.start()
    }
}

export default new SessionManager()