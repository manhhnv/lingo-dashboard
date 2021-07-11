import { Grid, Paper, Typography, Box, RadioGroup } from "@material-ui/core";
import { MappedWordQuestion } from "../../types/Question";
import { makeStyles } from "@material-ui/core/styles";
import Answer from "./Answer";
import BottomSearch from "../../components/BottomSearch";
import { useState } from "react";

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

const WordQuestion = (props: MappedWordQuestion) => {
    const classes = useStyles();
    const [choices, setChoices] = useState(props.choices);

    return (
        <Grid item>
            <Paper className={classes.root}>
                <Typography
                    className={classes.title}
                >
                    {props.content}
                </Typography>
                <Box className={classes.container}>
                    <Grid>
                        <img
                            src={props.image}
                            alt='ImageWord'
                            className={classes.image}
                        />
                        <audio controls>
                            <source
                                src={props.audio}
                            />
                        </audio>
                    </Grid>
                    <Grid className={classes.answer}>
                        <Grid item>
                            <RadioGroup>
                                {
                                    choices.map((choice, index) => {
                                        return (
                                            <Answer
                                                {...choice}
                                                key={index}
                                            />
                                        )
                                    })
                                }
                            </RadioGroup>
                            <BottomSearch
                                questionId={props.questionId}
                                setChoices={setChoices}
                                choices={choices}
                                focusId={props.focusId}
                                code={props.code}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Grid>
    )
}
export default WordQuestion;