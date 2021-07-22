import { Avatar, Box, Divider, Drawer, List, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import {
    AlertCircle as AlertCircleIcon,
    BarChart as BarChartIcon,
    Lock as LockIcon,
    Settings as SettingsIcon,
    ShoppingBag as ShoppingBagIcon,
    User as UserIcon,
    UserPlus as UserPlusIcon,
    Users as UsersIcon
} from 'react-feather';
import NavItem from "../components/NavItem";

const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    jobTitle: 'Developer',
    name: 'Lingo Admin'
};

const items = [
    {
        href: '/app/dashboard',
        icon: BarChartIcon,
        title: 'Dashboard'
    },
    {
        href: '/app/customers',
        icon: UsersIcon,
        title: 'Customers'
    },
    {
        href: '/app/products',
        icon: ShoppingBagIcon,
        title: 'Products'
    },
    {
        href: '/app/account',
        icon: UserIcon,
        title: 'Account'
    },
    {
        href: '/app/version',
        icon: SettingsIcon,
        title: 'Version'
    },
    {
        href: '/login',
        icon: LockIcon,
        title: 'Login'
    },
    {
        href: '/register',
        icon: UserPlusIcon,
        title: 'Register'
    },
    {
        href: '/404',
        icon: AlertCircleIcon,
        title: 'Error'
    }
];

type DashboardSidebarProps = {
    onMobileClose: () => void;
    openMobile: boolean;
}

const DashboardSidebar = ({ onMobileClose, openMobile }: DashboardSidebarProps) => {

    const sidebarContent = (
        <Box
            css={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
        >
            <Box
                css={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 2
                }}
            >
                <Avatar
                    component={RouterLink}
                    src={user.avatar}
                    style={{
                        cursor: 'pointer',
                        width: 64,
                        height: 64
                    }}
                    to='app/account'
                />
                <Typography
                    color="textPrimary"
                    variant="h5"
                >
                    {user.name}
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="body2"
                >
                    {user.jobTitle}
                </Typography>
            </Box>
            <Divider />
            <Box
                css={{
                    padding: 2
                }}
            >
                <List>
                    {items.map((item) => (
                        <NavItem
                            href={item.href}
                            key={item.title}
                            title={item.title}
                            icon={item.icon}
                        />
                    ))}
                </List>
            </Box>
        </Box>
    )

    return (
        <Drawer
            anchor="left"
            onClose={onMobileClose}
            variant="temporary"
            PaperProps={{
                style: {
                    width: 256
                }
            }}
            open={openMobile}
        >
            {sidebarContent}
        </Drawer>
    )
}

export default DashboardSidebar;
