import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthOnChange";
import { Layout } from '../';

const PrivateRoute = ({
    component: RouteComponent,
    path,
    title
}) => {
    const context = useContext(AuthContext);


    const routeComponent = (props) => {
        return context ? (
            <Layout key="isAuthenticated" title={title}>
                {React.createElement(RouteComponent, props)}
            </Layout>
        ) : (
            <Redirect to="/" />
        );
    };

    return <Route {...path} render={routeComponent} />;
};

export default PrivateRoute;