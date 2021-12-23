import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Settings";
import NotificationForm from "./Form";
import { memo, Fragment } from "react";
import { Notification } from "apis/notifications/types";
import { Action } from "enum";
import { useState } from "react";

type EditNotificationProps = {
  notification: Notification;
};

const EditNotification = memo(({ notification }: EditNotificationProps) => {
  const [visible, setVisible] = useState(false);
  const toggleModal = () => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  return (
    <Fragment>
      <IconButton onClick={toggleModal}>
        <EditIcon />
      </IconButton>
      <NotificationForm
        notification={notification}
        action={Action.Create}
        visible={visible}
        toggleModal={toggleModal}
      />
    </Fragment>
  );
});

export { EditNotification };
