import axios from 'axios'
import queryParams from './QueryParams'

class Server {

    async json(url) {
        const {data} = await axios.get(url)
        return data
    }

    async submit(session) {
        const submitUrl = queryParams.get('submit')
        await axios.post(submitUrl, session.data, {
            headers: {
                'X-OpenRosa-Version': '1.0',
                'X-OpenRosa-Instance-Id': session.data.instance_id,
                'X-OpenRosa-Deprecated-Id': session.data.deprecated_id,
            }
        })
    }

}


export default new Server()