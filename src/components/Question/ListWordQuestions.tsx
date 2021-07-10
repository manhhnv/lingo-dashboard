import {MappedSentenceQuestion, MappedWordQuestion} from "../../types/Question";
import WordQuestion from "./WordQuestion";
import SentenceQuestions from "./SentenceQuestions";

type ListWordQuestionsProps = {
    questions?: MappedWordQuestion[],
    sentenceQuestions?: (MappedSentenceQuestion | undefined)[],
}

const ListWordQuestions = ({questions, sentenceQuestions}: ListWordQuestionsProps) => {
    return (
        <>
            {questions && questions.map((question, index) => {
                return (
                    <WordQuestion {...question} key={index} />
                )
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
            })}
        </>
    )
}
export default ListWordQuestions;
