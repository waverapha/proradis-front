import axios from 'axios';
import {handlerResponseSuccessMessages, handlerResponseErrorMessages} from '@/services/http-response-messages'

const baseURL = 'http://localhost:9000';

let axiosInstance = axios.create({
    baseURL,
})

axiosInstance.interceptors.response.use((response) => {
    handlerResponseSuccessMessages(response);

    return response;
}, (error) => {
    if(error.response){
        handlerResponseErrorMessages(error.response);
    }

    return Promise.reject(error);
});

export default axiosInstance;