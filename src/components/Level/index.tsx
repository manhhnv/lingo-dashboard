import { Avatar, Card, CardContent, Grid, Typography } from "@material-ui/core"
import React from "react"
import { Link } from "react-router-dom"
import useStyles from "./styles"
import FolderIcon from "@material-ui/icons/FolderOpenRounded";

type LevelComponentProps = {
    levelIndex: number;
    bookId: string;
    unitId: string;
}

const LevelComponent = ({ levelIndex, bookId, unitId }: LevelComponentProps) => {
    const classes = useStyles();
    return (
        <Link to={
            {
                // pathname: `/app/dashboard/questions/${bookId}/${unitId}/${levelIndex}`
                state: {
                    foo: true
                },
                pathname: `/app/dashboard/questions/${bookId}/${unitId}/${levelIndex}`
            }
        }>
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
                                Level {levelIndex + 1}
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
export default React.memo(LevelComponent)