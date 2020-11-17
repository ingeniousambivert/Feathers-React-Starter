import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

const LandingRoute = ({ component: Component, ...rest }) => {
	return <Route {...rest} render={(props) => <Component {...props} />} />;
};

LandingRoute.propTypes = {
	component: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node), //as you can render an array of elements
		PropTypes.element,
		PropTypes.string,
		PropTypes.func
	]).isRequired
};

export default LandingRoute;
