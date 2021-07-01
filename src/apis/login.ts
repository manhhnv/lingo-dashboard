import Axios from 'axios';
import { BaseUrl } from './baseUrl';

export const adminLogin = async (email: string, password: string) => {
    return Axios.post(`${BaseUrl}/api/admin/login`, {
        email: email,
        password: password
    }, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if (res && res.data) {
            return res.data
        }
    })
    .catch(error => {
        console.log(error)
        return null;
    })
}