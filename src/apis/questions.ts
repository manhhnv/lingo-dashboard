import axios from "axios";
import { SentenceQuestion, WordQuestion } from "../types/Question";
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
    listQuestions: (WordQuestion | SentenceQuestion)[];
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
            const data: QuestionLevelOutput = res.data;
            return data
        }
        return null;
    } catch (error) {
        throw error;
    }
}

export type ChangeQuestionChoice = {
    bookId: string;
    unitId: string;
    levelIndex: number;
    questionId: string;
    choiceId: string;
}

export const removeChoice = async (token: string, input: ChangeQuestionChoice) => {
    try {
        const {
            bookId,
            unitId,
            levelIndex,
            questionId,
            choiceId
        } = input;
        const res = await axios.put(
            `${BaseUrl}/api/admin/question/${bookId}/${unitId}/${levelIndex}/removeChoice`,
            {
                questionId: questionId,
                choiceId: choiceId
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res.data;
    } catch (error) {
        throw error;
    }
}