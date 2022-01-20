import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { VersionModel } from "models";
import VersionDialog from "./Dialog";
import AndroidLogo from "assets/images/android.png";
import iOS from "assets/images/iOS.png";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "auto",
  },
  platform: {
    width: 80,
    height: 80,
  },
});

const Version = (props: VersionModel) => {
  const { os, tag, description } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setOpen((current) => !current);
  }, []);

  return (
    <React.Fragment>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component={"img"}
            alt={os}
            title={os}
            src={os === "Android" ? AndroidLogo : iOS}
            className={classes.platform}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Phiên bản: {tag}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Mô tả: {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button onClick={toggleOpen} size="small" color="primary">
            Cập nhật
          </Button>
        </CardActions>
      </Card>
      <VersionDialog version={props} open={open} toggleOpen={toggleOpen} />
    </React.Fragment>
  );
};

export default React.memo(Version);
