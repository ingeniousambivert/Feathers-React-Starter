import React from "react";
import { Row, Col, Form, Input, Button, Typography, message } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpUserThunk, signInUserThunk, selectAuthError } from "@slices/auth";

const { Text } = Typography;

function SignUpComponent() {
	const dispatch = useDispatch();
	const error = useSelector(selectAuthError);

	const onFinish = async (credentials) => {
		const { email, password } = credentials;
		await dispatch(signUpUserThunk(credentials));
		if (error) {
			if (
				error.includes("value already exists") ||
				error.includes("conflict") ||
				error.includes(409)
			) {
				message.error("Failed to create an account. Email is already in use", 10);
			} else {
				message.error(`${error}. Failed to create an account. Please try again`, 10);
			}
		} else {
			dispatch(signInUserThunk({ email, password })).then(
				message.success("Successfully created a new account.", 5)
			);
		}
	};

	const onFinishFailed = (error) => {
		console.error("Failed : ", error);
	};

	return (
		<React.Fragment>
			<div>
				<Row gutter={[16, 24]} justify="space-around" align="middle">
					<Col xs={20} sm={16} md={14} lg={12} xl={12}>
						<Row gutter={[16, 24]} justify="center" align="middle">
							<Col xs={24} sm={24} md={24} lg={24} xl={24}>
								<h1 style={{ textAlign: "center" }}>
									<b>Welcome Onboard</b>
								</h1>
							</Col>
						</Row>
						<Form
							hideRequiredMark
							name="signup_form"
							initialValues={{
								remember: true
							}}
							size="large"
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}>
							<Row gutter={8} justify="space-around" align="middle">
								<Col xs={24} sm={24} md={12} lg={12} xl={12}>
									<Form.Item
										name="firstname"
										rules={[
											{
												required: true,
												message: "Please input your First Name"
											}
										]}>
										<Input prefix={<UserOutlined />} placeholder="First Name" />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12} lg={12} xl={12}>
									<Form.Item
										name="lastname"
										rules={[
											{
												required: true,
												message: "Please input your Last Name"
											}
										]}>
										<Input prefix={<UserOutlined />} placeholder="Last Name" />
									</Form.Item>
								</Col>
							</Row>
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
									},
									{ min: 6, message: "Password must be minimum 6 characters" }
								]}>
								<Input.Password prefix={<LockOutlined />} placeholder="Password" />
							</Form.Item>

							<Form.Item>
								<Row gutter={[16, 24]} justify="center" align="middle">
									<Col
										style={{ textAlign: "center" }}
										xs={24}
										sm={24}
										md={8}
										lg={8}
										xl={8}>
										<Button type="primary" block htmlType="submit">
											<Text style={{ color: "#fff" }} strong>
												Sign Up
											</Text>
										</Button>
									</Col>
									<Col
										style={{ textAlign: "center" }}
										xs={24}
										sm={24}
										md={16}
										lg={14}
										xl={14}>
										<Text strong>Already have an account? </Text>
										<Link
											style={{
												color: "#6E70E5"
											}}
											to="/signin"
											variant="body2">
											<b> Sign In</b>
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

export default SignUpComponent;
