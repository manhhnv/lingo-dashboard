import { MappedWordQuestion } from "../../types/Question";
import WordQuestion from "./WordQuestion";

type ListWordQuestionsProps = {
    questions?: MappedWordQuestion[]
}

const ListWordQuestions = ({questions}: ListWordQuestionsProps) => {
    return (
        <>
            {questions && questions.map((question, index) => {
                return (
                    <WordQuestion {...question} key={index} />
                )
            })}
        </>
    )
}
export default ListWordQuestions;
