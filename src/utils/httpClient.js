import axios from "axios"
import join from "url-join"
import {
    apiUrl,
    NOT_CONNECT_NETWORK,
    NETWORK_CONNECTION_MESSAGE
} from "../constance/constance.js"
import Swal from 'sweetalert2';

const isAbsoluteURLRegex = /^(?:w+:)\/\//

axios.interceptors.request.use(async (config) => {
    if(!isAbsoluteURLRegex.test(config.url)){
        config.url = join(apiUrl, config.url)
    }
    config.timeout = 0; // 0 Second
    return config
})

axios.interceptors.response.use(
    (response) =>{
        return response
    },
    (error) => {
        console.log(JSON.stringify(error, undefined, 2))
        if(axios.isCancel(error)){
            return Promise.reject(error)
        }else if(!error.response){
            return Promise.reject({
                code: NOT_CONNECT_NETWORK,
                message: NETWORK_CONNECTION_MESSAGE,
            })
        }
        console.log(error.response.data)
        const {result} = error.response.data;
        const { status } = error.response;
        Swal.fire({
            icon: 'info',
            title: `Try Again`,
            // title: `Status ${status}`,
            text: result || 'An unexpected error occurred.',
            timer: 3000,
            timerProgressBar: true,
        });
        return Promise.reject(error)
    }
)

class httpClient {
    async get(path, params) {
        return await axios.get(join(path), {
            params: params,
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
    }
    async post(path, data) {
        return await axios.post(join(path), data);
    }
}
const httpClientClass = new httpClient()
export default httpClientClass 
