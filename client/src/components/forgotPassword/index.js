import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Typography, Result } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordThunk, selectAuthError } from "@slices/auth";
import { Spinner } from "@utils";

const { Text } = Typography;

function ForgotPasswordComponent() {
	const dispatch = useDispatch();
	const error = useSelector(selectAuthError);

	const [loading, setLoading] = useState(false);
	const [emailSent, setEmailSent] = useState(false);

	const onFinish = async (credentials) => {
		const { email } = credentials;
		setLoading(true);
		await dispatch(forgotPasswordThunk(email));
		if (error) console.error(error);
		setEmailSent(true);
		setLoading(false);
	};

	const onFinishFailed = (error) => {
		console.error("Failed : ", error);
	};

	const renderResult = (error) => {
		const errorMessage = `${error} Please try again.`;
		return loading ? (
			<Spinner loadingtext="Sending the email. Please wait" />
		) : error ? (
			<Result
				status="error"
				title="Failed to send the email"
				subTitle={errorMessage}
				extra={[
					<Button type="primary" key="signin">
						<Link to="/signin">
							<b> Sign In</b>
						</Link>
					</Button>
				]}
			/>
		) : (
			<Result
				status="success"
				title="Successfully sent the email"
				subTitle="You will recieve an email with a link. Visit the link to reset your password."
				extra={[
					<Button type="primary" key="signin">
						<Link to="/signin">
							<b> Sign In</b>
						</Link>
					</Button>
				]}
			/>
		);
	};

	const renderForm = () => {
		return (
			<div>
				<Row gutter={[16, 24]} justify="space-around" align="middle">
					<Col xs={20} sm={16} md={14} lg={10} xl={8}>
						<Row gutter={[16, 24]} justify="center" align="middle">
							<Col xs={24} sm={24} md={24} lg={24} xl={24}>
								<h1 style={{ textAlign: "center" }}>
									<b>Forgot Your Password ?</b>
								</h1>
							</Col>
						</Row>
						<Row
							gutter={[16, 24]}
							justify="center"
							align="middle"
							style={{ textAlign: "center" }}>
							<Col xs={24} sm={24} md={24} lg={24} xl={24}>
								<Text>Enter your email to recieve a password reset link.</Text>
							</Col>
						</Row>
						<Form
							hideRequiredMark
							name="forgot_password_form"
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

							<Form.Item>
								<Row gutter={[16, 24]} justify="space-around" align="middle">
									<Col
										style={{ textAlign: "center" }}
										xs={24}
										sm={24}
										md={8}
										lg={6}
										xl={6}>
										<Button type="primary" block htmlType="submit">
											<Text style={{ color: "#fff" }} strong>
												Send
											</Text>
										</Button>
									</Col>
								</Row>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</div>
		);
	};
	return <React.Fragment>{emailSent ? renderResult(error) : renderForm()}</React.Fragment>;
}

export default ForgotPasswordComponent;
