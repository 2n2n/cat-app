import axios from 'axios';
import { CAT_API_KEY } from '../config/constants';

const request = () => {
    return axios.create({
        baseURL: "https://api.thecatapi.com",
        headers: {
            "x-api-key": CAT_API_KEY
        }
    })
}

export default request;