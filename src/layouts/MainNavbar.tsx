import { Link as RouterLink, useHistory } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Badge, Box, Tooltip } from '@material-ui/core';
import Logo from '../components/Logo';
import InputIcon from "@material-ui/icons/InputTwoTone";

const MainNavbar = () => {

  const history = useHistory();

  return (
    <AppBar
      position="static"
    >
      <Toolbar
      >
        <RouterLink to="/app/dashboard">
          <Logo />
        </RouterLink>
        <Box css={{ flexGrow: 1 }} />
        <Tooltip title="Đăng nhập">
          <IconButton color="inherit" onClick={() => history.push('/login')}>
            <Badge
              badgeContent={5}
              color="error"
              variant="dot"
            >
              <InputIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
};

export default MainNavbar;
