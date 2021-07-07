import React, { useState } from "react";
import { Box, Container, Grid } from '@material-ui/core';
import { useAdmin } from "../../../AdminContext";
import { Redirect, useRouteMatch } from "react-router-dom";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { Helmet } from "react-helmet-async";
import LevelComponent from "../../../components/Level";


const PageListLevel = () => {
    const [isPending, setIsPending] = useState(true);
    const routeMatch = useRouteMatch<{ bookId: string, unitId: string }>()
    const { admin } = useAdmin();
    const levels = [0, 1, 2, 3, 4].map(item => {
        return (
            <Grid
                item
                lg={2}
                sm={6}
                xl={3}
                xs={12}
                key={item}
            >
                <LevelComponent
                    key={item}
                    levelIndex={item}
                    bookId={routeMatch.params.bookId}
                    unitId={routeMatch.params.unitId}
                />
            </Grid>
        )
    })

    return (
        <React.Fragment>
            {!admin?.token && (
                <Redirect to='/login' />
            )}
            {isPending ? (
                <DashboardLayout>
                    <React.Fragment>
                        <Helmet>
                            <title>Levels In Unit</title>
                        </Helmet>
                        <Box minHeight={"100%"} py={3}>
                            <Container maxWidth={false}>
                                <Grid
                                    container={true}
                                    spacing={3}
                                >
                                    {levels}
                                </Grid>
                            </Container>
                        </Box>
                    </React.Fragment>
                </DashboardLayout>
            ) : null}
        </React.Fragment>
    )
}

export default PageListLevel;