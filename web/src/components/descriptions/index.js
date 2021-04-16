import React from "react";
import { Descriptions } from "antd";
import PropTypes from "prop-types";

const SimpleDescription = (props) => (
	<Descriptions
		size="small"
		bordered
		column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
		layout="vertical">
		{props.children}
	</Descriptions>
);

const SimpleDescriptionItem = (props) => (
	<Descriptions.Item label={props.label}>{props.children}</Descriptions.Item>
);

SimpleDescription.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
		.isRequired
};
SimpleDescriptionItem.propTypes = {
	label: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
		.isRequired
};

export { SimpleDescription, SimpleDescriptionItem };
