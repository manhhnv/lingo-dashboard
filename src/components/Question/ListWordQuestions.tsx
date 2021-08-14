import {MappedSentenceQuestion, MappedWordQuestion} from "../../types/Question";
import WordQuestion from "./WordQuestion";
import SentenceQuestions from "./SentenceQuestions";
import { MatchingQuestion } from "../../components/Question/Matching";
import { QuestionTypeCode } from "../../enum";

type ListWordQuestionsProps = {
    questions?: MappedWordQuestion[],
    sentenceQuestions?: (MappedSentenceQuestion | undefined)[],
}

const ListWordQuestions = ({questions, sentenceQuestions}: ListWordQuestionsProps) => {
    return (
        <>
            {questions && questions.map((question, index) => {
                if (question.code !== QuestionTypeCode.W9) {
                    return (
                        <WordQuestion {...question} key={index} />
                    )
                }
                else {
                    return <MatchingQuestion {...question} key={index} />
                }
            })}
            {sentenceQuestions && sentenceQuestions.map((question: MappedSentenceQuestion | undefined, index: number) => {
                if (question) {
                    return (
                        <SentenceQuestions
                            {...question}
                            key={index}
                        />
                    )
                }
                return null;
            })}
        </>
    )
}
export default ListWordQuestions;
