import { Card, CardContent, Container, Grid, Typography } from "@material-ui/core";
import { Book } from "../../types/Books";
import React from "react";
import { Link } from "react-router-dom";

type ListBookComponentProps = {
    books: Book[]
}


const ListBookComponent = ({ books }: ListBookComponentProps) => {

    return (
        <Container maxWidth={false}>
            <Grid container spacing={5}>
                {books.map(book => {
                    return (
                        <Grid
                            key={book._id}
                            sm={6}
                            lg={3}
                            md={6}
                            item
                            xs={12}
                        >
                            <Link to={`/app/dashboard/units/${book._id}`}>
                                <Card>
                                    <CardContent>
                                        <Grid container={true} spacing={1}>
                                            <Grid item>
                                                <img
                                                    src={book.cover}
                                                    alt="BookImage"
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography>
                                                    {book.name.toUpperCase()}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    )
}
export default React.memo(ListBookComponent);