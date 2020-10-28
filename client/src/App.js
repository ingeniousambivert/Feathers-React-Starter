import React from "react";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import "./assets/less/App.less";
import "./assets/scss/style.scss";

import LandingRoute from "@components/landing/utils/landingRoute";
import Landing from "@pages/landing";

import AppRoutes from "./routes";

const App = () => {
	return (
		<Router>
			<Switch>
				<LandingRoute exact path="/" component={Landing} />
				<Route component={AppRoutes} />
			</Switch>
		</Router>
	);
};

export default App;
