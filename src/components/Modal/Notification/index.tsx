import { Button, InputLabel, MenuItem, Select } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import React, { useState, useRef, useEffect } from "react";
import { FormControl } from "@material-ui/core";
import { Notification } from "enum";
import { createNotification } from "apis/notifications";

const NotificationModal = () => {
  const [visible, setVisible] = useState(false);
  const titleRef = useRef<HTMLInputElement>();
  const bodyRef = useRef<HTMLInputElement>();
  const codeRef = useRef<HTMLSelectElement>();

  const toggleModal = () => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  const saveNotification = () => {
    const title = titleRef.current?.value;
    const body = bodyRef.current?.value;
    const hashCode = codeRef.current?.value;

    if (title && body && hashCode) {
      createNotification(title, body, hashCode as Notification).then((res) => {
        if (res.status === 201 && res.data) {
          toggleModal();
        }
      });
    }
  };

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={toggleModal}>
        Tạo thông báo mới
      </Button>
      <Dialog
        open={visible}
        aria-labelledby="form-dialog-title"
        maxWidth={"sm"}
        fullWidth={true}
        onBackdropClick={toggleModal}
      >
        <DialogTitle id="form-dialog-title">Tạo mẫu thông báo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tiêu đề"
            name="title"
            style={{
              width: "80%",
              marginBottom: 30,
            }}
            required={true}
            inputRef={titleRef}
          />
          <TextField
            margin="dense"
            id="name"
            label="Nội dung thông báo"
            name="body"
            style={{
              width: "80%",
              marginBottom: 30,
            }}
            required={true}
            inputRef={bodyRef}
          />
          <FormControl
            style={{
              width: "50%",
              marginBottom: 30,
            }}
          >
            <InputLabel id="demo-simple-select-label">Mã thông báo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Mã thông báo"
              required={true}
              inputRef={codeRef}
              name="hashCode"
              defaultValue={""}
            >
              {Object.values(Notification).map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={toggleModal}>
            Hủy
          </Button>
          <Button color="primary" onClick={saveNotification}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default React.memo(NotificationModal);
