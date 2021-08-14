import { Grid, Switch } from "@material-ui/core";
import { WordInQuestion } from "../../../types/Word";


export default function MatchingItem (props: WordInQuestion) {
    return (
        <Grid container={true} spacing={3}>
            <Grid item={true} xs={5}>
                {props.content}
            </Grid>
            <Grid item={true} xs={4}>
                {props.meaning}
            </Grid>
            <Grid item={true} xs={3}>
              <Switch checked={props.word?.active} color="primary" />
            </Grid>
        </Grid>
    )
}