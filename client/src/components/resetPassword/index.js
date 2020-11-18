import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Button, Typography, Result, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useLocation, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordThunk, selectError } from "@slices/auth";
import { Spinner } from "@utils";

const { Text } = Typography;

function ResetPasswordComponent() {
	const dispatch = useDispatch();
	const error = useSelector(selectError);

	let location = useLocation();
	let history = useHistory();

	const token = location.search.substring(7);

	const [loading, setLoading] = useState(false);
	const [emailSent, setEmailSent] = useState(false);

	const onFinish = async (credentials) => {
		const { password, confirmPassword } = credentials;

		if (password !== confirmPassword) {
			message.error("Passwords do not match. Please try again", 5);
		} else {
			setLoading(true);
			await dispatch(resetPasswordThunk({ token, password })).then(
				error && console.error(error),
				setEmailSent(true)
			);
			setLoading(false);
		}
	};

	const onFinishFailed = (error) => {
		console.error("Failed : ", error);
	};

	useEffect(() => {
		if (!token) {
			history.push("/signin");
		}
	}, [token]);

	const renderResult = (error) => {
		const errorMessage = `${error} Please try again.`;
		return loading ? (
			<Spinner loadingtext="Resetting your password. Please wait" />
		) : error ? (
			<Result
				status="error"
				title="Failed to reset your password"
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
				title="Successfully reset your password"
				subTitle="You can sign in with your new password"
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
									<b>Reset Your Password</b>
								</h1>
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
								name="password"
								rules={[
									{
										required: true,
										message: "Please input your new password"
									},
									{ min: 6, message: "Password must be minimum 6 characters" }
								]}>
								<Input.Password
									prefix={<LockOutlined />}
									placeholder="Enter your new password"
								/>
							</Form.Item>

							<Form.Item
								name="confirmPassword"
								rules={[
									{
										required: true,
										message: "Please confirm your password"
									},
									{ min: 6, message: "Password must be minimum 6 characters" }
								]}>
								<Input.Password
									prefix={<LockOutlined />}
									placeholder="Confirm your new password"
								/>
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
												Reset
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

export default ResetPasswordComponent;