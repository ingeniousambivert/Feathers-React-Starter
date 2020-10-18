import React from "react";
import { Layout } from "antd";
import { PageHeader, PageFooter } from "@layouts";
import PropTypes from "prop-types";

const { Content } = Layout;

function Container(props) {
	const layoutStyle = {
		background: props.background === "dark" ? "#EFEFEF" : "#FFF"
	};

	return (
		<React.Fragment>
			<Layout style={layoutStyle}>
				{props.header ? (
					<PageHeader
						iconcolor={props.iconcolor}
						background={props.background}
						elevate={props.elevate}
					/>
				) : null}
				<Content style={props.contentstyle}>{props.children}</Content>
				{props.footer ? (
					<PageFooter color={props.footercolor} background={props.footerbackground} />
				) : null}
			</Layout>
		</React.Fragment>
	);
}

Container.propTypes = {
	header: PropTypes.bool,
	background: PropTypes.string,
	iconcolor: PropTypes.string,
	height: PropTypes.number,
	elevate: PropTypes.bool,
	footer: PropTypes.bool,
	footercolor: PropTypes.string,
	footerbackground: PropTypes.string,
	contentstyle: PropTypes.object,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node), //as you can render an array of elements
		PropTypes.element //for a single component/element
	]).isRequired
};

export default Container;
