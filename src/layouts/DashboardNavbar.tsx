import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Box, IconButton, Badge, Button, Tooltip } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from "../components/Logo";
import { logout } from "../redux/slices/adminSlice";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import React from "react";
import GoBackIcon from "@material-ui/icons/ArrowLeftTwoTone"

type DashboardNavbarProps = {
    onMobileClose: () => void;
    logout?: ActionCreatorWithPayload<any, string>;
}

const DashboardNavbar = (props: DashboardNavbarProps) => {
    const history = useHistory();
    const location = useLocation();

    const goBackFunc = () => {
        history.goBack();
    }
    return (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    <RouterLink to="/app/dashboard">
                        <Logo />
                    </RouterLink>
                    <Box css={{ flexGrow: 1 }} />
                    <RouterLink to="/app/notifications" style={{ color: "white" }}>
                        <IconButton color="inherit">
                            <Badge
                                badgeContent={5}
                                color="error"
                                variant="dot"
                            >
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </RouterLink>
                    <IconButton color="inherit" onClick={() => {
                        if (props?.logout) {
                            props.logout(null)
                        }
                    }}>
                        <InputIcon />
                    </IconButton>
                    <IconButton color="inherit" onClick={() => props.onMobileClose()}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Toolbar>
                <Button
                    variant="contained"
                    onClick={goBackFunc}
                    disabled={location.pathname === '/app/dashboard'}
                >   <Tooltip title="Quay lại">
                        <GoBackIcon />
                    </Tooltip>
                </Button>
            </Toolbar>
        </React.Fragment>
    )
}

const mapDispatchToProps = { logout };

export default connect(null, mapDispatchToProps)(DashboardNavbar);
