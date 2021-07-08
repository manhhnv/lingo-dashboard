import {
    Box,
    CircularProgress,
    Container,
    Grid,
    Paper,
    RadioGroup,
    Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import { useAdmin } from "../../../AdminContext";
import {
    getQuestionsInLevel,
    QuestionLevelOutput,
} from "../../../apis/questions";
import DashboardLayout from "../../../layouts/DashboardLayout";
import AnswerItem from "../../../components/Question/Answer";
import { reduceQuestions } from "./reduceQuestions";
import { WordInLesson } from "../../../types/Word";
import { SentenceInLesson } from "../../../types/Sentence";
import { WordQuestion, SentenceQuestion } from "../../../types/Question";



const ListQuestions = () => {
    const { admin } = useAdmin();
    const [wordQuestions, setWordQuestions] = useState<WordQuestion[]>();
    const [sentenceQuestions, setSentenceQuestions] = useState<SentenceQuestion[]>();
    const [wordsInLesson, setWordsInLesson] = useState<WordInLesson[]>();
    const [sentencesInLesson, setSentencesInLesson] = useState<SentenceInLesson[]>();
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
                        setWordsInLesson(data.wordsInLesson);
                        setSentencesInLesson(data.sentencesInLesson);
                        const { wordQuestions, sentenceQuestions } = reduceQuestions(data.listQuestions);
                        setWordQuestions(wordQuestions);
                        setSentenceQuestions(sentenceQuestions);
                    }
                })
                .finally(() => {
                    setIsPending(false);
                });
        }
    }, []);
    return (
        <React.Fragment>
            {!admin?.token && <Redirect to="/login" />}
            <DashboardLayout>
                <React.Fragment>
                    {isPending ? (
                        <CircularProgress />
                    ) : (
                        <Box minHeight={"100%"} py={3}>
                            <Container maxWidth={false} style={{ margin: "auto" }}>
                                <Grid container={true} spacing={2}>
                                    <Grid item>
                                        <Paper style={{ padding: 20 }}>
                                            <Typography
                                                style={{ paddingBottom: 20, fontWeight: "bold" }}
                                            >
                                                {`Chọn hình ảnh và nghĩa tương ứng.`.toUpperCase()}
                                            </Typography>
                                            <Box minHeight={"100%"} minWidth={"100%"}>
                                                <Grid>
                                                    <img
                                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaKdsj5H-KOUYqgfVUY9vQHTh0E-nCRU0nuQ&usqp=CAU"
                                                        alt="image"
                                                        style={{
                                                            maxWidth: 100,
                                                            maxHeight: 100,
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid style={{ paddingTop: 15, paddingBottom: 15 }}>
                                                    <Grid item>
                                                        <RadioGroup>
                                                            <AnswerItem
                                                                content="Quả bóng"
                                                                _id="abc"
                                                                isCorrect={true}
                                                            />
                                                            <AnswerItem
                                                                content="Bóng đá"
                                                                _id="abcs"
                                                                isCorrect={false}
                                                            />
                                                        </RadioGroup>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                    <Grid item>
                                        <Typography>
                                            {`Chọn hình ảnh và nghĩa tương ứng.`.toUpperCase()}
                                        </Typography>
                                    </Grid>
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
