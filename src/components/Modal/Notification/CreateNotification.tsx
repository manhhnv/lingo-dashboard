import { memo, useState } from "react";
import NotificationForm from "./Form";
import { Action } from "enum";
import { Button } from "@material-ui/core";

const CreateNotification = memo(() => {
  const [visible, setVisible] = useState(false);
  const toggleModal = () => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={toggleModal}>
        Tạo thông báo mới
      </Button>
      <NotificationForm
        action={Action.Create}
        visible={visible}
        toggleModal={toggleModal}
      />
    </div>
  );
});

export { CreateNotification };
