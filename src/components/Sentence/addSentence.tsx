import {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {QuestionTypeCode} from "../../enum";
import {addNewSentence, AddNewSentenceInput} from "../../apis/sentences";
import {useAdmin} from "../../AdminContext";
import {useRouteMatch} from "react-router-dom";
import {SentenceInQuestion} from "../../types/Sentence";

enum TextFieldName {
    Content = "Content",
    Meaning = "Meaning",
    Audio = "Audio"
}
type NewSentenceFormProps = {
    questionId: string;
    focusId: string;
    code: QuestionTypeCode;
    choices: any;
    setChoices: any
}
export default function NewSentenceForm({ questionId, focusId, code, choices, setChoices }: NewSentenceFormProps) {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState('');
    const [meaning, setMeaning] = useState('');
    const [audio, setAudio] = useState('');
    const { admin } = useAdmin();
    const routeMatch = useRouteMatch<{
        bookId: string,
        unitId: string,
        levelIndex: string,
    }>();

    const changeText = (textFieldName: TextFieldName, value: string) => {
        switch (textFieldName) {
            case TextFieldName.Content:
                setContent(value);
                break;
            case TextFieldName.Meaning:
                setMeaning(value);
                break;
            case TextFieldName.Audio:
                setAudio(value);
                break;
            default:
                break;
        }
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        if (content && admin.token) {
            const input: AddNewSentenceInput = {
                bookId: routeMatch.params.bookId,
                code: code,
                content: content,
                focusId: focusId,
                levelIndex: Number(routeMatch.params.levelIndex),
                meaning: meaning,
                questionId: questionId,
                token: admin.token,
                unitId: routeMatch.params.unitId,
                audio: audio
            }
            addNewSentence(input)
                .then(data => {
                    const mapSentenceChoice: SentenceInQuestion = {
                        audio: "",
                        contextSection: data.contextSection,
                        en: data.contentSplit,
                        enText: data.content,
                        isConversation: data.isConversation,
                        isCorrect: false,
                        lowerBound: data.lowerBound,
                        questionId: data._id,
                        questionSection: data.questionSection,
                        sentence: {_id: data._id, active: true},
                        upperBound: 0,
                        vn: data.translateSplit,
                        vnText: data.translate

                    }
                    setChoices([...choices, mapSentenceChoice]);
                    setOpen(false);
                })
        }
        else {
            window.alert('N???i dung c???a c??u kh??ng ???????c ????? tr???ng')
        }
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Th??m c??u nhi???u
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'sm'} fullWidth={true}>
                <DialogTitle id="form-dialog-title">T???o c??u m???i</DialogTitle>
                <DialogContent>
                    <TextField
                        error={content ? false : true}
                        helperText={content ? '' : 'B???t bu???c'}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="N???i dung"
                        style={{
                            width: '80%',
                            marginBottom: 30
                        }}
                        required={true}
                        onChange={(event) => changeText(TextFieldName.Content, event.target.value)}
                        value={content}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="B???n d???ch"
                        style={{
                            width: '80%',
                            marginBottom: 30
                        }}
                        onChange={(event) => changeText(TextFieldName.Meaning, event.target.value)}
                        value={meaning}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="???????ng d???n audio (optional)"
                        style={{
                            width: '80%',
                            marginBottom: 30
                        }}
                        onChange={(event) => changeText(TextFieldName.Audio, event.target.value)}
                        value={audio}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        H???y
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        L??u
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}