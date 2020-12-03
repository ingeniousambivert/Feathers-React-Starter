import React, { useEffect, useState } from "react";
import { Typography, Row, Col, message, Button, Form, Input } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { updateUserThunk, removeUserAction, selectUserError } from "@slices/user";
import {
	updateEmailThunk,
	updatePasswordThunk,
	signOutUserThunk,
	selectAuthError
} from "@slices/auth";

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
			message.error("Failed to update your details. Please try again later.");
		} else {
			updateDetailsForm();
			updateView();
			message.success("Successfully updated your details");
		}
		setLoading(false);
	};

	const onFinishFailed = (error) => {
		console.error("Failed : ", error);
	};

	const setFieldsValue = (user) => {
		form.setFieldsValue({
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
	const currentEmail = user.email;

	const onFinish = async (updatedData) => {
		setLoading(true);
		await dispatch(updateEmailThunk({ ...updatedData, currentEmail }));
		if (error) {
			if (error.includes("incorrect") || error.includes("not valid")) {
				message.error("Failed to update your email. Invalid password", 10);
			} else {
				console.error(error);
				message.error("Failed to update your email. Please try again later.", 10);
			}
		} else {
			updateEmailForm();
			updateView();
			message.success("Successfully updated your email");
		}
		setLoading(false);
	};

	const onFinishFailed = (error) => {
		console.error("Failed : ", error);
	};

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
							label="New Email"
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

						<Form.Item
							label="Password"
							name="password"
							rules={[
								{
									required: true,
									message: "Please input your password to continue"
								}
							]}>
							<Input.Password prefix={<LockOutlined />} name="password" />
						</Form.Item>
					</Col>
				</Row>

				<Row justify="center" align="middle" gutter={[16, 16]}>
					<Col xs={6} sm={6} md={5} lg={4} xl={3}>
						<Form.Item>
							<Button htmlType="submit" type="primary">
								Update
							</Button>
						</Form.Item>
					</Col>
					<Col xs={6} sm={6} md={5} lg={3} xl={2}>
						<Form.Item>
							<Button
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
	const { updatePasswordForm, updateView, user } = props;
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const error = useSelector(selectAuthError);

	const onFinish = async (updatedData) => {
		setLoading(true);
		const { password, oldPassword } = updatedData;
		const { email } = user;

		await dispatch(updatePasswordThunk({ email, password, oldPassword }));
		if (error) {
			console.error(error);
			message.error("Failed to update your password. Please try again later", 10);
		} else {
			updatePasswordForm();
			updateView();
			message.success(
				"Successfully updated your password. Please sign in again with the updated password"
			);
			dispatch(removeUserAction());
			dispatch(signOutUserThunk());
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

			<Form
				hideRequiredMark
				form={form}
				layout="vertical"
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}>
				<Row gutter={16} justify="center" align="middle">
					<Col xs={20} sm={18} md={14} lg={12} xl={10}>
						<Form.Item
							label="Current Password"
							name="oldPassword"
							rules={[
								{
									required: true,
									message: "Please input your current password"
								}
							]}>
							<Input.Password prefix={<LockOutlined />} name="oldPassword" />
						</Form.Item>

						<Form.Item
							label="New Password"
							name="password"
							rules={[
								{
									required: true,
									message: "Please input your new password"
								},
								{ min: 6, message: "Password must be minimum 6 characters" }
							]}>
							<Input.Password prefix={<LockOutlined />} name="password" />
						</Form.Item>
					</Col>
				</Row>

				<Row justify="center" align="middle" gutter={[16, 16]}>
					<Col xs={6} sm={6} md={5} lg={4} xl={3}>
						<Form.Item>
							<Button htmlType="submit" type="primary">
								Update
							</Button>
						</Form.Item>
					</Col>
					<Col xs={6} sm={6} md={5} lg={3} xl={2}>
						<Form.Item>
							<Button
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
