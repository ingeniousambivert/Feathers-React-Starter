import React from "react";
import { Route, Switch } from "react-router-dom";

import Signin from "@pages/signin";
import Signup from "@pages/signup";
import Home from "@pages/home";
import Dashboard from "@pages/dashboard";

import ProtectedRoute from "./protectedRoute";
import PublicRoute from "./publicRoute";

import { NotFound } from "@layouts";

const Routes = () => {
	return (
		<section className="routeContainer">
			<Switch>
				<PublicRoute exact path="/signup" component={Signup} />
				<PublicRoute exact path="/signin" component={Signin} />

				<ProtectedRoute exact path="/home" component={Home} />
				<ProtectedRoute exact path="/project/dashboard" component={Dashboard} />

				<Route component={NotFound} />
			</Switch>
		</section>
	);
};

export default Routes;
