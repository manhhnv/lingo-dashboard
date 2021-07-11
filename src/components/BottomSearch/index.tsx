import { makeStyles, Theme, createStyles, } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from "@material-ui/icons/Add"
import Alert from '@material-ui/lab/Alert';
import { useState } from "react";
import { addChoice, AddQuestionChoice } from "../../apis/questions";
import { useRouteMatch } from 'react-router-dom';
import { useAdmin } from '../../AdminContext';
import { WordInQuestion } from '../../types/Word';
import md5 from "md5";
import { BaseAudioUrl, BaseImageUrl } from '../../constant';
import {QuestionTypeCode} from "../../enum";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },
    }),
);

type BottomSearchProps = {
    questionId: string;
    setChoices: React.Dispatch<React.SetStateAction<WordInQuestion[]>>;
    choices: WordInQuestion[];
    focusId: string;
    code: QuestionTypeCode

}

export default function BottomSearch({ questionId, setChoices, choices, focusId, code }: BottomSearchProps) {
    const classes = useStyles();
    const [showAlert, setShowAlert] = useState(false);
    const [inputContent, setInputContent] = useState('');
    const { admin } = useAdmin();

    const routeMatch = useRouteMatch<{
        bookId: string,
        unitId: string,
        levelIndex: string
    }>();

    const addChoiceHandle = (input: AddQuestionChoice) => {
        const content = input.content.trim();
        if (admin.token && content) {
            addChoice(admin.token, {...input, content: content})
                .then(data => {
                    console.log(data)
                    if (data.success && data.word) {
                        const word = data.word;
                        const hash = md5(word.content.replace("'", "_"));
                        const clonedChoices = choices;
                        const newChoice = {
                            meaning: word.meaning,
                            image: `${BaseImageUrl}/${word.imageRoot}/${word?.content}.jpg`,
                            hash: hash,
                            audio: `${BaseAudioUrl}/${hash}.mp3`,
                            isCorrect: false,
                            content: word!.content,
                            word: {
                                _id: word._id,
                                active: true
                            },
                            questionId: questionId
                        }
                        setChoices([...clonedChoices, newChoice]);
                        setShowAlert(false);
                    }
                    else {
                        console.log(data)
                        setShowAlert(true);
                    }
                })
                .catch(err => {
                    setShowAlert(true);
                })
        }
    }
    const onChangeText = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(event.target.value)
        setInputContent(event.target.value)
    }

    return (
        <>
            <Paper component="form" className={classes.root}>
                <IconButton className={classes.iconButton} aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <InputBase
                    className={classes.input}
                    placeholder="Từ muốn thêm?"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    onChange={(event) => onChangeText(event)}
                />
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton color="primary" className={classes.iconButton} aria-label="directions"
                    onClick={() => addChoiceHandle({
                        bookId: routeMatch.params.bookId,
                        unitId: routeMatch.params.unitId,
                        levelIndex: Number(routeMatch.params.levelIndex),
                        questionId: questionId,
                        content: inputContent,
                        code: code,
                        focusId: focusId,
                    })}
                >
                    <AddIcon />
                </IconButton>
            </Paper>
            {showAlert && <Alert severity="error">Không tìm thấy từ vựng</Alert>}
        </>
    );
}
