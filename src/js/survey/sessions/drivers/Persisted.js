import queryParams from '../../../common/QueryParams'
import sessionRepository from '../../../common/repositories/SessionRepository'

/**
 * Persisted session is stored on the device using IndexedDB (pouchdb)
 */

 export default class Persisted {

    async start() {
        await this._loadSessions()
        await this._chooseSession()
        // TODO: .then(_onSelectSession)
    }

    save(session) {
        return sessionRepository.update(session)
    }

    // Save session before ending...
    beforeEnd(session) {
        this.save(session)
    }

    async _loadSessions() {
        this.sessions = await sessionRepository.all()
    }

    async _chooseSession() {
        if (queryParams.has('session')) {
            return this._startFromName(queryParams.get('session'))
        }
        // TODO: Start from UI
    }

    async _startFromName(name) {
        if(existingSession = this.sessions.find(s => s.name == name)) {
            return existingSession
        }
        return this._createFromName(name)
    }

    async _createFromName() {
        var payload = {};

        if (queryParams.has('session_extra')) {
            payload = JSON.parse(queryParams.get('session_extra'));
        }

        return sessionRepository.create({
            name,
            xml: '',
            payload,
            draft: true,
            submitted: false,
            last_update: Date.now(),
        })
    }

}