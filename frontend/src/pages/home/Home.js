import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import dashboard_routes from "../../routes/dashboard_routes";

const Home = () => {
  return (
    <Switch>
      {dashboard_routes.map(({ exact, path, component: Component }, index) => (
        <Route
          key={index}
          exact={exact}
          path={path}
          render={(props) => <Component {...props} />}
        />
      ))}
      <Redirect from="/" to="/interview" />
    </Switch>
  );
};

export default Home;
