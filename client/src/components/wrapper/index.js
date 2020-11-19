import React from "react";
import { Row, Col } from "antd";
import PropTypes from "prop-types";

function Wrapper(props) {
	const style = {
		padding: props.padding ? props.padding : "2%",
		margin: props.margin ? props.margin : "2%",
		alignContent: props.aligncontent ? props.aligncontent : "center"
	};

	return (
		<div style={style}>
			<Row align="midddle" justify={props.justify ? props.justify : "center"}>
				<Col flex="auto">{props.children}</Col>
			</Row>
		</div>
	);
}

Wrapper.propTypes = {
	padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	margin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	aligncontent: PropTypes.string,
	justify: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node), //as you can render an array of elements
		PropTypes.element //for a single component/element
	]).isRequired
};

export default Wrapper;
