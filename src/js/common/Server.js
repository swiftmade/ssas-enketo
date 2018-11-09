import axios from 'axios'

class Server {

    async json(url) {
        const {data} = await axios.get(url)
        return data
    }

}


export default new Server()