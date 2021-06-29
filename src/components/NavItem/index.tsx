import { Icon as ReactFeatherIcon } from "react-feather";
import { useLocation, matchPath, NavLink as RouterLink } from "react-router-dom";
import { Button, ListItem } from '@material-ui/core';
import useStyles from './styles';

type NavItemProps = {
    href: string;
    icon: ReactFeatherIcon;
    title: string;
}

const NavItem = ({ href, icon: Icon, title }: NavItemProps) => {

    const location = useLocation();
    const classes = useStyles();

    const active = href ? !!matchPath(href, {
        path: href,
        exact: true,
        strict: false
    }) : false;
    console.log(active)
    return (
        <ListItem
            disableGutters={true}
            className={classes.root}
        >
            <Button
                className={classes.button}
            >
                {Icon && (
                    <Icon size="20"/>
                )}
                <span>
                    {title}
                </span>
            </Button>
        </ListItem>
    )

};

export default NavItem;
