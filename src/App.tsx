import React from "react";

import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard/index";

export default () => (
  <Router>
    <Switch>
      <Route
        exact
        path="/"
        render={() => <Redirect to="/app/dashboard/index" push />}
      />
      <Route path="/app/dashboard/index" component={Dashboard} />
    </Switch>
  </Router>
);
