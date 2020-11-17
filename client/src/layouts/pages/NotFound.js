import React from "react";
import { Layout, Typography, Row, Col, Button } from "antd";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { selectIsAuthenticated } from "@slices/auth";
import { black, white } from "@utils";

import { PageHeader, PageFooter } from "../index";
import NotfoundImage from "../partials/NotfoundImage";

const { Content } = Layout;
const { Text } = Typography;

const NotFound = () => {
	let history = useHistory();
	let isUserAuthenticated = useSelector(selectIsAuthenticated);

	const gotoPage = () => {
		if (isUserAuthenticated) history.push("/home");
		else history.push("/");
	};

	return (
		<React.Fragment>
			<Layout>
				<PageHeader iconcolor={black} background={white} />
				<Content style={{ marginTop: "2%" }}>
					<Row justify="center" align="middle">
						<Col>
							<NotfoundImage />
							<Row justify="center" align="middle">
								<Col>
									<Text style={{ textAlign: "center" }} strong>
										Sorry, the page you visited does not exist.
									</Text>
								</Col>
							</Row>
							<Row justify="center" align="middle">
								<Col style={{ marginTop: "2%" }}>
									<Button
										style={{ color: { white } }}
										onClick={gotoPage}
										type="primary">
										Go to Home
									</Button>
								</Col>
							</Row>
						</Col>
					</Row>
				</Content>
				<PageFooter color={black} background={white} />
			</Layout>
		</React.Fragment>
	);
};

export { NotFound };
