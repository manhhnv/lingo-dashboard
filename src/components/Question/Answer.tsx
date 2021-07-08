import { FormControlLabel, Grid, Button, Radio } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


type AnswerProps = {
    content: string;
    _id: string;
    isCorrect: boolean;
}

const useStyles = makeStyles({
    root: {
        paddingBottom: 10
    },
    deleteButton: {
        float: 'right'
    }
})

const Answer = ({
    content,
    _id,
    isCorrect
}: AnswerProps) => {
    const classes = useStyles();
    return (
        <Grid
            container={true}
            spacing={3}
            className={classes.root}
        >
            <Grid
                item
                lg={6}
                xs={6}
            >
                <FormControlLabel
                    value={_id}
                    label={content}
                    control={<Radio color="primary" checked={isCorrect} />}
                />
            </Grid>
            <Grid item lg={6} xs={6}>
                <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.deleteButton}
                    disabled={isCorrect}
                >
                    Xóa
                </Button>
            </Grid>
        </Grid>
    )
}

export default Answer;