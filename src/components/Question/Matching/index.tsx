import { Box, Grid, Paper, Typography } from "@material-ui/core";
import useStyles from "./useStyles";
import SearchingBox from "../../Searching";
import { MappedWordQuestion } from "../../../types/Question";
import MatchingItem from "./MatchingItem";


export function MatchingQuestion(props: MappedWordQuestion) {

    const { choices, content } = props;
  const classes = useStyles();
  return (
    <Grid item={true}>
      <Paper className={classes.root}>
        <Typography className={classes.title}>{content}</Typography>
        <Box className={classes.container}>
            {choices.map((choice, index) => (
                <MatchingItem {...choice} key={index}/>
            ))}
          <SearchingBox />
        </Box>
      </Paper>
    </Grid>
  );
}
