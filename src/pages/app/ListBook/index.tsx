import { Box, Typography } from "@material-ui/core";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { RootState } from "../../../redux/slices";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Admin } from "../../../types/Admin";
import { Book } from "../../../types/Books";
import { getBooksByGrade } from "../../../apis/book";
import { Helmet } from "react-helmet-async";
import ListBokComponent from "../../../components/Book/ListBook";

type ListBookProps = {
    admin?: Admin
} & RouteComponentProps<{ grade: string }>

const ListBook = (props: ListBookProps) => {

    const [books, setBooks] = useState() as [Array<Book>, Dispatch<SetStateAction<Book[]>>];

    useEffect(() => {
        if (props.admin?.token) {
            getBooksByGrade(props.admin.token, Number(props.match.params.grade))
                .then(data => {
                    setBooks(data);
                })
        }
    }, [props.admin?.token, props.match.params.grade])

    return (
        <>
            {props.admin && props.admin.token ? (
                <DashboardLayout>
                    <Box minHeight={"100%"} pt={3} pb={10}>
                        <Helmet>
                            <title>Sách lớp {props.match.params.grade}</title>
                        </Helmet>
                        {books && books.length > 0   ? (
                            <ListBokComponent books={books} />
                        ) : (
                            <Typography>
                                NO BOOKS IN GRADE
                            </Typography>
                        )}
                    </Box>
                </DashboardLayout>
            ) : (
                <Redirect to="/login" />
            )}
        </>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        admin: state.admin
    }
}

export default connect(mapStateToProps, null)(React.memo(ListBook));