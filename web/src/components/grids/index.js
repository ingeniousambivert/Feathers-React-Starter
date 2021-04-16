import React from "react";
import { Row, Col } from "antd";

import PropTypes from "prop-types";

const ResponsiveGrid = (props) => (
	<Row
		gutter={props.gutter ? props.gutter : [16, 24]}
		justify={props.justify ? props.justify : "space-around"}
		align={props.align ? props.align : "middle"}>
		<Col
			span={props.span && props.span}
			xs={!props.span && (props.xs ? props.xs : 20)}
			sm={!props.span && (props.sm ? props.sm : 18)}
			md={!props.span && (props.md ? props.md : 16)}
			lg={!props.span && (props.lg ? props.lg : 14)}
			xl={!props.span && (props.xl ? props.xl : 12)}>
			{props.children}
		</Col>
	</Row>
);

const FixedGrid = (props) => (
	<Row
		gutter={[16, 24]}
		justify={props.justify ? props.justify : "space-around"}
		align={props.align ? props.align : "middle"}>
		<Col xs={24} sm={24} md={24} lg={24} xl={24}>
			{props.children}
		</Col>
	</Row>
);

const SemiColumn = ({ children }) => (
	<Col style={{ textAlign: "center" }} xs={24} sm={24} md={12} lg={12} xl={12}>
		{children}
	</Col>
);

ResponsiveGrid.propTypes = {
	justify: PropTypes.string,
	gutter: PropTypes.arrayOf(PropTypes.number),
	span: PropTypes.number,
	xs: PropTypes.number,
	sm: PropTypes.number,
	md: PropTypes.number,
	lg: PropTypes.number,
	xl: PropTypes.number,
	align: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
		.isRequired
};

FixedGrid.propTypes = {
	justify: PropTypes.string,
	align: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
		.isRequired
};

SemiColumn.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
		.isRequired
};

export { ResponsiveGrid, FixedGrid, SemiColumn };
