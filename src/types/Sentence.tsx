import { WordSplit } from "./Word"

export type SentenceInLesson = {
    _id: string,
    audio: string,
    enText: string,
    vnText: string,
    vn: [
        WordSplit
    ],
    en: [
        WordSplit
    ],
    lowerBound: number,
    upperBound: number,
    questionSection: string
    contextSection: string,
    isConversation: boolean
}

export type SentenceInQuestion = {
    audio: string,
    enText: string,
    vnText: string,
    vn: [
        WordSplit
    ],
    en: [
        WordSplit
    ],
    lowerBound: number,
    upperBound: number,
    questionSection: string
    contextSection: string,
    isConversation: boolean,
    sentence: {
        _id: string,
        active: boolean
    },
    isCorrect: boolean;
    questionId: string
}