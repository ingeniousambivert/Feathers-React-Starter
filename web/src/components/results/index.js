import React from "react";
import { Result } from "antd";
import PropTypes from "prop-types";

const SuccessResult = (props) => (
	<Result status="success" title={props.title} subTitle={props.subTitle} extra={props.extra} />
);

const ErrorResult = (props) => (
	<Result status="error" title={props.title} subTitle={props.subTitle} extra={props.extra} />
);

SuccessResult.propTypes = {
	title: PropTypes.string.isRequired,
	subTitle: PropTypes.string.isRequired,
	extra: PropTypes.arrayOf(PropTypes.element).isRequired
};

ErrorResult.propTypes = {
	title: PropTypes.string.isRequired,
	subTitle: PropTypes.string.isRequired,
	extra: PropTypes.arrayOf(PropTypes.element).isRequired
};

export { SuccessResult, ErrorResult };
