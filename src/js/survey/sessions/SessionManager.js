import SessionDrivers from './SessionDrivers'

class SessionManager
{
    constructor() {
        this.driver = SessionDrivers.getDriver()
    }

    async start() {
        this.session = await this.driver.start()
    }

    async save() {
        if (!this.driver.canSave()) {
            throw new Exception('This driver does not support saving!')
        }
        return this.driver.save(this.session)
    }
}

export default new SessionManager()