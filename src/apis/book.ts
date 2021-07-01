import { BaseUrl } from './baseUrl';
import Axios from 'axios';

export const getBooksByGrade = (token: string, grade: number) => {
    Axios.get(`${BaseUrl}/api/books/grade/${grade}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => {
        console.log(res.data);
    })
    .catch(error => {
        console.log(error);
    })
}