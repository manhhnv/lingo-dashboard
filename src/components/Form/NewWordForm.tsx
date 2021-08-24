import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { addNewWord } from "../../apis/Words";
import { QuestionTypeCode } from "../../enum";
import { RootState } from "../../redux/slices";

enum Fields {
  Content = "Content",
  Meaning = "Meaning",
  Type = "Type",
  Pronunciation = "Pronunciation",
}

type NewWordFormProps = {
    code: QuestionTypeCode;
    focusId: string;
    questionId: string;
}

const NewWordForm = ({ code, focusId, questionId }: NewWordFormProps) => {
  const [content, setContent] = useState("");
  const [meaning, setMeaning] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [open, setOpen] = useState(false);
  const params =
    useParams<{ bookId: string; unitId: string; levelIndex: string }>();

  const admin = useSelector((store: RootState) => store.admin);

  const openForm = () => setOpen(true);
  const closeForm = () => setOpen(false);

  const textOnchange = (field: Fields, value: string) => {
    switch (field) {
      case Fields.Content:
        setContent(value);
        break;
      case Fields.Meaning:
        setMeaning(value);
        break;
      case Fields.Pronunciation:
        setPronunciation(value);
        break;
      default:
        break;
    }
  };

  const addNewWordHandle = () => {
    if (admin?.token) {
      if (content) {
        addNewWord(
            admin.token,
            {
                bookId: params.bookId,
                unitId: params.unitId,
                levelIndex: Number(params.levelIndex),
                questionId: questionId,
                focusId: focusId,
                code: code,
                content: content,
                meaning: meaning,
                pronunciation: pronunciation,
            }
        ).then((res) => {
            if (res.success) {
                setOpen(false);
            }
        })
      }
      else {
          window.alert("Content can not be blank");
      }
    }
  };

  return (
    <div>
      <Button onClick={openForm} variant="outlined" color="primary">
        Tạo từ mới
      </Button>
      <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
        maxWidth={"sm"}
        fullWidth={true}
      >
        <DialogTitle id="new-word-form-title">Tạo từ mới</DialogTitle>
        <DialogContent>
          <TextField
            error={content ? false : true}
            helperText={content ? "" : "Bắt buộc"}
            autoFocus
            margin="dense"
            id="word-content"
            label="Tiếng Anh"
            style={{
              width: "80%",
              marginBottom: 30,
            }}
            required={true}
            value={content}
            onChange={(e) => textOnchange(Fields.Content, e.target.value)}
          />
          <TextField
            margin="dense"
            id="word-meaning"
            label="Nghĩa tiếng Việt"
            style={{
              width: "80%",
              marginBottom: 30,
            }}
            onChange={(e) => textOnchange(Fields.Meaning, e.target.value)}
            value={meaning}
          />
          <TextField
            margin="dense"
            id="word-pronunciation"
            label="Phiên âm"
            style={{
              width: "80%",
              marginBottom: 30,
            }}
            onChange={(e) => textOnchange(Fields.Pronunciation, e.target.value)}
            value={pronunciation}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeForm} color="primary">
            Hủy
          </Button>
          <Button onClick={addNewWordHandle} color="primary">Lưu</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewWordForm;
