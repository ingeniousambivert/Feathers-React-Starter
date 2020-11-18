import React from "react";
import { Route, Switch } from "react-router-dom";

import Signin from "@pages/signin";
import Signup from "@pages/signup";
import Home from "@pages/home";
import Verify from "@pages/verify";
import ForgotPassword from "@pages/forgotPassword";
import ResetPassword from "@pages/resetPassword";

import ProtectedRoute from "./protectedRoute";
import PublicRoute from "./publicRoute";

import { NotFound } from "@layouts";

const Routes = () => {
	return (
		<section className="routeContainer">
			<Switch>
				<PublicRoute exact path="/signup" component={(props) => <Signup {...props} />} />
				<PublicRoute exact path="/signin" component={(props) => <Signin {...props} />} />

				<ProtectedRoute exact path="/home" component={(props) => <Home {...props} />} />

				<Route exact path="/verify" component={(props) => <Verify {...props} />} />
				<Route
					exact
					path="/forgot-password"
					component={(props) => <ForgotPassword {...props} />}
				/>
				<Route
					exact
					path="/reset-password"
					component={(props) => <ResetPassword {...props} />}
				/>

				<Route component={NotFound} />
			</Switch>
		</section>
	);
};

export default Routes;
