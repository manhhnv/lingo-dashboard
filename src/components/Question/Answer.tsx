import { FormControlLabel, Grid, Radio, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PlayIcon from "@material-ui/icons/VolumeUp";
import DeleteIcon from "@material-ui/icons/Delete";
import { WordInQuestion } from "../../types/Word";
import { ChangeQuestionChoice, removeChoice } from "../../apis/questions";
import { useAdmin } from "../../AdminContext";
import { useRouteMatch } from "react-router-dom";
import { useState } from "react";


const useStyles = makeStyles({
    root: {
        paddingBottom: 10
    },
    deleteButton: {
        float: 'right'
    },
    answerImage: {
        maxWidth: 100,
        maxHeight: 100,
    },
    content: {
        paddingTop: 30
    }
})

const Answer = ({
    isCorrect,
    content,
    wordId,
    image,
    audio,
    questionId
}: WordInQuestion) => {
    const classes = useStyles();
    const audioInstance = new Audio(audio);
    const [showChoice, setShowChoice] = useState(true);
    const { admin } = useAdmin()
    const playAudio = () => {
        audioInstance.play();
    }
    const routeMatch = useRouteMatch<{
        bookId: string,
        unitId: string,
        levelIndex: string
    }>();
    const removeChoiceHandle = (input: ChangeQuestionChoice) => {
        if (admin.token) {
            removeChoice(admin.token, input)
                .then(data => {
                    if (data) {
                        setShowChoice(false);
                    }
                })
                .catch(err => {
                    throw err;
                })
        }
    }
    return (
        <>
            {showChoice && (
                <Grid
                    container={true}
                    spacing={3}
                    className={classes.root}
                >
                    <Grid
                        item
                    >
                        <FormControlLabel
                            value={wordId}
                            label={<Grid container={true} spacing={3}>
                                <Grid item>
                                    <img
                                        src={image}
                                        alt="ImageUnit"
                                        className={classes.answerImage}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography className={classes.content}>
                                        {content}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <IconButton onClick={playAudio} className={classes.content}>
                                        <PlayIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <IconButton className={classes.content} disabled={isCorrect}
                                        onClick={() => removeChoiceHandle({
                                            bookId: routeMatch.params.bookId,
                                            unitId: routeMatch.params.unitId,
                                            levelIndex: Number(routeMatch.params.levelIndex),
                                            questionId: questionId,
                                            choiceId: wordId
                                        })}
                                    >
                                        <DeleteIcon color={isCorrect ? "disabled" : "error"} />
                                    </IconButton>
                                </Grid>
                            </Grid>}
                            control={<Radio color="primary" checked={isCorrect} />}
                        />
                    </Grid>
                </Grid>
            )}
        </>
    )
}

export default Answer;