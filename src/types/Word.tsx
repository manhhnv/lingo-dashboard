export type WordInLesson = {
    _id: string,
    content: string,
    types: string[],
    meaning: string,
    imageRoot: string
}

export type WordSplit = {
    _id: string,
    text: string,
    wordId: string
}

export class WordInQuestion {
    meaning?: string;
    image?: string;
    hash?: string;
    audio?: string;
    isCorrect?: boolean;
    content?: string;
    word?: {
        _id: string;
        active: boolean;
    }
    questionId?: string;
}