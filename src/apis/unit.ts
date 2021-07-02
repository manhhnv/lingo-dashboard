import axios from "axios";
import { BaseUrl } from "./baseUrl";

export const getUnitsInBook = async (token: string, bookId: string) => {
    try {
        const res = await axios.get(
            `${BaseUrl}/api/book/${bookId}/units`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        if (res.status === 200 && res.data) {
            return res.data;
        }
        return null;
    } catch (error) {
        throw error;
    }
}