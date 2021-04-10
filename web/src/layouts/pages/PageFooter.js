import React from "react";
import { Layout, Typography } from "antd";
import PropTypes from "prop-types";

const { Footer } = Layout;

const { Link } = Typography;

const PageFooter = (props) => {
	return (
		<Footer
			style={{
				background: props.background
			}}>
			<p
				style={{
					color: props.color,
					fontSize: "0.65rem",
					textAlign: "center"
				}}>
				<span
					style={{
						color: "#202020"
					}}>
					Made by &nbsp;
				</span>
				<Link strong href="https://github.com/ingeniousambivert">
					ingeniousambivert
				</Link>
			</p>
		</Footer>
	);
};

PageFooter.propTypes = {
	background: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired
};

export { PageFooter };
