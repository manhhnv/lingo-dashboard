import { Helmet } from "react-helmet-async";
import { Formik } from "formik";
import * as Yup from "yup";
import {
    Box,
    Button,
    Container,
    Grid,
    Link,
    TextField,
    Typography
} from '@material-ui/core';
import Facebook from '../components/Facebook';
import Google from '../components/Google';
import { Link as RouterLink, } from "react-router-dom";
import React from "react";

const Login = () => {
    return (
        <React.Fragment>
            <Helmet>
                <title>\Login | Lingo Admin</title>
            </Helmet>
            <div>
                Login Page
            </div>
        </React.Fragment>
    )
};

export default Login;
