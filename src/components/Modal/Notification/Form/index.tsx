import { Button, InputLabel, MenuItem, Select } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import React, { useRef, useEffect } from "react";
import { FormControl } from "@material-ui/core";
import { Notification as HashCode, Action } from "enum";
import { createNotification, updateNotification } from "apis/notifications";
import { Notification } from "apis/notifications/types";

type NotificationFormProps = {
  action: Action;
  notification?: Notification;
  visible: boolean;
  toggleModal: () => void;
};

const NotificationForm = ({
  notification,
  visible,
  toggleModal,
  action,
}: NotificationFormProps) => {
  const titleRef = useRef<HTMLInputElement>();
  const bodyRef = useRef<HTMLInputElement>();
  const codeRef = useRef<HTMLSelectElement>();

  const saveNotification = () => {
    const title = titleRef.current?.value;
    const body = bodyRef.current?.value;
    const hashCode = codeRef.current?.value as HashCode;

    if (title && body && hashCode) {
      const createHandler = () => {
        createNotification(title, body, hashCode as HashCode).then((res) => {
          if (res.status === 201 && res.data) {
            toggleModal();
          }
        });
      };
      const updateHandler = () => {
        updateNotification({
          _id: notification?._id,
          title,
          body,
          hashCode,
        }).then((res) => {
          if (res.status === 200) {
            toggleModal();
          }
        });
      };
      if (action === Action.Create) {
        createHandler();
      } else if (action === Action.Update) {
        updateHandler();
      }
    } else {
      window.alert("Bạn phải nhập đủ thông tin thông báo.");
    }
  };

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  return (
    <div>
      <Dialog
        open={visible}
        aria-labelledby="form-dialog-title"
        maxWidth={"sm"}
        fullWidth={true}
        onBackdropClick={toggleModal}
      >
        <DialogTitle id="form-dialog-title">Thông báo ứng dụng</DialogTitle>
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
            defaultValue={notification?.title && notification.title}
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
            defaultValue={notification?.body && notification.body}
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
              defaultValue={notification?.hashCode && notification?.hashCode}
            >
              {Object.values(HashCode).map((name) => (
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

export default React.memo(NotificationForm);
