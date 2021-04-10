import React from "react";
import { primaryColor } from "@utils";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const { Text } = Typography;

const SimpleHeadingText = ({ children }) => (
	<h1 style={{ textAlign: "center" }}>
		<b>{children}</b>
	</h1>
);

const StrongText = ({ children }) => (
	<Text strong style={{ textAlign: "center" }}>
		{children}
	</Text>
);

const BoldText = ({ children }) => (
	<p style={{ textAlign: "center" }}>
		<b>{children}</b>
	</p>
);

const SimpleText = ({ children }) => <p style={{ textAlign: "center" }}>{children}</p>;

const LinkText = (props) => (
	<Link
		style={
			props.style
				? props.style
				: {
						color: primaryColor
				  }
		}
		to={props.linkTo}
		variant="body2">
		<b> {props.linkText}</b>
	</Link>
);

SimpleHeadingText.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(PropTypes.element),
		PropTypes.element
	]).isRequired
};

StrongText.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(PropTypes.element),
		PropTypes.element
	]).isRequired
};

BoldText.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(PropTypes.element),
		PropTypes.element
	]).isRequired
};

SimpleText.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(PropTypes.element),
		PropTypes.element
	]).isRequired
};

LinkText.propTypes = {
	style: PropTypes.object,
	linkTo: PropTypes.string.isRequired,
	linkText: PropTypes.string.isRequired
};

export { SimpleHeadingText, StrongText, BoldText, LinkText, SimpleText };