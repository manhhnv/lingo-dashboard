import { Box, CircularProgress, Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import { useAdmin } from "../../../AdminContext";
import { getQuestionsInLevel } from "../../../apis/questions";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { reduceQuestions } from "./reduceQuestions";
import { MappedWordQuestion } from "../../../types/Question";
import { mapWordQuestion } from "./service";
import ListWordQuestions from "../../../components/Question/ListWordQuestions";

const ListQuestions = () => {
  const { admin } = useAdmin();
  const [wordQuestions, setWordQuestions] = useState<MappedWordQuestion[]>();
  // const [sentenceQuestions, setSentenceQuestions] = useState<SentenceQuestion[]>();
  // const [wordsInLesson, setWordsInLesson] = useState<WordInLesson[]>();
  // const [sentencesInLesson, setSentencesInLesson] = useState<SentenceInLesson[]>();
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
            // setWordsInLesson(data.wordsInLesson);
            // setSentencesInLesson(data.sentencesInLesson);
            const { wordQuestions } = reduceQuestions(data.listQuestions);
            // console.log(data)
            // setSentenceQuestions(sentenceQuestions);
            const result = mapWordQuestion(wordQuestions, data.wordsInLesson);
            // console.log(result);
            setWordQuestions(result);
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
                <Grid container={true} spacing={5}>
                  <ListWordQuestions questions={wordQuestions} />
                  {/* <Grid item>
                                        <Paper style={{ padding: 20 }}>
                                            <Typography
                                                style={{ paddingBottom: 20, fontWeight: "bold" }}
                                            >
                                                {`Chọn hình ảnh và nghĩa tương ứng.`.toUpperCase()}
                                            </Typography>
                                            <Box minHeight={"100%"} minWidth={"100%"}>
                                                <Grid>
                                                    <img
                                                        src='https://s.sachmem.vn/public/dics_stable/the_tu/TTTA1-thi_diem/milk.jpg'
                                                        alt='image'
                                                        style={{
                                                            maxHeight: 100,
                                                            maxWidth: 100
                                                        }}
                                                    />
                                                    <audio controls>
                                                        <source
                                                            src='https://s.sachmem.vn/public/audio/dictionary2/a1b8585122e1ad60623d6a74d3eb3b6a.mp3'>
                                                        </source>
                                                    </audio>
                                                </Grid>
                                                <Grid style={{ paddingTop: 15, paddingBottom: 15 }}>
                                                    <Grid item>
                                                        <RadioGroup>
                                                        </RadioGroup>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Paper>
                                    </Grid> */}
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
