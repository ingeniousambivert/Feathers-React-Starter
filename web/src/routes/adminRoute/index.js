import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectIsAdmin } from "@slices/user";

import Home from "@pages/home";

const AdminRoute = (props) => {
	const { component: Component, ...rest } = props;
	const isAdmin = useSelector(selectIsAdmin);

	return (
		<Route
			{...rest}
			render={(props) => {
				if (isAdmin) {
					return <Component {...props} />;
				} else {
					return <Home />;
				}
			}}
		/>
	);
};

AdminRoute.propTypes = {
	component: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.element,
		PropTypes.string,
		PropTypes.func
	]).isRequired
};

export default AdminRoute;
