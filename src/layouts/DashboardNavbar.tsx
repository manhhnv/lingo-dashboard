import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Box, IconButton, Badge } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from "../components/Logo";

type DashboardNavbarProps = {
    onMobileClose: () => void;
}

const DashboardNavbar = (props: DashboardNavbarProps) => {
    
    return (
        <AppBar position="static">
            <Toolbar>
                <RouterLink to="/">
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
                <IconButton color="inherit">
                    <InputIcon />
                </IconButton>
                <IconButton color="inherit" onClick={() => props.onMobileClose()}>
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default DashboardNavbar;
