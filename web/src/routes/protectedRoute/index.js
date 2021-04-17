import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@slices/auth";

const ProtectedRoute = (props) => {
	const { component: Component, ...rest } = props;
	const isUserAuthenticated = useSelector(selectIsAuthenticated);

	return (
		<Route
			{...rest}
			render={(props) => {
				if (isUserAuthenticated) {
					return <Component {...props} />;
				} else {
					return <Redirect to="/signin" />;
				}
			}}
		/>
	);
};

ProtectedRoute.propTypes = {
	component: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node), //as you can render an array of elements
		PropTypes.element,
		PropTypes.string,
		PropTypes.func
	]).isRequired
};

export default ProtectedRoute;
