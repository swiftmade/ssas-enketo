import axios from 'axios'
import Cookies from './Cookies'
import queryParams from './QueryParams'

let serverInstance = null

export default class Server {

    constructor() {
        this._configureAxios()
    }

    static create() {
        if (!serverInstance) {
            serverInstance = Server.newInstance()
        }
        return serverInstance
    }

    static newInstance() {
        return new Server()
    }
    
    _configureAxios() {
        const token = this._detectAuthToken()
        if (token !== null) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        }
    }

    _detectAuthToken() {
        if (queryParams.has('auth')) {
            return queryParams.get('auth')
        } else if(Cookies.get('enketo_token')) {
            return Cookies.get('enketo_token')
        }
        return null
    }

    async json(url) {
        const {data} = await axios.get(url)
        return data
    }

    /**
     * @param Session session 
     */
    async postForm(session, onProgress = null) {
        
        const form = new FormData()
        form.append('Date', new Date().toUTCString())
        form.append('xml_submission_file', new Blob([session.data.xml]))

        if (typeof session.data.payload === 'object') {
            form.append(
                'Payload',
                JSON.stringify(session.data.payload)
            )
        }

        const submitUrl = queryParams.getPath('submit')
        const config = {
            headers: this._headersForSession(session),
        }

        if (onProgress) {
            config.onUploadProgress = progressEvent => onProgress(
                progressEvent.total > 0
                    ? progressEvent.loaded / progressEvent.total
                    : 0
            )
        }

        const {data} = await axios.post(
            submitUrl,
            form,
            config,
        )

        return data
    }

    _headersForSession(session) {
        return {
            'Content-Type': 'multipart/form-data',
            // Open-rosa Headers
            'X-OpenRosa-Version': '1.0',
            'X-OpenRosa-Instance-Id': session.data.instance_id,
            'X-OpenRosa-Deprecated-Id': session.data.deprecated_id,
        }
    }
}