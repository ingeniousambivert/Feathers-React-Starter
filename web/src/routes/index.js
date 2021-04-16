import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import Landing from "@pages/landing";
import Signin from "@pages/signin";
import Signup from "@pages/signup";
import Home from "@pages/home";
import Admin from "@pages/admin";
import Verify from "@pages/verify";
import ForgotPassword from "@pages/password/forgot";
import ResetPassword from "@pages/password/reset";

import AdminRoute from "./adminRoute";
import ProtectedRoute from "./protectedRoute";
import PublicRoute from "./publicRoute";

import { NotFound } from "@layouts";

const Routes = () => {
	return (
		<Fragment>
			<Switch>
				<PublicRoute exact path="/" component={(props) => <Landing {...props} />} />
				<PublicRoute exact path="/signup" component={(props) => <Signup {...props} />} />
				<PublicRoute exact path="/signin" component={(props) => <Signin {...props} />} />

				<ProtectedRoute exact path="/home" component={(props) => <Home {...props} />} />
				<AdminRoute exact path="/admin" component={(props) => <Admin {...props} />} />

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
		</Fragment>
	);
};

export default Routes;
