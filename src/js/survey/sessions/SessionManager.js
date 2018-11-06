import SessionDrivers from './SessionDrivers'

class SessionManager
{
    constructor() {
        this.driver = SessionDrivers.getDriver()
    }

    async start() {
        this.session = await this.driver.start()
    }

    async finalize(form) {
        if (this.driver.canSave()) {
            await this.save(form)
        } else {
            this.session.writeEnketoForm(form)
        }
        // TODO: Optimize...
        await this.driver.finalize(this.session)
    }

    // Form 
    async save(form) {
        if (!this.driver.canSave()) {
            return Promise.resolve(true)
        }
        this.session.writeEnketoForm(form)
        this.session = await this.driver.save(this.session)
    }
}

export default new SessionManager()