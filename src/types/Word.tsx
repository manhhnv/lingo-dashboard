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