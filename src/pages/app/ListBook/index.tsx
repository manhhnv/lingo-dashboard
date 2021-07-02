import { Button } from "@material-ui/core";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { RootState } from "../../../redux/slices";
import React from "react";
import { Admin } from "../../../types/Admin";
import useBooks from "../../../hooks/useBooks";

type ListBookProps = {
    admin?: Admin
} & RouteComponentProps<{grade: string}>

const ListBook = (props: ListBookProps) => {
    
    console.log(props.match.params.grade)

    const content = (
        <Button></Button>
    )
    const { books } = useBooks(Number(props.match.params.grade), props.admin?.token)
    return (
        <>
            {props.admin && props.admin.token ? (
                <DashboardLayout>
                    {content}
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