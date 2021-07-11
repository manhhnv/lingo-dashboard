import axios from "axios"
import { BaseUrl } from "./baseUrl"
import {QuestionTypeCode} from "../enum";

export type AddNewSentenceInput = {
    token: string;
    bookId: string;
    unitId: string;
    levelIndex: number;
    questionId: string;
    focusId: string;
    code: QuestionTypeCode,
    content: string;
    meaning: string;
    audio?: string;
}

export const sentencesInPrevBooks = async (token: string | undefined, bookNId: number) => {
    try {
        const res = await axios.get(
            `${BaseUrl}/api/sentences/${bookNId}/previous`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        if (res.status === 200) {
            return res.data;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

export const addNewSentence = async (input: AddNewSentenceInput) => {
    try {
        const res = await axios.put(
            `${BaseUrl}/api/admin/question/${input.bookId}/${input.unitId}/${input.levelIndex}/addNewSentence`,
            {
                questionId: input.questionId,
                focusId: input.focusId,
                code: input.code,
                content: input.content,
                meaning: input.meaning,
                audio: input.audio,
            },
            {
                headers: {
                    'Authorization': `Bearer ${input.token}`
                }
            }
        )
        if (res.status === 200 && res.data && res.data.sentence) {
            return res.data.sentence;
        }
        return null;
    }
    catch (e) {
        throw e;
    }
}