import { Avatar, Card, CardContent, Grid, Typography } from "@material-ui/core";
import useStyles from "./styles";
import FolderIcon from "@material-ui/icons/FolderOpenRounded";
import { Admin } from "../../types/Admin";
import { Link } from "react-router-dom";

type BookProps = {
    grade: number;
    admin?: Admin;
}

const Book = (props: BookProps) => {
    const classes = useStyles();

    return (
        <Link to={{
            pathname: `/app/dashboard/books/${props.grade}`,
            state: {grade: props.grade}
        }}>
            <Card
                className={classes.root}
            >
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                        className={classes.cardContentContainer}
                    >
                        <Grid item>
                            <Typography
                                color="textPrimary"
                                style={{
                                    margin: 0,
                                    fontWeight: 500,
                                    fontSize: "15px",
                                }}
                            >
                                {`Sách lớp ${props.grade}`.toUpperCase()}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Avatar>
                                <FolderIcon />
                            </Avatar>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Link>
    )

}

export default Book;
