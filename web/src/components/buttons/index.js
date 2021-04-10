import React from "react";
import { Button, Typography } from "antd";
import { white } from "@utils";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const { Text } = Typography;

const SubmitButton = (props) => (
	<Button type="primary" block htmlType="submit">
		<Text style={{ color: white }} strong>
			{props.buttonText}
		</Text>
	</Button>
);

const PrimaryButton = (props) => (
	<Button type="primary" onClick={props.onClick}>
		<Text style={props.style ? props.style : { color: white }} strong>
			{props.buttonText}
		</Text>
	</Button>
);

const SecondaryButton = (props) => (
	<Button onClick={props.onClick}>
		<Text style={props.style ? props.style : { color: white }} strong>
			{props.buttonText}
		</Text>
	</Button>
);

const LinkButton = (props) => (
	<Button type="primary">
		<Link to={props.linkTo}>
			<b> {props.buttonText}</b>
		</Link>
	</Button>
);

SubmitButton.propTypes = {
	buttonText: PropTypes.string.isRequired
};

PrimaryButton.propTypes = {
	buttonText: PropTypes.string.isRequired,
	style: PropTypes.object,
	onClick: PropTypes.func
};

SecondaryButton.propTypes = {
	buttonText: PropTypes.string.isRequired,
	style: PropTypes.object,
	onClick: PropTypes.func
};

LinkButton.propTypes = {
	buttonText: PropTypes.string.isRequired,
	linkTo: PropTypes.string.isRequired
};

export { SubmitButton, PrimaryButton, SecondaryButton, LinkButton };
