import React from "react";
import { Notification } from "../../../apis/notifications/types";
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Grid,
    IconButton,
    Chip,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Settings";
import RemoveIcon from "@material-ui/icons/Delete";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        minHeight: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    }
})

const NotificationItem = (props: Notification) => {
    const classes = useStyles();
    return (
        <Grid item xl={4}>
            <Card className={classes.root}>
                <CardContent>
                    <Typography
                        align="left"
                        style={{ fontWeight: "bold" }}
                        paragraph={true}
                    >
                        {props?.title}
                    </Typography>
                    <Typography
                        align="left"
                        paragraph={true}
                    >
                        {props?.body}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton>
                        <EditIcon />
                    </IconButton>
                    <IconButton>
                        <RemoveIcon color="error" />
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
    )
}

export default React.memo(NotificationItem);
