import {useAdmin} from "../../../AdminContext";
import React, {useEffect, useState} from 'react';
import {Button, Container} from "@material-ui/core";
import {Redirect} from "react-router";
import DashboardLayout from "../../../layouts/DashboardLayout";
import {makeStyles} from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {getCurrentVersion, updateNewVersion} from "../../../apis/version";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: "auto"
    },
});
const VersionPage = () => {
    const classes = useStyles();
    const {admin} = useAdmin();
    const [version, setVersion] = useState('');
    const [des, setDes] = useState('');
    const [open, setOpen] = useState(false);
    const [tag, setTag] = useState('');
    const [newDes, setNewDes] = useState('');
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        if (admin.token) {
            updateNewVersion(tag, newDes, admin.token)
                .then((data) => {
                    setVersion(data.tag);
                    setDes(data.description);
                })
        }
        setOpen(false);
    }
    const tagOnchange = (value: string) => {
        setTag(value);
    }
    const descriptionOnchange = (value: string) => {
        setNewDes(value);
    }
    useEffect(() => {
        getCurrentVersion()
            .then((data) => {
                setVersion(data.tag);
                setDes(data.description);
            })
    }, [])
    return (
        <React.Fragment>
            {admin.token ? (
                <DashboardLayout>
                    <React.Fragment>
                        <Container>
                            <Card className={classes.root}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt="Contemplative Reptile"
                                        height="140"
                                        image="/static/images/cards/contemplative-reptile.jpg"
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Phiên bản {version}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Mô tả: {des}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={handleClickOpen}>
                                        Cập nhật
                                    </Button>
                                </CardActions>
                            </Card>
                        </Container>
                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'sm'}
                                fullWidth={true}>
                            <DialogTitle id="form-dialog-title">Mô tả bản cập nhật mới</DialogTitle>
                            <DialogContent>
                                <TextField
                                    error={tag ? false : true}
                                    helperText={tag ? '' : 'Bắt buộc'}
                                    autoFocus
                                    margin="dense"
                                    id="tag"
                                    label="Tag (ex: 1.0.0)"
                                    style={{
                                        width: '80%',
                                        marginBottom: 30
                                    }}
                                    required={true}
                                    onChange={(event) => tagOnchange(event.target.value)}
                                    value={tag}
                                />
                                <TextField
                                    error={newDes ? false : true}
                                    helperText={newDes ? '' : 'Bắt buộc'}
                                    margin="dense"
                                    id="des"
                                    label="Mô tả chi tiết"
                                    style={{
                                        width: '80%',
                                        marginBottom: 30
                                    }}
                                    required={true}
                                    onChange={(event) => descriptionOnchange(event.target.value)}
                                    value={newDes}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpen(false)} color="primary">
                                    Hủy
                                </Button>
                                <Button onClick={handleClose} color="primary">
                                    Lưu
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </React.Fragment>
                </DashboardLayout>
            ) : <Redirect to='/login' exact/>}
        </React.Fragment>
    )
}
export default VersionPage;