import { Helmet } from "react-helmet-async";
import { Box, Container, Typography } from "@material-ui/core";
import useStyles from "./styles";
import MainNavbar from "../../layouts/MainNavbar";

const NotFound = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Helmet>
                <title>404 | Not Found Page</title>
            </Helmet>
            <MainNavbar />
            <Box
                css={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'center'
                }}
            >
                <Container maxWidth="md">
                    <Box css={{ textAlign: 'center' }}>
                        <img
                            alt="Under development"
                            src="/static/images/undraw_page_not_found_su7k.svg"
                            style={{
                                marginTop: 50,
                                display: 'inline-block',
                                maxWidth: '100%',
                                width: 560
                            }}
                        />
                    </Box>
                    <Typography
                        align="center"
                        color="textPrimary"
                        variant="h4"
                    >
                        404: The page you are looking for isn’t here
                    </Typography>
                    <Typography
                        align="center"
                        color="textPrimary"
                        variant="subtitle2"
                    >
                        You either tried some shady route or you came here by mistake.
                        Whichever it is, try using the navigation
                    </Typography>
                </Container>
            </Box>
        </div>
    )
}
export default NotFound;
