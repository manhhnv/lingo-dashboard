import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        marginTop: 0,
        marginBottom: 0,
    },
    button: {
        fontWeight: 15,
        justifyContent: 'flex-start',
        letterSpacing: 0,
        marginBottom: 1.25,
        marginTop: 1.25,
        width: "100%",
        textTransform: 'none',
        marginRight: 1,
        textAlign: 'center',
        marginLeft: 20
    }
}));

export default useStyles;