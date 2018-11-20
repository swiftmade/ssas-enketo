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

    async postForm(url, form, headers = {}) {
        const {data} = await axios.post(url, form, {
            headers
        })
        return data
    }

}