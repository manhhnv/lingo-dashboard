import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import useStyles from "./styles";


type BookProps = {
    cover: string;
    totalUnits: number;
    bookId: string;
    bookName: string;
}

const Book = (props: BookProps) => {

    const classes = useStyles();

    return (
        <Card
            className={classes.root}
        >
            <CardContent>
                <Grid
                    container
                    spacing={1}
                    className={classes.cardContentContainer}
                >
                    <Grid item>
                        <img
                            src={props.cover}
                            alt={props.bookName}
                        />
                    </Grid>
                    <Grid item>
                        <Typography
                            color="textPrimary"
                            gutterBottom={true}
                            variant="h6"
                            style={{
                                margin: 0,
                                fontWeight: 500,
                                fontSize: "14px",
                                letterSpacing: "-0.05px",
                                lineHeight: 1.6,
                                marginBottom: "0.35em",
                                color: "#6b778c"
                            }}
                        >
                            {props.bookName}
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h3"
                            style={{
                                margin: 0,
                                fontWeight: 500,
                                fontSize: "24px",
                                letterSpacing: "-0.05px",
                                lineHeight: 1.6,
                                marginBottom: "0.35em",
                            }}
                        >
                            {props.totalUnits} Units
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )

}

export default Book;
