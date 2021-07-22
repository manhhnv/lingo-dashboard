import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../pages/app/Login";
import NotFound from "../pages/error";
import Dashboard from "../pages/app/dashboard";
import ListBook from "../pages/app/ListBook";
import ListUnit from "../pages/app/ListUnit";
import PageListLevel from "../pages/app/ListLevel";
import PageListQuestion from "../pages/app/ListQuestion";
import VersionPage from "../pages/app/version";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route
                    exact={true}
                    path="/app/dashboard/books/:grade"
                    component={ListBook}
                />
                <Route
                    exact={true}
                    path="/app/dashboard/units/:bookId"
                    component={ListUnit}
                />
                <Route
                    exact={true}
                    path="/app/dashboard/levels/:bookId/:unitId"
                    component={PageListLevel}
                />
                <Route
                    exact={true}
                    path="/app/dashboard/questions/:bookId/:unitId/:levelIndex"
                    component={PageListQuestion}
                />
                <Route
                    exact={true}
                    path="/app/dashboard"
                    component={Dashboard}
                />
                <Route
                    exact={true}
                    path="/login"
                    component={Login}
                />
                <Route
                    exact={true}
                    path='/app/version'
                    component={VersionPage}
                />
                <Route exact={true} path="/*">
                    <NotFound />
                </Route>
            </Switch>
        </BrowserRouter>
    )
};

export default AppRouter;
