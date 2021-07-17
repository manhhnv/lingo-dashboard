import { FormControlLabel, Grid, Radio, Typography, IconButton, Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PlayIcon from "@material-ui/icons/VolumeUp";
import { WordInQuestion } from "../../types/Word";
import { ChangeQuestionChoice, toggleChoice } from "../../apis/questions";
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
    word,
    image,
    audio,
    questionId
}: WordInQuestion) => {
    const classes = useStyles();
    const audioInstance = new Audio(audio);
    const [active, setActive] = useState(word?.active);
    const { admin } = useAdmin()
    const playAudio = () => {
        audioInstance.play();
    }
    const routeMatch = useRouteMatch<{
        bookId: string,
        unitId: string,
        levelIndex: string
    }>();
    const toggleChoiceHandle = (input: ChangeQuestionChoice) => {
        if (admin.token) {
            toggleChoice(admin.token, input)
                .then(data => {
                    if (data) {
                        setActive(!active);
                    }
                })
                .catch(err => {
                    throw err;
                })
        }
    }
    return (
        <Grid
            container={true}
            spacing={3}
            className={classes.root}
        >
            <Grid
                item
            >
                <FormControlLabel
                    value={word?._id}
                    label={<Grid container={true} spacing={3}>
                        <Grid item>
                            {image ? (
                                    <img
                                        src={image}
                                        alt="ImageUnit"
                                        className={classes.answerImage}
                                    />
                                ): null }
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
                            <Switch
                                checked={active}
                                color="primary" 
                                onClick={() => {
                                    if (!isCorrect) {
                                        toggleChoiceHandle({    
                                            bookId: routeMatch.params.bookId,
                                            unitId: routeMatch.params.unitId,
                                            levelIndex: Number(routeMatch.params.levelIndex),
                                            questionId: questionId || '',
                                            choiceId: word!._id
                                        })
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>}
                    control={<Radio color="primary" checked={isCorrect} />}
                />
            </Grid>
        </Grid>
    )
}

export default Answer;