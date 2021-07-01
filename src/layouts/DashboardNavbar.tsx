import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Box, IconButton, Badge } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from "../components/Logo";
import { logout } from "../redux/slices/adminSlice";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { connect } from "react-redux";

type DashboardNavbarProps = {
    onMobileClose: () => void;
    logout?: ActionCreatorWithPayload<any, string>;
}

const DashboardNavbar = (props: DashboardNavbarProps) => {
    
    return (
        <AppBar position="static">
            <Toolbar>
                <RouterLink to="/app/dashboard">
                    <Logo/>
                </RouterLink>
                <Box css={{ flexGrow: 1 }}/>
                <IconButton color="inherit">
                    <Badge
                        badgeContent={5}
                        color="error"
                        variant="dot"
                    >
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
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
    )
}

const mapDispatchToProps = { logout };

export default connect(null, mapDispatchToProps)(DashboardNavbar);
