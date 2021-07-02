import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../pages/app/Login";
import NotFound from "../pages/error";
import Dashboard from "../pages/app/dashboard";
import ListBook from "../pages/app/ListBook";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact={true} path="/app/dashboard/books/:grade" component={ListBook}>
                </Route>
                <Route exact={true} path="/app/dashboard">
                    <Dashboard />
                </Route>
                <Route exact={true} path="/login">
                    <Login />
                </Route>
                <Route exact={true} path="/*">
                    <NotFound />
                </Route>
            </Switch>
        </BrowserRouter>
    )
};

export default AppRouter;
