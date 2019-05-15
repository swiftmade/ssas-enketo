import SessionDrivers from './SessionDrivers'

class SessionManager
{
    constructor() {
        this.driver = SessionDrivers.getDriver()
    }

    async start() {
        this.session = await this.driver.start()
    }

    async attachmentUrl(fileName) {
        return await this.driver.attachmentUrl(
            this.session,
            fileName
        )
    }

    async finalize(form) {
        await this.save(form)
        await this.driver.finalize(this.session)
    }

    async save(form) {
        // Update session
        this.session.putEnketoForm(form)
        if (!this.driver.canSave()) {
            return Promise.resolve(true)
        }
        // Persist to disk
        this.session = await this.driver.save(this.session)
    }
}

export default new SessionManager()