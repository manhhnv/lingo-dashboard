import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  makeStyles,
  Button,
} from "@material-ui/core";
import { VersionModel } from "models";
import React, { useRef } from "react";
import { toast } from "react-toastify";
import { updatePlatformVersion } from "apis/version";
import { useVersionContext } from "hooks";

const useStyles = makeStyles({
  input: {
    width: "80%",
    marginBottom: 30,
  },
});

type DialogProps = {
  open: boolean;
  toggleOpen: () => void;
  version: VersionModel;
};

const VersionDialog = ({ open, version, toggleOpen }: DialogProps) => {
  const classes = useStyles();
  const tagRef = useRef<HTMLInputElement>();
  const desRef = useRef<HTMLInputElement>();
  const { setRecallHandle } = useVersionContext();

  const submitUpdating = () => {
    if (!tagRef.current?.validity.valid) {
      toast.error("Tag không hợp lệ");
      return;
    }
    if (!desRef.current?.validity.valid) {
      toast.error("Mô tả không hợp lệ");
      return;
    }
    const tag = tagRef.current?.value;
    const description = desRef.current?.value;
    updatePlatformVersion({ id: version._id, tag, description }).then(() => {
      toast.success("Cập nhật thành công");
      toggleOpen();
      if (setRecallHandle) {
        setRecallHandle(true);
      }
    });
  };
  return (
    <Dialog
      open={open}
      aria-labelledby="version-dialog"
      maxWidth={"sm"}
      fullWidth={true}
    >
      <DialogTitle id={version._id}>
        Bản cập nhật ứng dụng trên {version.os}
      </DialogTitle>
      <DialogContent>
        <TextField
          inputRef={tagRef}
          className={classes.input}
          required={true}
          defaultValue={version.tag}
          margin="dense"
          label="Tag (ex: 1.0.0)"
          helperText="Bắt buộc"
        />
        <TextField
          inputRef={desRef}
          className={classes.input}
          required={true}
          defaultValue={version.description}
          margin="dense"
          label="Mô tả chi tiết"
          helperText="Bắt buộc"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleOpen} color="secondary">
          HỦY
        </Button>
        <Button onClick={submitUpdating} color="primary">
          LƯU
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(VersionDialog);
