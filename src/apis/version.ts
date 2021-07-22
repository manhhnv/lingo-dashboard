import axios from "axios";
import {BaseUrl} from "./baseUrl";

export const getCurrentVersion = async () => {
    try {
        const response = await axios.get(`${BaseUrl}/api/admin/version/current`);
        if (response.status === 200) {
            return response.data;
        }
        return null;
    } catch (e) {
        throw e;
    }
}
export const updateNewVersion = async (tag: string, description: string, token: string) => {
    try {
        const response = await axios.put(`${BaseUrl}/api/admin/version`,
            {
                tag: tag,
                description: description,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        if (response.status === 200) {
            return response.data;
        }
        return null;
    } catch (e) {
        throw e;
    }
}