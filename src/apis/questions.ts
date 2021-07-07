import axios from "axios";
import { MultipleChoiceQuestion } from "../types/Question";
import { SentenceInLesson } from "../types/Sentence";
import { WordInLesson } from "../types/Word";
import { BaseUrl } from "./baseUrl";

export type QuestionsLevelInput = {
    token: string,
    bookId: string,
    unitId: string,
    levelIndex: number
}

export type QuestionLevelOutput = {
    listQuestions: MultipleChoiceQuestion[];
    sentencesInLesson: SentenceInLesson[];
    wordsInLesson: WordInLesson[];
}

export const getQuestionsInLevel = async (input: QuestionsLevelInput) => {
    try {
        const {
            bookId,
            unitId,
            levelIndex,
            token
        } = input;
        const res = await axios.get(
            `${BaseUrl}/api/admin/question/${bookId}/${unitId}/${levelIndex}/questions`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        if (res && res.data && res.status === 200) {
            console.log(res.data)
            return res.data
        }
        return null;
    } catch (error) {
        throw error;
    }
}