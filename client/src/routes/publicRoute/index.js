import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@slices/auth";
import PropTypes from "prop-types";

const PublicRoute = (props) => {
	const { component: Component, ...rest } = props;
	let isUserAuthenticated = useSelector(selectIsAuthenticated);
	const location = {
		pathname: "/home"
	};
	return (
		<Route
			{...rest}
			render={(props) => {
				if (isUserAuthenticated) {
					return <Redirect to={location} />;
				} else {
					return <Component {...props} />;
				}
			}}
		/>
	);
};

PublicRoute.propTypes = {
	component: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node), //as you can render an array of elements
		PropTypes.element,
		PropTypes.string,
		PropTypes.func
	]).isRequired
};
export default PublicRoute;
