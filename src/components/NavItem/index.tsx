import { Icon as ReactFeatherIcon } from "react-feather";
import { Button, ListItem } from '@material-ui/core';
import useStyles from './styles';
import { useHistory } from "react-router-dom";

type NavItemProps = {
    href: string;
    icon: ReactFeatherIcon;
    title: string;
}

const NavItem = ({ href, icon: Icon, title }: NavItemProps) => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <ListItem
            disableGutters={true}
            className={classes.root}
        >
            <Button
                className={classes.button}
                onClick={() => history.push(href)}
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
