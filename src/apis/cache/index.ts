import axios from 'utils/axios';
import { BaseUrl } from '../baseUrl';

export const updateRanking = async () => {
    const res = await axios.put(`${BaseUrl}/api/user/queue/updateRanking`);
    return res;
}
