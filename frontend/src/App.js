import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

import routes from "./routes/routes";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map(
          ({ exact, path, component: Component, layout: Layout }, index) => (
            <Route
              key={index}
              exact={exact}
              path={path}
              render={(props) => (
                <Layout history={props.history}>
                  <Component {...props} />
                </Layout>
              )}
            />
          )
        )}
        {/* <Route component={NotFoundPage} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
