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
        // First, save the current form.
        if (this.driver.canSave()) {
            this.session.finalize()
            await this.save(form)
        }
        /*
        // Then optimize its attachments
        await Optimizer.optimize(
            this.driver,
            this.session
        )
        */
    }

    // Form 
    async save(form) {
        if (!this.driver.canSave()) {
            throw new Exception('This driver does not support saving!')
        }
        this.session.writeEnketoForm(form)
        this.session = await this.driver.save(this.session)
    }
}

export default new SessionManager()