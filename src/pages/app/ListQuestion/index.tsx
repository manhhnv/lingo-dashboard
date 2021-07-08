import {
    Box,
    Button,
    Checkbox,
    CheckboxProps,
    CircularProgress,
    Container,
    FormControlLabel,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    RadioProps,
    TextField,
    Typography,
    withStyles,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import React, { createRef, useEffect, useRef, useState } from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import { useAdmin } from "../../../AdminContext";
import {
    getQuestionsInLevel,
    QuestionLevelOutput,
} from "../../../apis/questions";
import DashboardLayout from "../../../layouts/DashboardLayout";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props: CheckboxProps) => <Checkbox color="default" {...props} />);
  

const ListQuestions = () => {
    const { admin } = useAdmin();
    const [data, setData] = useState<QuestionLevelOutput>();
    const [isPending, setIsPending] = useState(true);
    const routeMatch = useRouteMatch<{
        bookId: string;
        unitId: string;
        levelIndex: string;
    }>();
    const contentRef = useRef<HTMLInputElement>();

    useEffect(() => {
        if (admin?.token) {
            getQuestionsInLevel({
                token: admin.token,
                bookId: routeMatch.params.bookId,
                unitId: routeMatch.params.unitId,
                levelIndex: Number(routeMatch.params.levelIndex),
            })
                .then((data) => {
                    setData(data);
                })
                .finally(() => {
                    setIsPending(false);
                });
        }
    }, []);
    const textOnChange = () => {
        console.log(`${contentRef.current?.value}\n`);
    };
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
                                            <Box minHeight={"100%"}>
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
                                                <Grid container={true} spacing={10} style={{paddingTop: 15, paddingBottom: 15}}>
                                                    <Grid item>
                                                        <RadioGroup>
                                                            <Grid container={true} spacing={3} style={{paddingBottom: 10}}>
                                                                <Grid item>
                                                                    <FormControlLabel
                                                                        value="ajslihnkdaiss"
                                                                        control={<GreenCheckbox checked={true} />}
                                                                        label="Quả bóng"
                                                                    />
                                                                </Grid>
                                                                <Grid item>
                                                                    <Button variant="outlined" color="secondary">
                                                                        Xóa
                                                                    </Button>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid container={true} spacing={3} style={{paddingBottom: 10}}>
                                                                <Grid item>
                                                                    <FormControlLabel
                                                                        value="ajslihnkdaiss"
                                                                        control={<GreenCheckbox checked={true} />}
                                                                        label="Quả bóng"
                                                                    />
                                                                </Grid>
                                                                <Grid item>
                                                                    <Button variant="outlined" color="secondary">
                                                                        Xóa
                                                                    </Button>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid container={true} spacing={3} style={{paddingBottom: 10}}>
                                                                <Grid item>
                                                                    <FormControlLabel
                                                                        value="ajslihnkdaiss"
                                                                        control={<GreenCheckbox checked={true} disabled/>}
                                                                        label="Quả bóng"
                                                                    />
                                                                </Grid>
                                                                <Grid item>
                                                                    <Button disabled variant="contained" color="secondary">
                                                                        Xóa
                                                                    </Button>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid container={true} spacing={3} style={{paddingBottom: 10}}>
                                                                <Grid item>
                                                                    <FormControlLabel
                                                                        value="ajslihnkdaiss"
                                                                        control={<GreenCheckbox checked={true} />}
                                                                        label="Quả bóng"
                                                                    />
                                                                </Grid>
                                                                <Grid item>
                                                                    <Button variant="outlined" color="secondary">
                                                                        Xóa
                                                                    </Button>
                                                                </Grid>
                                                            </Grid>
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
