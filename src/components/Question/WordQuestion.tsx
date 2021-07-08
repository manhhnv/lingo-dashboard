import { Grid, Paper, Typography, Box, RadioGroup, TextField } from "@material-ui/core";
import { MappedWordQuestion } from "../../types/Question";
import { makeStyles } from "@material-ui/core/styles";
import Answer from "./Answer";

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
                                    props.choices.map((choice, index) => {
                                        return (
                                            <Answer
                                                {...choice}
                                                key={index}
                                            />
                                        )
                                    })
                                }
                            </RadioGroup>
                            <TextField label="Search">

                            </TextField>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Grid>
    )
}
export default WordQuestion;