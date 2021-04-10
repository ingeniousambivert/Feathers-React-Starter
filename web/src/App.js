import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import "./assets/less/App.less";
import "./assets/scss/style.scss";

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
