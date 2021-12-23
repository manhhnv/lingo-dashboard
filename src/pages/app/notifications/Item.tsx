import React from "react";
import { Notification } from "apis/notifications/types";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  IconButton,
  Chip,
} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Delete";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";
import { sendNotification } from "apis/notifications";
import { EditNotification } from "components/Modal/Notification";

const useStyles = makeStyles({
  root: {
    minHeight: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

const NotificationItem = (props: Notification) => {
  const classes = useStyles();

  const sendNotificationHandle = () => {
    sendNotification(props._id)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        throw e;
      });
  };
  return (
    <Grid item xl={4} lg={3}>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            align="left"
            style={{ fontWeight: "bold" }}
            paragraph={true}
          >
            {props?.title}
          </Typography>
          <Typography align="left" paragraph={true}>
            {props?.body}
          </Typography>
        </CardContent>
        <CardActions>
          <EditNotification notification={props} />
          <IconButton>
            <RemoveIcon color="error" />
          </IconButton>
          <IconButton onClick={sendNotificationHandle}>
            <SendIcon color="primary" titleAccess={`Gửi thông báo ${props.hashCode}`} />
          </IconButton>
          <Chip
            label={props?.hashCode}
            color="primary"
            variant="outlined"
            size="small"
          />
        </CardActions>
      </Card>
    </Grid>
  );
};

export default React.memo(NotificationItem);
