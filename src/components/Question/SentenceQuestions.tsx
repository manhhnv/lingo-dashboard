import {MappedSentenceQuestion} from "../../types/Question";
import {Box, Grid, Paper, RadioGroup, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useState} from "react";
import {QuestionTypeCode} from "../../enum";
import BottomSearch from "../BottomSearch";
import Answer from "./Answer";
import SentenceAnswer from "./SentenceAnswer";
import {SentenceInQuestion} from "../../types/Sentence";
import NewSentenceForm from "../Sentence/addSentence";

const useStyles = makeStyles({
    root: {
        padding: 20,
    },
    title: {
        paddingBottom: 20,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    container: {
        minHeight: "100%",
        minWidth: "100%",
    },
    answer: {
        paddingTop: 15,
        paddingBottom: 15,
    },
    image: {
        maxHeight: 100,
        maxWidth: 100,
    }
})

const SentenceQuestions = (props: MappedSentenceQuestion) => {
    const classes = useStyles();
    const [choices, setChoices] = useState(props.code === QuestionTypeCode.S7 ? props.wrongWords : props.sentences);
    return (
        <Grid item>
            <Paper className={classes.root}>
                <Typography
                    className={classes.title}
                >
                    {props.content}
                </Typography>
                <Box>
                    <Grid>
                        <audio controls>
                            <source src={props?.audio}/>
                        </audio>
                        <Typography>
                            {props.contentSplit?.map((item, index) => {

                                if (index !== props.hiddenWord) {
                                    return item.text;
                                }
                                return '____';
                            }).join(' ')}
                        </Typography>
                    </Grid>
                    <Grid className={classes.answer}>
                        <Grid item>
                            <RadioGroup>
                                {
                                    choices.map((choice, index) => {
                                        if (props.code === QuestionTypeCode.S7) {
                                            return (
                                                <Answer
                                                    {...choice}
                                                    key={index}
                                                />
                                            )
                                        }
                                        else {
                                            const tempChoices = choice as SentenceInQuestion
                                            return (
                                                <SentenceAnswer
                                                    key={index}
                                                    {...tempChoices}
                                                    />
                                            )
                                        }
                                    })
                                }
                            </RadioGroup>
                            {props.code === QuestionTypeCode.S10 && (
                                <NewSentenceForm
                                    questionId={props.questionId}
                                    focusId={props.focusSentence}
                                    code={props.code}
                                    choices={choices}
                                    setChoices={setChoices}
                                />
                            )}
                            {props.code === QuestionTypeCode.S7 && (
                                <BottomSearch
                                    questionId={props.questionId}
                                    setChoices={setChoices}
                                    choices={choices}
                                    focusId={props.focusSentence}
                                    code={props.code}
                                />
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Grid>
    )
}

export default SentenceQuestions;