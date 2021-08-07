import React, { useEffect, useState } from "react";
import { getListNotifications } from "../../../apis/notifications";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/slices";
import { Notification } from "../../../apis/notifications/types";
import { Redirect } from "react-router-dom";
import DashboardLayout from "../../../layouts/DashboardLayout";
import {
  Container,
  Grid,
} from "@material-ui/core";
import NotificationItem from "./Item";

const Notifications = () => {
  const admin = useSelector((state: RootState) => state.admin);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  useEffect(() => {
    if (admin?.token) {
      getListNotifications(admin.token).then((data) => {
        if (data) {
          setNotifications(data.notifications);
        }
      });
    }
  }, [admin?.token]);
  return (
    <>
      {admin?.token ? (
        <DashboardLayout>
          <Container>
            <Grid container={true} spacing={3}>
              {notifications.length > 0 &&
                notifications.map((notification, index) => (
                  <NotificationItem {...notification} key={index} />
                ))}
            </Grid>
          </Container>
        </DashboardLayout>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default React.memo(Notifications);
