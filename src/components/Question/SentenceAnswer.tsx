import { Grid, Typography, IconButton, Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PlayIcon from "@material-ui/icons/VolumeUp";
import { ChangeQuestionChoice, toggleChoice } from "../../apis/questions";
import { useAdmin } from "../../AdminContext";
import { useRouteMatch } from "react-router-dom";
import { useState } from "react";
import { SentenceInQuestion } from "../../types/Sentence";

const useStyles = makeStyles({
  root: {
    paddingBottom: 10,
  },
  content: {
    margin: "auto",
  },
});

const SentenceAnswer = ({
  enText,
  audio,
  sentence,
  isCorrect,
  questionId,
}: SentenceInQuestion) => {
  const classes = useStyles();
  const audioInstance = new Audio(audio);
  const [active, setActive] = useState(sentence.active);
  const { admin } = useAdmin();
  const playAudio = () => {
    audioInstance.play();
  };
  const routeMatch = useRouteMatch<{
    bookId: string;
    unitId: string;
    levelIndex: string;
  }>();
  const toggleChoiceHandle = (input: ChangeQuestionChoice) => {
    if (admin.token) {
      toggleChoice(admin.token, input)
        .then((data) => {
          if (data) {
            setActive(!active);
          }
        })
        .catch((err) => {
          throw err;
        });
    }
  };
  return (
    <Grid container={true} spacing={3} className={classes.root}>
      <Grid item={true} xs={7} className={classes.content}>
        <Typography>{enText}</Typography>
      </Grid>
      <Grid item={true} xs={2} className={classes.content}>
        <IconButton onClick={playAudio}>
          <PlayIcon />
        </IconButton>
      </Grid>
      <Grid item={true} xs={3} className={classes.content}>
        <Switch
          checked={active}
          color="primary"
          onClick={() => {
            if (!isCorrect) {
              toggleChoiceHandle({
                bookId: routeMatch.params.bookId,
                unitId: routeMatch.params.unitId,
                levelIndex: Number(routeMatch.params.levelIndex),
                questionId: questionId || "",
                choiceId: sentence!._id,
              });
            } else {
              window.alert("Đây là đáp án đúng");
            }
          }}
        />
      </Grid>
    </Grid>
  );
};

export default SentenceAnswer;
