import React, { useEffect, useState } from "react";
import { Typography, Row, Col, message, Button, Form, Input } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { updateUserThunk, selectUserError } from "@slices/user";
import { updateEmailThunk, selectAuthError } from "@slices/auth";
import Wrapper from "@components/wrapper";
import PropTypes from "prop-types";
import { Spinner } from "@utils";
import { useIsMountedRef } from "@utils/hooks";

const { Text } = Typography;
const headingStyle = { textAlign: "center", margin: "2%" };

const UpdateDetails = (props) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const error = useSelector(selectUserError);
	const { updateDetailsForm, updateView, user } = props;
	const [loading, setLoading] = useState(false);
	const isMountedRef = useIsMountedRef();

	const onFinish = async (updatedData) => {
		setLoading(true);
		const { _id } = user;
		if (isMountedRef.current) {
			await dispatch(updateUserThunk({ _id, updatedData }));
		}
		if (error) {
			console.error(error);
			message.error("Failed to update your data. PLease try again later.");
		} else {
			updateDetailsForm();
			updateView();
			message.success("Successfully updated your data");
		}
		setLoading(false);
	};

	const onFinishFailed = (error) => {
		console.error("Failed : ", error);
	};

	const setFieldsValue = async (user) => {
		await form.setFieldsValue({
			firstname: user.firstname,
			lastname: user.lastname
		});
	};

	useEffect(() => {
		if (user) {
			setFieldsValue(user);
		}
	}, [user]);

	return loading ? (
		<Spinner loadingtext="Updating user details. Please wait" />
	) : (
		<Wrapper padding="0" margin="0" className="editUserInfo">
			<div style={headingStyle}>
				<Text strong>Update your personal details</Text>
			</div>
			<Form
				hideRequiredMark
				form={form}
				layout="vertical"
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}>
				<Row gutter={[16, 16]} justify="center" align="middle">
					<Col xs={20} sm={18} md={14} lg={12} xl={10}>
						<Form.Item
							label="First Name"
							name="firstname"
							rules={[
								{
									required: true,
									message: "Please input your First Name"
								}
							]}>
							<Input prefix={<UserOutlined />} name="firstname" />
						</Form.Item>

						<Form.Item
							label="Last Name"
							name="lastname"
							rules={[
								{
									required: true,
									message: "Please input your Last Name"
								}
							]}>
							<Input prefix={<UserOutlined />} name="lastname" />
						</Form.Item>
					</Col>
				</Row>
				<Row justify="center" align="middle" gutter={[16, 16]}>
					<Col xs={6} sm={6} md={5} lg={4} xl={3}>
						<Form.Item name="updateDetails">
							<Button name="updateDetails" htmlType="submit" type="primary">
								Update
							</Button>
						</Form.Item>
					</Col>
					<Col xs={6} sm={6} md={5} lg={3} xl={2}>
						<Form.Item name="cancel">
							<Button
								name="cancel"
								onClick={() => {
									updateDetailsForm();
									updateView();
								}}>
								Cancel
							</Button>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Wrapper>
	);
};

const UpdateEmail = (props) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const error = useSelector(selectAuthError);
	const { updateEmailForm, updateView, user } = props;
	const [loading, setLoading] = useState(false);

	const onFinish = async (updatedData) => {
		setLoading(true);
		await dispatch(updateEmailThunk(updatedData));
		if (error) {
			if (error.includes("incorrect")) {
				message.error("Failed to update your email. Password is incorrect", 10);
			} else {
				console.error(error);
				message.error("Failed to update your email. Please try again later.", 10);
			}
		} else {
			updateEmailForm();
			updateView();
			message.success("Successfully updated your email.");
		}
		setLoading(false);
	};

	const onFinishFailed = (error) => {
		console.error("Failed : ", error);
	};

	const setFieldsValue = async (user) => {
		await form.setFieldsValue({
			currentEmail: user.email
		});
	};

	useEffect(() => {
		if (user) {
			setFieldsValue(user);
		}
	}, [user]);

	return loading ? (
		<Spinner loadingtext="Updating email. Please wait" />
	) : (
		<Wrapper padding="0" margin="0" className="editUserEmail">
			<div style={headingStyle}>
				<Text strong>Update your Email Address</Text>
			</div>
			<Form
				hideRequiredMark
				form={form}
				layout="vertical"
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}>
				<Row gutter={16} justify="center" align="middle">
					<Col xs={20} sm={18} md={14} lg={12} xl={10}>
						<Form.Item
							label="Password"
							name="password"
							rules={[
								{
									required: true,
									message: "Please input your Password"
								}
							]}>
							<Input.Password prefix={<LockOutlined />} name="password" />
						</Form.Item>

						<Form.Item
							label="Current E-mail"
							name="currentEmail"
							rules={[
								{
									required: true,
									message: "Please input your current E-mail"
								},
								{
									type: "email",
									message: "Please input a valid E-mail"
								}
							]}>
							<Input prefix={<MailOutlined />} type="email" name="currentEmail" />
						</Form.Item>

						<Form.Item
							label="New E-mail"
							name="updatedEmail"
							rules={[
								{
									required: true,
									message: "Please input your new E-mail"
								},
								{
									type: "email",
									message: "Please input a valid E-mail"
								}
							]}>
							<Input prefix={<MailOutlined />} type="email" name="updatedEmail" />
						</Form.Item>
					</Col>
				</Row>

				<Row justify="center" align="middle" gutter={[16, 16]}>
					<Col xs={6} sm={6} md={5} lg={4} xl={3}>
						<Form.Item name="updateEmail">
							<Button name="updateEmail" htmlType="submit" type="primary">
								Update
							</Button>
						</Form.Item>
					</Col>
					<Col xs={6} sm={6} md={5} lg={3} xl={2}>
						<Form.Item name="cancel">
							<Button
								name="cancel"
								onClick={() => {
									updateEmailForm();
									updateView();
								}}>
								Cancel
							</Button>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Wrapper>
	);
};

