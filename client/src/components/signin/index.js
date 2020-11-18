import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Button, Typography, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInUserThunk, selectError } from "@slices/auth";

const { Text } = Typography;
function SignInComponent() {
	const dispatch = useDispatch();
	const error = useSelector(selectError);

	let location = useLocation();
	const url = location.pathname;
	const [title, setTitle] = useState(" ");

	const renderTitle = (url) => {
		if (url.includes("signin")) {
			setTitle("Welcome Back");
		} else {
			setTitle("Sign In To Continue");
		}
	};

	const onFinish = async (credentials) => {
		await dispatch(signInUserThunk(credentials)).then(() => {
			if (error) {
				if (error.includes("invalid login")) {
					message.error("Failed to sign in. Invalid credentials", 10);
				} else {
					message.error(`${error}. Please try again later.`, 10);
				}
			}
		});
	};

	const onFinishFailed = (error) => {
		console.error("Failed : ", error);
	};

	useEffect(() => {
		renderTitle(url);
	}, [url]);

	return (
		<React.Fragment>
			<div>
				<Row gutter={[16, 24]} justify="space-around" align="middle">
					<Col xs={20} sm={16} md={14} lg={10} xl={8}>
						<Row gutter={[16, 24]} justify="center" align="middle">
							<Col xs={24} sm={24} md={24} lg={24} xl={24}>
								<h1 style={{ textAlign: "center" }}>
									<b>{title}</b>
								</h1>
							</Col>
						</Row>
						<Form
							hideRequiredMark
							name="signin_form"
							initialValues={{
								remember: true
							}}
							size="large"
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}>
							<Form.Item
								name="email"
								rules={[
									{
										required: true,
										message: "Please input your E-mail"
									},
									{
										type: "email",
										message: "Please input a valid E-mail"
									}
								]}>
								<Input prefix={<MailOutlined />} placeholder="E-mail" />
							</Form.Item>

							<Form.Item
								name="password"
								rules={[
									{
										required: true,
										message: "Please input your Password"
									}
								]}>
								<Input.Password prefix={<LockOutlined />} placeholder="Password" />
							</Form.Item>

							<Form.Item>
								<Row gutter={[16, 24]} justify="space-around" align="middle">
									<Col
										style={{ textAlign: "center" }}
										xs={24}
										sm={24}
										md={8}
										lg={8}
										xl={8}>
										<Button type="primary" block htmlType="submit">
											<Text style={{ color: "#fff" }} strong>
												Sign In
											</Text>
										</Button>
									</Col>
									<Col
										style={{ textAlign: "center" }}
										xs={24}
										sm={24}
										md={16}
										lg={16}
										xl={16}>
										<Text strong> Don&apos;t have an account? </Text>
										<Link
											style={{
												color: "#6E70E5"
											}}
											to="/signup"
											variant="body2">
											<b> Sign Up</b>
										</Link>
									</Col>
								</Row>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</div>
		</React.Fragment>
	);
}

export default SignInComponent;
