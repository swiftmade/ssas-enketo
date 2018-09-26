import axios from 'axios'
import QueryParams from './QueryParams'

class Server {

    async json(url) {
        const {data} = await axios.get(url)
        return data
    }

}

export default new Server()