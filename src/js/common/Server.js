import axios from 'axios'
import cookies from './Cookies'
import queryParams from './QueryParams'

class Server {

    constructor() {
        this._configureAxios()
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
        } else if(cookies('enketo_token')) {
            return cookies('enketo_token')
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


export default new Server()