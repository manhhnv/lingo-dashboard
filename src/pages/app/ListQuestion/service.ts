import { WordInLesson, WordInQuestion } from '../../../types/Word';
import { MappedSentenceQuestion, MappedWordQuestion, SentenceQuestion, WordQuestion } from '../../../types/Question';
import md5 from "md5";
import { BaseAudioUrl, BaseImageUrl } from "../../../constant";
import { SentenceInLesson, SentenceInQuestion } from "../../../types/Sentence";
import { QuestionTypeCode } from "../../../enum";

export const mapWordQuestion = (questions: WordQuestion[], words: WordInLesson[]): MappedWordQuestion[] => {
    const result: MappedWordQuestion[] = [];
    // eslint-disable-next-line array-callback-return
    questions.map((question) => {
        if (question.code !== QuestionTypeCode.W9) {
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
            result.push({
                meaning: word!.meaning,
                image: `${BaseImageUrl}/${word!.imageRoot}/${word?.content}.jpg`,
                focusId: question.focusWord,
                hash: hash,
                audio: `${BaseAudioUrl}/${hash}.mp3`,
                choices: choices,
                questionId: question._id,
                code: question.code,
                content: question.content,
            })
        }
        else {
            const choices: WordInQuestion[] = [];
            question.words.map((element) => {
                const word = words.find((item) => item._id === element._id);
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
                            active: element.active
                        },
                        questionId: question._id
                    });
                }
                return null;
            });
            result.push({
                meaning: "",
                image: "",
                focusId: "",
                hash: "",
                audio: "",
                choices: choices,
                questionId: question._id,
                code: question.code,
                content: question.content,
            })
        }
    });
    return result;
}

export const mapSentenceQuestion = (
    questions: SentenceQuestion[],
    sentencesInLesson: SentenceInLesson[],
    wordsInLesson: WordInLesson[]) => {
    // eslint-disable-next-line array-callback-return
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
            // eslint-disable-next-line array-callback-return
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
            // question.hiddenWord
            const sentence = sentencesInLesson.find(item => item._id === question.focusSentence);
            if (sentence) {
                const hash = md5(sentence.en[question.hiddenWord].text.replace("'", "_"));
                choices.push({
                    meaning: sentence.en[question.hiddenWord].text,
                    image: ``,
                    hash: hash,
                    audio: `${BaseAudioUrl}/${hash}.mp3`,
                    isCorrect: true,
                    content: sentence.en[question.hiddenWord].text,
                    word: {
                        _id: sentence.en[question.hiddenWord].text,
                        active: true
                    },
                    questionId: question._id,
                })
            }
            // eslint-disable-next-line array-callback-return
            question.wrongWords.map((item) => {
                const hash = md5(item!._id.replace("'", "_"));
                choices.push({
                    meaning: '',
                    image: '',
                    hash: hash,
                    audio: `${BaseAudioUrl}/${hash}.mp3`,
                    isCorrect: false,
                    content: item!._id,
                    word: {
                        _id: item!._id,
                        active: item.active
                    },
                    questionId: question._id
                });
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
                contentSplit: focusSentence?.en,
                lowerBound: focusSentence?.lowerBound,
                upperBound: focusSentence?.upperBound, 
            }
        }
        else {
            const choices: WordInQuestion[] = [];
            const sentence = sentencesInLesson.find((element) => element._id === question.focusSentence);
            if (sentence) {
                question.wrongWords.forEach((el) => {
                    choices.push({
                        meaning: "",
                        image: "",
                        hash: "",
                        audio: "",
                        isCorrect: false,
                        content: el._id,
                        word: {
                            _id: el._id,
                            active: el.active,
                        },
                        questionId: question._id,
                    });
                });
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
                    contentSplit: focusSentence?.en,
                    lowerBound: focusSentence?.lowerBound,
                    upperBound: focusSentence?.upperBound, 
                }
            }
        }
    })
}