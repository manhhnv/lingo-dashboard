import axios from "axios"
import { BaseUrl } from "./baseUrl"

export const wordsInPrevBooks = async (token: string | undefined, bookNId: number) => {
    try {
        const res = await axios.get(
            `${BaseUrl}/api/words/${bookNId}/previous`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        if (res.status === 200) {
            return res.data;
        }
        return null;
    } catch (error) {
        throw error;
    }
}