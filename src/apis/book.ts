import { BaseUrl } from './baseUrl';
import Axios from 'axios';

export const getBooksByGrade = async (token: string, grade: number) => {
    return Axios.get(`${BaseUrl}/api/books/grade/${grade}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => {
            if (res.status === 200 && res.data) {
                console.log(res.data)
                return res.data;
            }
            else {
                return null;
            }
        })
        .catch(error => {
            console.log(error);
        })
}