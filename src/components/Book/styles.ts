import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        height: '100%',
        cursor: 'pointer'
    },
    cardContentContainer: {
        justifyContent: 'space-between'
    }
}));

export default useStyles;