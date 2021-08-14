import { Grid, Typography, IconButton, Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PlayIcon from "@material-ui/icons/VolumeUp";
import { WordInQuestion } from "../../types/Word";
import { ChangeQuestionChoice, toggleChoice } from "../../apis/questions";
import { useAdmin } from "../../AdminContext";
import { useRouteMatch } from "react-router-dom";
import { useState } from "react";

const useStyles = makeStyles({
  root: {
    paddingBottom: 10,
  },
  deleteButton: {
    float: "right",
  },
  answerImage: {
    width: 80,
    height: 80,
  },
  content: {
    paddingTop: 30,
  },
  switch: {
    marginTop: 22,
  },
});

const Answer = ({
  isCorrect,
  content,
  word,
  image,
  audio,
  questionId,
}: WordInQuestion) => {
  const classes = useStyles();
  const audioInstance = new Audio(audio);
  const [active, setActive] = useState(word?.active);
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
      <Grid container={true} spacing={3}>
        {image && (
          <Grid item xs={4}>
            <img src={image} alt="ImageUnit" className={classes.answerImage} />
          </Grid>
        )}
        <Grid item xs={image ? 3 : 5}>
          <Typography className={classes.content}>{content}</Typography>
        </Grid>
        <Grid item xs={2}>
          <IconButton onClick={playAudio} className={classes.content}>
            <PlayIcon />
          </IconButton>
        </Grid>
        <Grid item xs={3}>
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
                  choiceId: word!._id,
                });
              }
              else {
                window.alert('Đây là đáp án đúng')
              }
            }}
            className={classes.switch}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Answer;
