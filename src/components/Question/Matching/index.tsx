import { Box, Grid, Paper, Typography } from "@material-ui/core";
import useStyles from "./useStyles";
import SearchingBox from "../../Searching";
import { MappedWordQuestion } from "../../../types/Question";
import { SearchWord } from "../../../types/Words";
import { WordInQuestion } from "../../../types/Word";
import { useState } from "react";
import { addChoiceToQuestion } from "../../../apis/questions";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/slices";
import { Redirect, useRouteMatch } from "react-router-dom";
import Answer from "../Answer";
import { BaseImageUrl } from "../../../constant";

export function MatchingQuestion(props: MappedWordQuestion) {
  const { choices, content } = props;
  const [pairs, setPairs] = useState(choices);
  const classes = useStyles();
  const admin = useSelector((state: RootState) => state.admin);
  const routeMatch = useRouteMatch<{
    bookId: string,
    unitId: string,
    levelIndex: string}>();

  const addWordToMatchingPairs = (word: SearchWord) => {
    if (admin?.token && word?._id) {
      addChoiceToQuestion(
        admin.token,
        {
          bookId: routeMatch.params.bookId,
          unitId: routeMatch.params.unitId,
          levelIndex: Number(routeMatch.params.levelIndex),
          questionId: props.questionId,
          content: word.content,
          meaning: word.meaning,
          focusId: props.focusId,
          code: props.code,
          choiceId: word._id,
        }
      ).then((data) => {
        if (data.success) {
          const cloned = pairs;
          const formatItem: WordInQuestion = {
            meaning: word.meaning,
            image: `${BaseImageUrl}/${word.imageRoot}/${word?.content}.jpg`,
            hash: "",
            audio: "",
            isCorrect: false,
            content: word.content,
            word: {
              _id: word._id,
              active: true,
            },
            questionId: props.questionId,
          };
          setPairs([...cloned, formatItem]);
        }
      })
    }
  };
  return (
    <>
      {admin?.token ? (
        <Grid item={true}>
          <Paper className={classes.root}>
            <Typography className={classes.title}>{content}</Typography>
            <Box className={classes.container}>
              {pairs.map((pair, index) => (
                <Answer key={index} {...pair}/>
              ))}
              <SearchingBox callback={addWordToMatchingPairs} isOnlineSearch={true}/>
            </Box>
          </Paper>
        </Grid>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}
