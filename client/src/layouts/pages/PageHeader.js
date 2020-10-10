/* eslint-disable react/prop-types */
import React from "react";
import { Layout, Row, Col, Typography } from "antd";
import { Logo } from "../partials/Logo";
import PropTypes from "prop-types";

const { Text } = Typography;
const { Header } = Layout;

const PageHeader = (props) => {
	const headerStyle = {
		height: props.height,
		background: props.background ? props.background : "#fff",
		color: props.iconcolor ? props.iconcolor : "#202020",
		padding: "0",
		boxShadow: props.elevate ? "0px 1px 10px rgba(153, 153, 153, 1)" : null
	};

	const textStyle = {
		color: props.iconcolor ? props.iconcolor : "#202020",
		fontSize: "2.25em",
		paddingLeft: "30px"
	};

	return (
		<div>
			<Header style={headerStyle} className="header">
				<Row gutter={16} justify="start" align="middle">
					{props.showlogo === false ? null : (
						<Col style={{ padding: "0.75% 2%" }} span={2}>
							<Logo iconcolor={props.iconcolor} />
						</Col>
					)}
					<Col span={6}>
						<Text style={textStyle} strong>
							{props.heading}
						</Text>
					</Col>
				</Row>
				{props.children}
			</Header>
		</div>
	);
};

PageHeader.propTypes = {
	background: PropTypes.string,
	color: PropTypes.string,
	height: PropTypes.number,
	elevate: PropTypes.bool
};

export { PageHeader };
