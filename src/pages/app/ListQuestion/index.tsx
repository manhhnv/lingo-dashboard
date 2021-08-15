import { Box, CircularProgress, Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import { useAdmin } from "../../../AdminContext";
import { getQuestionsInLevel } from "../../../apis/questions";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { reduceQuestions } from "./reduceQuestions";
import {
  MappedSentenceQuestion,
  MappedWordQuestion,
} from "../../../types/Question";
import { mapSentenceQuestion, mapWordQuestion } from "./service";
import ListWordQuestions from "../../../components/Question/ListWordQuestions";

const ListQuestions = () => {
  const { admin } = useAdmin();
  const [wordQuestions, setWordQuestions] = useState<MappedWordQuestion[]>();
  const [sentenceQuestions, setSentenceQuestions] = useState<
    (MappedSentenceQuestion | undefined)[]
  >([]);
  const [isPending, setIsPending] = useState(true);
  const routeMatch = useRouteMatch<{
    bookId: string;
    unitId: string;
    levelIndex: string;
  }>();

  useEffect(() => {
    if (admin?.token) {
      getQuestionsInLevel({
        token: admin.token,
        bookId: routeMatch.params.bookId,
        unitId: routeMatch.params.unitId,
        levelIndex: Number(routeMatch.params.levelIndex),
      })
        .then((data) => {
          if (data) {
            const { wordQuestions, sentenceQuestions } = reduceQuestions(
              data.listQuestions
            );
            const result = mapWordQuestion(wordQuestions, data.wordsInLesson);
            console.log(result);
            setWordQuestions(result);
            const sentenceResult = mapSentenceQuestion(
              sentenceQuestions,
              data.sentencesInLesson,
              data.wordsInLesson
            );
            console.log(sentenceResult);
            setSentenceQuestions(sentenceResult);
          }
        })
        .finally(() => {
          setIsPending(false);
        });
    }
  }, [
    admin?.token,
    routeMatch.params.bookId,
    routeMatch.params.unitId,
    routeMatch.params.levelIndex,
  ]);
  return (
    <React.Fragment>
      {!admin?.token && <Redirect to="/login" />}
      <DashboardLayout>
        <React.Fragment>
          {isPending ? (
            <CircularProgress />
          ) : (
            <Box minHeight={"100%"} py={3} justifyContent="center">
              <Container maxWidth={false} style={{ margin: "auto" }}>
                <Grid
                  container={true}
                  spacing={3}
                  style={{ justifyContent: "space-around" }}
                >
                  <ListWordQuestions
                    questions={wordQuestions}
                    sentenceQuestions={sentenceQuestions}
                  />
                </Grid>
              </Container>
            </Box>
          )}
        </React.Fragment>
      </DashboardLayout>
    </React.Fragment>
  );
};
export default React.memo(ListQuestions);
