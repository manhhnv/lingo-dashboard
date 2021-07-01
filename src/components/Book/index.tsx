import { Avatar, Card, CardContent, Grid, Typography } from "@material-ui/core";
import useStyles from "./styles";
import FolderIcon from "@material-ui/icons/FolderOpenRounded";
import { getBooksByGrade } from "../../apis/book";
import { Admin } from "../../types/Admin";

type BookProps = {
    grade: number;
    admin?: Admin;
}

const Book = (props: BookProps) => {
    const classes = useStyles();
    const clickBookHandle = () => {
        if (props.admin?.token) {
            getBooksByGrade(props.admin.token, props.grade)
        }
    }
    return (
        <Card
            className={classes.root}
            onClick={clickBookHandle}
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
                            <FolderIcon/>
                        </Avatar>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )

}

export default Book;