const UpdatePassword = (props) => {
	const [form] = Form.useForm();
	const { updatePasswordForm, updateView } = props;
	const [loading, setLoading] = useState(false);

	const onFinish = (updatedData) => {
		setLoading(true);
		const { newPassword, confirmPassword } = updatedData;

		if (newPassword !== confirmPassword) {
			message.error("Passwords do not match. Please re-enter", 5);
		} else {
			console.log(updatedData);
			updatePasswordForm();
			updateView();
			message.success("Successfully updated your password. WIP");
		}
		setLoading(false);
	};
	const onFinishFailed = (error) => {
		console.error("Failed : ", error);
	};

	return loading ? (
		<Spinner loadingtext="Updating password. Please wait" />
	) : (
		<Wrapper padding="0" margin="0" className="editUserPassword">
			<div style={headingStyle}>
				<Text strong>Update your Password </Text>
			</div>

			<Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
				<Row gutter={16} justify="center" align="middle">
					<Col xs={20} sm={18} md={14} lg={12} xl={10}>
						<Form.Item label="Current Password" name="currentPassword">
							<Input.Password
								prefix={<LockOutlined />}
								name="currentPassword"
								rules={[
									{
										required: true,
										message: "Please input your current password"
									}
								]}
							/>
						</Form.Item>

						<Form.Item label="New Password" name="newPassword">
							<Input.Password
								prefix={<LockOutlined />}
								name="newPassword"
								rules={[
									{
										required: true,
										message: "Please input your new password"
									},
									{ min: 6, message: "Password must be minimum 6 characters" }
								]}
							/>
						</Form.Item>

						<Form.Item label="Confirm Password" name="confirmPassword">
							<Input.Password
								prefix={<LockOutlined />}
								name="confirmPassword"
								rules={[
									{
										required: true,
										message: "Please confirm your new password"
									},
									{ min: 6, message: "Password must be minimum 6 characters" }
								]}
							/>
						</Form.Item>
					</Col>
				</Row>

				<Row justify="center" align="middle" gutter={[16, 16]}>
					<Col xs={6} sm={6} md={5} lg={4} xl={3}>
						<Form.Item name="updatePassword">
							<Button name="updatePassword" htmlType="submit" type="primary">
								Update
							</Button>
						</Form.Item>
					</Col>
					<Col xs={6} sm={6} md={5} lg={3} xl={2}>
						<Form.Item name="cancel">
							<Button
								name="cancel"
								onClick={() => {
									updatePasswordForm();
									updateView();
								}}>
								Cancel
							</Button>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Wrapper>
	);
};

UpdateDetails.propTypes = {
	user: PropTypes.object.isRequired,
	updateDetailsForm: PropTypes.func.isRequired,
	updateView: PropTypes.func.isRequired
};

UpdateEmail.propTypes = {
	user: PropTypes.object.isRequired,
	updateEmailForm: PropTypes.func.isRequired,
	updateView: PropTypes.func.isRequired
};

UpdatePassword.propTypes = {
	user: PropTypes.object.isRequired,
	updatePasswordForm: PropTypes.func.isRequired,
	updateView: PropTypes.func.isRequired
};

export { UpdateDetails, UpdateEmail, UpdatePassword };
