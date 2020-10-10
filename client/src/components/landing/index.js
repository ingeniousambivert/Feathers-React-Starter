import React from "react";
import { Row, Col, Typography, Space, Button } from "antd";
import { Link } from "react-router-dom";
import Wrapper from "@components/wrapper";

const { Text } = Typography;

function Landing() {
	return (
		<Wrapper>
			<Row gutter={16} align="middle">
				<Col span={24}>
					<Text strong>
						<h1>MERN Starter</h1>
					</Text>
				</Col>
			</Row>
			<Space direction="vertical" size="large">
				<Row gutter={16} align="middle">
					<Col span={24}>
						<Text strong>
							MERN Stack Application Starter Kit w/&nbsp;
							<a
								href="https://docs.feathersjs.com"
								rel="noopener noreferrer"
								target="_blank">
								Feathers
							</a>
						</Text>
					</Col>
				</Row>
				<Row gutter={16} align="middle">
					<Col span={24}>
						<Text strong>
							<h3>About</h3>
						</Text>
					</Col>
				</Row>
			</Space>
			<Space direction="vertical" size="large">
				<Row gutter={16} align="middle">
					<Col span={24}>
						<Text strong>
							This project was bootstapped with&nbsp;
							<a
								href="https://facebook.github.io/create-react-app/"
								rel="noopener noreferrer"
								target="_blank">
								Create React App
							</a>
							&nbsp;and&nbsp;
							<a
								href="https://docs.feathersjs.com/guides/basics/generator.html"
								rel="noopener noreferrer"
								target="_blank">
								Feathers Generator
							</a>
							. The purpose of this project is to provide a starter template for MERN
							Stack Applications (w/ Feathers). <br />
							The client comes customized with&nbsp;
							<a href="https://ant.design" rel="noopener noreferrer" target="_blank">
								Ant Design
							</a>
							&nbsp;UI Library and configured with&nbsp;
							<a
								href="https://redux-toolkit.js.org/"
								rel="noopener noreferrer"
								target="_blank">
								Redux Toolkit
							</a>
							&nbsp;for State Management.
						</Text>
					</Col>
				</Row>
				<Row gutter={16} align="middle">
					<Col>
						<Text strong>
							Read more about this project&nbsp;
							<a
								href="https://github.com/ingeniousambivert/MERN-Starter"
								rel="noopener noreferrer"
								target="_blank">
								here.
							</a>
						</Text>
					</Col>
				</Row>
				<Row gutter={16} align="middle">
					<Col>
						<Button type="primary">
							<Link to="/signup">
								<b> Sign Up</b>
							</Link>
						</Button>
					</Col>
					<Col>
						<Button>
							<Link to="/signin">
								<b> Sign In</b>
							</Link>
						</Button>
					</Col>
				</Row>
				<Row gutter={16} align="middle">
					<Col span={24}>
						<Text strong>
							Released under the&nbsp;
							<a
								href="https://choosealicense.com/licenses/mit/"
								rel="noopener noreferrer"
								target="_blank">
								MIT
							</a>
						</Text>
					</Col>
				</Row>
			</Space>
		</Wrapper>
	);
}

export default Landing;
