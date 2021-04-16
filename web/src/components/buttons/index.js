import React from "react";
import { Button, Typography } from "antd";
import { white } from "@utils";
import PropTypes from "prop-types";

const { Text } = Typography;

const SubmitButton = (props) => (
	<Button type="primary" {...props} htmlType="submit" style={props.style && props.style}>
		<Text style={{ color: white }} strong>
			{props.buttontext}
		</Text>
	</Button>
);

const PrimaryButton = (props) => (
	<Button type="primary" onClick={props.onClick} style={props.style && props.style}>
		{props.children ? (
			props.children
		) : (
			<Text style={props.textStyle ? props.textStyle : { color: white }} strong>
				{props.buttontext}
			</Text>
		)}
	</Button>
);

const SecondaryButton = (props) => (
	<Button {...props} onClick={props.onClick} style={props.style && props.style}>
		{props.children ? (
			props.children
		) : props.strongText ? (
			<Text strong style={props.textStyle && props.textStyle}>
				{props.buttontext}
			</Text>
		) : (
			<Text style={props.textStyle && props.textStyle}>{props.buttontext}</Text>
		)}
	</Button>
);

const LinkButton = (props) => (
	<Button onClick={props.onClick} type="link" style={props.style && props.style}>
		<Text style={props.textStyle && props.textStyle} strong>
			{props.buttontext}
		</Text>
	</Button>
);

SubmitButton.propTypes = {
	buttontext: PropTypes.string.isRequired,
	style: PropTypes.object
};

PrimaryButton.propTypes = {
	buttontext: PropTypes.string.isRequired,
	style: PropTypes.object,
	textStyle: PropTypes.object,
	onClick: PropTypes.func,
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
};

SecondaryButton.propTypes = {
	buttontext: PropTypes.string,
	style: PropTypes.object,
	textStyle: PropTypes.object,
	strongText: PropTypes.bool,
	onClick: PropTypes.func,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.element),
		PropTypes.element,
		PropTypes.string
	])
};

LinkButton.propTypes = {
	buttontext: PropTypes.string.isRequired,
	style: PropTypes.object,
	textStyle: PropTypes.object,
	onClick: PropTypes.func
};

export { SubmitButton, PrimaryButton, SecondaryButton, LinkButton };
