import { WordInQuestion } from '../../../types/Word';
import { WordInLesson } from '../../../types/Word';
import { MappedWordQuestion, WordQuestion } from '../../../types/Question';
import md5 from "md5";
import { BaseImageUrl, BaseAudioUrl } from "../../../constant";

export const mapWordQuestion = (questions: WordQuestion[], words: WordInLesson[]): MappedWordQuestion[] => {
    const result = questions.map((question): MappedWordQuestion => {
        const word = words.find(word => word._id === question.focusWord);
        const choices: WordInQuestion[] = [];
        const hash = md5(word!.content.replace("'", "_"));
        choices.push({
            meaning: word!.meaning,
            image: `${BaseImageUrl}/${word!.imageRoot}/${word?.content}.jpg`,
            hash: hash,
            audio: `${BaseAudioUrl}/${hash}.mp3`,
            isCorrect: true,
            content: word!.content,
            word: {
                _id: word!._id,
                active: true
            },
            questionId: question._id
        })
        question.words.map(choice => {
            const word = words.find(item => item._id === choice._id);
            if (word) {
                const hash = md5(word!.content.replace("'", "_"))
                choices.push({
                    meaning: word!.meaning,
                    image: `${BaseImageUrl}/${word.imageRoot}/${word?.content}.jpg`,
                    hash: hash,
                    audio: `${BaseAudioUrl}/${hash}.mp3`,
                    isCorrect: false,
                    content: word!.content,
                    word: {
                        _id: word._id,
                        active: choice.active
                    },
                    questionId: question._id
                });
            }
            return null;
        });
        return {
            meaning: word!.meaning,
            image: `${BaseImageUrl}/${word!.imageRoot}/${word?.content}.jpg`,
            focusId: question.focusWord,
            hash: hash,
            audio: `${BaseAudioUrl}/${hash}.mp3`,
            choices: choices,
            questionId: question._id,
            code: question.code,
            content: question.content,
        }
    });
    return result;
}