import { ListWorQuestionCodes } from '../../../constant/index';
import { WordQuestion, SentenceQuestion } from '../../../types/Question';
export const reduceQuestions = (listQuestions: Array<WordQuestion | SentenceQuestion>) => {
    const wordQuestions: WordQuestion[] = [];
    const sentenceQuestions: SentenceQuestion[] = [];

    listQuestions.map(item => {
        if (ListWorQuestionCodes.includes(item.code)) {
            wordQuestions.push(item as WordQuestion)
        }
        else {
            sentenceQuestions.push(item as SentenceQuestion)
        }
    });
    console.log({
        wordQuestions,
        sentenceQuestions
    })
    return {
        wordQuestions,
        sentenceQuestions
    }
}
