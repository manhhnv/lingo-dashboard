import { Helmet } from "react-helmet-async";
import React from "react";
import * as Yup from 'yup';
import { Formik } from 'formik';
import MainNavbar from "../../../layouts/MainNavbar";
import { Box, Button, Container, Link, TextField, Typography } from "@material-ui/core";
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { RootState } from "../../../redux/slices";
import { connect } from "react-redux";
import { Admin } from "../../../types/Admin";
import { adminLogin } from "../../../apis/login";
import { login } from "../../../redux/slices/adminSlice";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

interface LoginProps {
    admin?: Admin;
    login?: ActionCreatorWithPayload<Admin, string>;
}

const Login = (props: LoginProps) => {
    const loginHandle = async (email: string, password: string) => {
        const data = await adminLogin(email, password);
        if (data && props?.login) {
            props.login({
                email: data.user.email,
                displayName: data.user.displayName,
                avatar: data.user.avatar,
                token: data.token
            })
        }
    }
    return (
        <React.Fragment>
            {props.admin?.token && (
                <Redirect to='/app/dashboard'/>
            )}
            <Helmet>
                <title>Đăng nhập | Lingo Admin</title>
            </Helmet>
            <MainNavbar />
            <Box
                css={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'center',
                    marginTop: 70
                }}
            >
                <Container maxWidth="sm">
                    <Formik
                        initialValues={{
                            email: 'demo@devias.io',
                            password: 'Password123'
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                            password: Yup.string().max(255).required('Password is required')
                        })}
                        onSubmit={(values) => {
                            loginHandle(values.email, values.password)
                        }}
                    >
                        {({
                            errors,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            touched,
                            values
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box mb={5}>
                                    <Typography
                                        color="textPrimary"
                                        variant="h2"
                                    >
                                        Đăng nhập
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        gutterBottom
                                        variant="body2"
                                    >
                                        Trang quản lý ứng dụng Lingo
                                    </Typography>
                                </Box>
                                <TextField
                                    error={Boolean(touched.email && errors.email)}
                                    fullWidth
                                    helperText={touched.email && errors.email}
                                    label="Email Address"
                                    margin="normal"
                                    name="email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="email"
                                    value={values.email}
                                    variant="outlined"
                                />
                                <TextField
                                    error={Boolean(touched.password && errors.password)}
                                    fullWidth
                                    helperText={touched.password && errors.password}
                                    label="Password"
                                    margin="normal"
                                    name="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="password"
                                    value={values.password}
                                    variant="outlined"
                                />
                                <Box css={{ py: 2 }}>
                                    <Button
                                        color="primary"
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                    >
                                        Sign in now
                                    </Button>
                                </Box>
                                <Typography
                                    color="textSecondary"
                                    variant="body1"
                                >
                                    Don&apos;t have an account?
                                    {' '}
                                    <Link
                                        component={RouterLink}
                                        to="/register"
                                        variant="h6"
                                    >
                                        Sign up
                                    </Link>
                                </Typography>
                            </form>
                        )}
                    </Formik>
                </Container>
            </Box>
        </React.Fragment>
    )
};

const mapStateToProps = (state: RootState) => {
    return {
        admin: state.admin
    }
}
const mapDispatchToProps = { login }

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Login));
