import React from "react";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import AppRoutes from "./routes";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={AppRoutes} />
      </Switch>
    </Router>
  );
};

export default App;
