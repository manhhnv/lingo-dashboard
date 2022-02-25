import { SearchWord } from "../../types/Words";
import { Grid } from "@material-ui/core";
import { BaseImageUrl } from "../../constant";

export default function WordOption(props: SearchWord) {
  return (
    <Grid container={true} spacing={3}>
      <Grid item={true} xs={4}>
        <img
          src={props?.imageRoot ? `${BaseImageUrl}/${props.imageRoot}/${props.content}.jpg` : props.imageUrl}
          alt="ImageUnit"
          style={{
              width: 50,
              height: 50
          }}
        />
      </Grid>
      <Grid item={true} xs={4}>
          {props.content}
      </Grid>
      <Grid item={true} xs={3}>
          {props.meaning}
      </Grid>
    </Grid>
  );
}
