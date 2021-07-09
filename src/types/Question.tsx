import { QuestionTypeCode } from "../enum";
import { WordInQuestion } from "../types/Word";

export type MultipleChoiceQuestion = {
    _id: string,
    code: string,
    skills: any[],
    interaction: string,
    focusWord: string,
    point: 0,
    words: [
        string
    ],
    unitId: string,
    bookId: string,
    content: string
}

export type WordQuestion = {
    _id: string,
    code: QuestionTypeCode,
    skills: undefined[],
    interaction: string,
    focusWord:string,
    point: number,
    words: {_id: string, active: boolean}[],
    unitId: string,
    bookId: string,
    content: string,
}

export type SentenceQuestion = {
    _id: string,
    skills: undefined[],
    interaction: string,
    point: number,
    focusSentence: string,
    sentences: string[],
    wrongWords: {_id: string, active: boolean}[],
    hiddenWord: number,
    checkSentence: string,
    unitId: "",
    bookId: "",
    content: string,
    code: QuestionTypeCode
}

export type Question = WordQuestion | SentenceQuestion;

export type MappedWordQuestion = Omit<WordInQuestion, "isCorrect" | "word"> & {
    questionId: string;
    choices: WordInQuestion[];
    content: string;
    code: QuestionTypeCode;
    focusId: string;
}