import React, { useCallback, useRef, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  TextField,
  makeStyles,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { toast } from "react-toastify";
import { createNewVersion } from "apis/version";
import { useVersionContext } from "hooks";

const useStyles = makeStyles({
  input: {
    width: "80%",
    marginBottom: 30,
  },
});

const NewVersion = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const tagRef = useRef<HTMLInputElement>();
  const desRef = useRef<HTMLInputElement>();
  const osRef = useRef<HTMLSelectElement>();
  const { setRecallHandle } = useVersionContext();

  const toggleOpen = useCallback(() => {
    setOpen((current) => !current);
  }, []);

  const submitHandle = () => {
    if (!tagRef.current?.validity.valid) {
      toast.error("Tag không phù hợp");
      return;
    }
    if (!desRef.current?.validity.valid) {
      toast.error("Mô tả không phù hợp");
      return;
    }
    if (!osRef.current?.value) {
      toast.error("Nền tảng không phù hợp");
      return;
    }
    createNewVersion({
      tag: tagRef.current.value,
      description: desRef.current.value,
      os: osRef.current.value,
    }).then(() => {
      toast.success("Thêm phiên bản thành công");
      if (setRecallHandle) {
        toggleOpen();
        setRecallHandle(true);
      }
    });
  };

  return (
    <React.Fragment>
      <Box marginTop={5}>
        <Button onClick={toggleOpen} variant="contained" color="primary">
          Thêm phiên bản mới
        </Button>
      </Box>
      <Dialog
        open={open}
        aria-labelledby="version-dialog"
        maxWidth={"sm"}
        fullWidth={true}
      >
        <DialogTitle>Thông tin phiên bản</DialogTitle>
        <DialogContent>
          <TextField
            inputRef={tagRef}
            className={classes.input}
            required={true}
            margin="dense"
            label="Tag (ex: 1.0.0)"
            helperText="Bắt buộc"
          />
          <TextField
            inputRef={desRef}
            className={classes.input}
            required={true}
            margin="dense"
            label="Mô tả chi tiết"
            helperText="Bắt buộc"
          />
          <FormControl fullWidth>
            <InputLabel>Nền tảng *</InputLabel>
            <Select
              defaultValue={"Android"}
              required={true}
              className={classes.input}
              inputRef={osRef}
            >
              <MenuItem value={"Android"}>Android</MenuItem>
              <MenuItem value={"iOS"}>iOS</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleOpen} color="secondary">
            HỦY
          </Button>
          <Button onClick={submitHandle} color="primary">
            TẠO
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default React.memo(NewVersion);
