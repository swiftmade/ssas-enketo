import SessionDrivers from './SessionDrivers'

class SessionManager
{
    constructor() {
        this.driver = SessionDrivers.getDriver()
    }

    async start() {
        this.session = await this.driver.start()
    }

    async save(record) {
        if (!this.driver.canSave()) {
            throw new Exception('This driver does not support saving!')
        }
        this.session = await this.driver.save(
            this.session,
            this.sessionUpdate(record)
        )
    }

    sessionUpdate(record) {
        return {
            ...this.session,
            xml: record.xml,
            _attachments: record.files,
            instance_id: record.instance_id,
            deprecated_id: record.deprecated_id,
        }
    }
}

export default new SessionManager()