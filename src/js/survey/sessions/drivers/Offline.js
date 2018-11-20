import Session from '../../../common/Session'
import Submit from '../../../submission/Submit'
const emitter = require('tiny-emitter/instance')
import queryParams from '../../../common/QueryParams'
import sessionRepository from '../../../common/repositories/SessionRepository'

/**
 * Offline session is stored on the device using IndexedDB (pouchdb)
 */

 export default class Offline {

    async start() {
        await this._loadSessions()
        return this._chooseSession()
    }

    canSave() {
        return true
    }

    async save(session) {
        return new Session(
            await sessionRepository.update(session.data)
        )
    }

    async finalize(session) {
        if (queryParams.has('instant_submit')) {
            return await Submit(session)
        }
        return await this.save(session.setData({
            draft: false
        }))
    }

    async attachmentUrl(session, fileName) {
        return sessionRepository
            .getAttachment(session.data._id, fileName)
            .then(f => URL.createObjectURL(f))
    }

    async _loadSessions() {
        this.sessions = await sessionRepository.all()
        emitter.emit('SessionModal.updateSessions', this.sessions.filter(
            session => session.draft
        ))
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
                resolve(new Session(session))
            })
        })
    }

    async _startFromName(name) {        
        const existingSession = this.sessions.find(s => s.name == name)

        if(existingSession) {
            return new Session(existingSession)
        }
        
        return this._createFromName(name)
    }

    async _create(data) {
        const session = new Session(data)
        const savedSessionData = await sessionRepository.create(session.data)
        return new Session(savedSessionData)
    }

    async _createFromName(name, payload = {}) {
        if (queryParams.has('session_extra')) {
            payload = JSON.parse(queryParams.get('session_extra'));
        }
        return this._create({
            name,
            payload
        })
    }
}