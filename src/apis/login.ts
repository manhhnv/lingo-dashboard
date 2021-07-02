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

export const getProfile = async (token: string) => {
    return Axios.get(`${BaseUrl}/api/user/profile`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => {
        if (res.status === 200 && res.data) {
            return res.data;
        }
    })
    .catch(error => {
        throw error;
    })
}