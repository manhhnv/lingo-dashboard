import axios from "axios"
import { BaseUrl } from "./baseUrl"

export type GetQuestionsInLevelInput = {
    bookId: string;
    unitId: string;
    levelIndex: string;
}

export const getQuestionsInLevel = async (token: string, input: GetQuestionsInLevelInput) => {
    try {
        const {
            bookId,
            unitId,
            levelIndex
        } = input;
        const res = await axios.get(`${BaseUrl}/api/admin/question/${bookId}/${unitId}/${levelIndex}/questions`)
        if (res.status === 200 && res.data) {
            return res.data;
        }
        return null;
    } catch (error) {
        throw error;
    }
}