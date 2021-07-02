import { BaseUrl } from './baseUrl';
import Axios from 'axios';

export const getBooksByGrade = async (token: string, grade: number) => {
    try {
        const res = await Axios.get(`${BaseUrl}/api/books/grade/${grade}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (res.status === 200 && res.data) {
            console.log(res.data);
            return res.data;
        }
        else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}