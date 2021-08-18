import { MappedSentenceQuestion } from "../../types/Question";
import { Box, Grid, Paper, RadioGroup, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { QuestionTypeCode } from "../../enum";
import Answer from "./Answer";
import SentenceAnswer from "./SentenceAnswer";
import { SentenceInQuestion } from "../../types/Sentence";
import NewSentenceForm from "../Sentence/addSentence";
import SearchingBox from "../Searching";
import { Redirect, useRouteMatch } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/slices";
import { addChoiceToQuestion } from "../../apis/questions";
import { WordInQuestion } from "../../types/Word";
import { SearchWord } from "../../types/Words";

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

const DistractedWordQuestions = [
  QuestionTypeCode.S7,
  QuestionTypeCode.S12,
  QuestionTypeCode.S17,
];

const SentenceQuestions = (props: MappedSentenceQuestion) => {
  const classes = useStyles();
  const [choices, setChoices] = useState(
    DistractedWordQuestions.includes(props.code)
      ? props.wrongWords
      : props.sentences
  );
  const admin = useSelector((rootState: RootState) => rootState.admin);
  const routeMatch =
    useRouteMatch<{ bookId: string; unitId: string; levelIndex: string }>();
  const addContentAsChoice = (item: string) => {
    if (admin?.token) {
      addChoiceToQuestion(
        admin.token,
        {
          bookId: routeMatch.params.bookId,
          unitId: routeMatch.params.unitId,
          levelIndex: Number(routeMatch.params.levelIndex),
          questionId: props.questionId,
          content: item,
          focusId: props.focusSentence,
          code: props.code,
          meaning: item,
          choiceId: item,
        }
      ).then((data) => {
        if (data.success) {
          const newChoice: WordInQuestion = {
            meaning: item,
            image: "",
            hash: "",
            audio: "",
            isCorrect: false,
            content: item,
            word: {
                _id: item,
                active: true,
            },
            questionId: props.questionId,
          }
          const cloned = choices;
          setChoices([...cloned, newChoice]);
        }
      })
    }
  };

  const addExistsWordToChoices = (word: SearchWord) => {
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
          focusId: props.focusSentence,
          code: props.code,
          choiceId: word._id,
          }
        ).then((data) => {
          if (data && data.success) {
            const cloned = choices;
            const wordInQuestion: WordInQuestion = {
              meaning: word.meaning,
              image: "",
              hash: "",
              audio: "",
              isCorrect: false,
              content: word.content,
              word: {
                _id: word._id,
                active: true,
              },
              questionId: props.questionId,
            }
            setChoices([...cloned, wordInQuestion]);
          }
        })
      }
  }
  return (
    <React.Fragment>
      {admin?.token ? (
        <Grid item>
          <Paper className={classes.root}>
            <Typography className={classes.title}>{props.content}</Typography>
            <Box>
              <Grid>
                <audio controls>
                  <source src={props?.audio} />
                </audio>
                <Typography>
                  {props.contentSplit
                    ?.map((item, index) => {
                      if (index !== props.hiddenWord) {
                        return item.text;
                      }
                      return "____";
                    })
                    .join(" ")}
                </Typography>
              </Grid>
              <Grid className={classes.answer}>
                <Grid item>
                  <RadioGroup>
                    {choices.map((choice, index) => {
                      if (DistractedWordQuestions.includes(props.code)) {
                        return <Answer {...choice} key={index} />;
                      } else {
                        const tempChoices = choice as SentenceInQuestion;
                        return <SentenceAnswer key={index} {...tempChoices} />;
                      }
                    })}
                  </RadioGroup>
                  {props.code === QuestionTypeCode.S10 && (
                    <NewSentenceForm
                      questionId={props.questionId}
                      focusId={props.focusSentence}
                      code={props.code}
                      choices={choices}
                      setChoices={setChoices}
                    />
                  )}
                  {[QuestionTypeCode.S12, QuestionTypeCode.S17].includes(
                    props.code
                  ) && <SearchingBox isOnlineSearch={false} callback={addContentAsChoice} />}
                  {props.code === QuestionTypeCode.S7 && (
                    <SearchingBox isOnlineSearch={true} callback={addExistsWordToChoices} />
                  )}
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      ) : (
        <Redirect to="/login" />
      )}
    </React.Fragment>
  );
};

export default SentenceQuestions;
