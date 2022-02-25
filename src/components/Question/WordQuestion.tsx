import { Grid, Paper, Typography, Box } from "@material-ui/core";
import { MappedWordQuestion } from "../../types/Question";
import { makeStyles } from "@material-ui/core/styles";
import Answer from "./Answer";
import { useState } from "react";
import SearchingBox from "../Searching";
import { SearchWord } from "../../types/Words";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/slices";
import { addChoiceToQuestion } from "../../apis/questions";
import { useParams } from "react-router-dom";
import { WordInQuestion } from "../../types/Word";
import { BaseImageUrl } from "../../constant";

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
  },
});

const WordQuestion = (props: MappedWordQuestion) => {
  const classes = useStyles();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [choices, setChoices] = useState(props.choices);
  const admin = useSelector((rootState: RootState) => rootState.admin);
  const params = useParams<{bookId: string, unitId: string, levelIndex: string}>();

  const addSearchWordToChoices = (word: SearchWord) => {
    if (admin?.token && word?._id) {
      addChoiceToQuestion(
        admin.token,
        {
          bookId: params.bookId,
          unitId: params.unitId,
          levelIndex: Number(params.levelIndex),
          questionId: props.questionId,
          content: word.content,
          meaning: word.meaning,
          focusId: props.focusId,
          code: props.code,
          choiceId: word._id,
        }
      ).then((data) => {
        if (data && data.success) {
          const cloned = choices;
          const wordInQuestion: WordInQuestion = {
            meaning: word.meaning,
            image: word.imageRoot ? `${BaseImageUrl}/${word.imageRoot}/${word?.content}.jpg` : "",
            hash: "",
            audio: "",
            isCorrect: false,
            content: word.content,
            word: {
              _id: word._id,
              active: true,
            },
            questionId: props.questionId,
            imageUrl: word?.imageUrl ? word.imageUrl : ""
          }
          setChoices([...cloned, wordInQuestion]);
        }
      })
    }
  }

  return (
    <Grid item>
      <Paper className={classes.root}>
        <Typography className={classes.title}>{props.content}</Typography>
        <Box className={classes.container}>
          <Grid>
            <img src={props.image ? props.image : props.imageUrl} alt="ImageWord" className={classes.image} />
            <audio controls>
              <source src={props.audio} />
            </audio>
          </Grid>
          <Grid className={classes.answer}>
            <Grid item>
              {choices.map((choice, index) => {
                return <Answer {...choice} key={index} />;
              })}
            </Grid>
          </Grid>
          <SearchingBox isOnlineSearch={true} callback={addSearchWordToChoices} />
        </Box>
      </Paper>
    </Grid>
  );
};
export default WordQuestion;
