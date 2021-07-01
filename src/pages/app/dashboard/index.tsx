import { Box, Container, Grid } from "@material-ui/core";
import Book from "../../../components/Book";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { connect } from "react-redux";
import { RootState } from "../../../redux/slices";
import React from 'react';
import { Admin } from "../../../types/Admin";
import { Redirect } from "react-router";

interface DashboardProps {
    admin?: Admin
}

const Dashboard = (props: DashboardProps) => {

    const books = [1, 2, 3, 4, 5, 6,
        7, 8, 9, 10, 11, 12].map(grade => (
            <Grid
                item
                lg={2}
                sm={6}
                xl={3}
                xs={12}
                key={grade}
            >
                <Book grade={grade} admin={props?.admin}/>
            </Grid>
        ))

    const content = (
        <Box
            py={3}
            minHeight={"100%"}
        >
            <Container maxWidth={false}>
                <Grid
                    container={true}
                    spacing={3}
                >
                    {books}
                </Grid>
            </Container>
        </Box>
    )

    return (
        <React.Fragment>
            {props?.admin?.token ? (
                <DashboardLayout children={content} />
            ) : (
                <Redirect to='/login' exact />
            )}
        </React.Fragment>
    )
};

const mapStateToProps = (state: RootState) => {
    return {
        admin: state.admin
    }
}

export default connect(mapStateToProps, null)(React.memo(Dashboard));
