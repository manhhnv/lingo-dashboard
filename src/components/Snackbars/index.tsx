import { Snackbar } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useState } from 'react';
import { Alert } from './Alert';
import { Color } from "@material-ui/lab/Alert"

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

interface CustomizedSnackbarsProps {
    open: boolean;
    message?: string;
    severity?: Color;
}

const CustomizedSnackbars = ({open, message, severity}: CustomizedSnackbarsProps) => {
    const [isOpen, setIsOpen] = useState(open);
    const classes = useStyles();

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setIsOpen(false);
      };
    return (
        <div className={classes.root}>
            <Snackbar open={isOpen} autoHideDuration={3500} onClose={handleClose}>
                <Alert severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default CustomizedSnackbars;