import {WordInLesson, WordInQuestion} from '../../../types/Word';
import {MappedSentenceQuestion, MappedWordQuestion, SentenceQuestion, WordQuestion} from '../../../types/Question';
import md5 from "md5";
import {BaseAudioUrl, BaseImageUrl} from "../../../constant";
import {SentenceInLesson, SentenceInQuestion} from "../../../types/Sentence";
import {QuestionTypeCode} from "../../../enum";

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

export const mapSentenceQuestion = (
    questions: SentenceQuestion[],
    sentencesInLesson: SentenceInLesson[],
    wordsInLesson: WordInLesson[]) => {
    return questions.map((question): MappedSentenceQuestion | undefined => {
        const focusSentence = sentencesInLesson.find(s => s._id === question.focusSentence);
        if (question.code === QuestionTypeCode.S10) {
            const choices: SentenceInQuestion[] = [];
            choices.push({
                audio: focusSentence!.audio,
                enText: focusSentence!.enText,
                vnText: focusSentence!.vnText,
                en: focusSentence!.en,
                vn: focusSentence!.vn,
                lowerBound: focusSentence!.lowerBound,
                upperBound: focusSentence!.upperBound,
                questionSection: focusSentence!.questionSection,
                contextSection: focusSentence!.contextSection,
                isConversation: focusSentence!.isConversation,
                sentence: {
                    _id: focusSentence!._id,
                    active: true
                },
                questionId: question._id,
                isCorrect: true,
            })
            const sentences = question.sentences;
            sentences.map(item => {
                const sentence = sentencesInLesson.find(s => s._id === item._id);
                if (sentence) {
                    choices.push({
                        audio: sentence.audio,
                        enText: sentence.enText,
                        vnText: sentence.vnText,
                        en: sentence.en,
                        vn: sentence.vn,
                        lowerBound: sentence.lowerBound,
                        upperBound: sentence.upperBound,
                        questionSection: sentence.questionSection,
                        contextSection: sentence.contextSection,
                        isConversation: sentence.isConversation,
                        sentence: {
                            _id: sentence._id,
                            active: item.active
                        },
                        questionId: question._id,
                        isCorrect: false
                    })
                }
            })
            return {
                questionId: question._id,
                code: question.code,
                content: question.content,
                focusSentence: question.focusSentence,
                hiddenWord: question.hiddenWord,
                interaction: question.interaction,
                point: question.point,
                sentences: choices,
                skills: question.skills,
                unitId: question.unitId,
                wrongWords: [],
                audio: focusSentence?.audio,
                contentSplit: focusSentence?.en
            }
        }
        else if (question.code === QuestionTypeCode.S7) {
            const choices: WordInQuestion[] = [];
            const lastIndex = question.focusSentence.lastIndexOf('S');
            const wordBaseId = question.focusSentence.slice(0, lastIndex);
            const hiddenWord = wordsInLesson.find(item => item._id === wordBaseId);
            const hash = md5(hiddenWord!.content.replace("'", "_"));
            choices.push({
                meaning: hiddenWord!.content,
                image: `${BaseImageUrl}/${hiddenWord!.imageRoot}/${hiddenWord?.content}.jpg`,
                hash: hash,
                audio: `${BaseAudioUrl}/${hash}.mp3`,
                isCorrect: true,
                content: hiddenWord!.content,
                word: {
                    _id: hiddenWord!._id,
                    active: true
                },
                questionId: question._id,
            })
            question.wrongWords.map((item) => {
                const word = wordsInLesson.find(w => w._id === item._id);
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
                            active: item.active
                        },
                        questionId: question._id
                    });
                }
            })
            return {
                questionId: question._id,
                code: question.code,
                content: question.content,
                focusSentence: question.focusSentence,
                hiddenWord: question.hiddenWord,
                interaction: question.interaction,
                point: question.point,
                sentences: [],
                skills: question.skills,
                unitId: question.unitId,
                wrongWords: choices,
                audio: focusSentence?.audio,
                contentSplit: focusSentence?.en
            }
        }
    })
}