const emitter = require('tiny-emitter/instance')
import queryParams from '../../../common/QueryParams'
import sessionRepository from '../../../common/repositories/SessionRepository'

/**
 * Persisted session is stored on the device using IndexedDB (pouchdb)
 */

 export default class Persisted {

    async start() {
        await this._loadSessions()
        return this._chooseSession()
    }

    canSave() {
        return true
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
        emitter.emit('SessionModal.updateSessions', this.sessions)
    }

    async _chooseSession() {
        if (queryParams.has('session')) {
            return this._startFromName(queryParams.get('session'))
        }
        return this._sessionFromUi()
    }

    async _sessionFromUi() {
        emitter.emit('SessionModal.activate')

        return new Promise(resolve => {

            emitter.once('Session.create', name => {
                resolve(this._startFromName(name))
            })

            emitter.on('Session.delete', async (session) => {
                await sessionRepository.remove(session)
                await this._loadSessions()
            })

            emitter.on('Session.select', session => {
                resolve(session)
            })
        })
    }

    async _startFromName(name) {        
        const existingSession = this.sessions.find(s => s.name == name)

        if(existingSession) {
            return existingSession
        }
        
        return this._createFromName(name)
    }

    async _createFromName(name, payload = {}) {
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