import { QuestionTypeCode } from "../enum";
import { WordInQuestion } from "../types/Word";
import { SentenceInQuestion } from "./Sentence";

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
    sentences: {_id: string, active: boolean}[],
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

export type MappedSentenceQuestion = {
    questionId: string,
    code: QuestionTypeCode,
    content: string,
    focusSentence: string,
    hiddenWord: number,
    interaction: string,
    point: number
    sentences: SentenceInQuestion[]
    skills: any
    unitId: string
    wrongWords: WordInQuestion[];
    audio?: string;
    contentSplit?: {_id: string, text: string, wordId: string}[];
    lowerBound?: number;
    upperBound?: number;
}