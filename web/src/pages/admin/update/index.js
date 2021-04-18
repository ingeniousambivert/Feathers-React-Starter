import React, { useEffect, useState, Fragment } from "react";
import { Row, Col, Form, Popconfirm } from "antd";
import { UserOutlined, MailOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { updateUserThunk, selectUserError } from "@slices/user";
import {
	deactivateUserThunk,
	reactivateUserThunk,
	deverifyUserThunk,
	reverifyUserThunk,
	resetUserPasswordThunk,
	selectAdminError
} from "@slices/admin";
import { Spinner } from "@utils";
import PropTypes from "prop-types";
import {
	Wrapper,
	SecondaryButton,
	SimpleFormInput,
	SimpleFormItem,
	PrimaryButton,
	PasswordFormInput,
	ResponsiveGrid,
	FixedGrid,
	SemiColumn,
	ErrorAlert,
	InfoAlert
} from "@components";

const ResetPassword = (props) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const userError = useSelector(selectUserError);

	const { setEditPasswordView, setLoading, user } = props;

	const onFinish = async (updatedData) => {
		if (userError) {
			setLoading(true);
			console.error(userError);
			ErrorAlert("Failed to update user data. Please try again later.");
		} else {
			const { _id } = user;
			const { password, confirmPassword } = updatedData;
			if (password !== confirmPassword) {
				ErrorAlert("Passwords do not match. Please try again later.");
			} else {
				await dispatch(resetUserPasswordThunk({ _id, password }));
				setEditPasswordView(false);
				InfoAlert("Successfully reset user's password");
				setLoading(false);
			}
		}
	};

	const onFinishFailed = (error) => {
		console.error("Failed : ", error);
	};

	return (
		<Fragment>
			<ResponsiveGrid xl={10}>
				<Form
					hideRequiredMark
					form={form}
					layout="vertical"
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}>
					<FixedGrid>
						<SimpleFormItem>
							<h2 style={{ textAlign: "center" }}>
								Reset user&apos;s password
								<Row
									gutter={[16, 16]}
									justify="end"
									align="middle"
									style={{ float: "right" }}>
									<SemiColumn>
										<Popconfirm
											placement="top"
											title="Are you sure to reset this user's password?"
											onConfirm={form.submit}
											okText="Yes"
											cancelText="No">
											<PrimaryButton icon={<CheckOutlined />} />
										</Popconfirm>
									</SemiColumn>

									<SemiColumn>
										<SecondaryButton
											onClick={() => setEditPasswordView(false)}
											icon={<CloseOutlined />}
										/>
									</SemiColumn>
								</Row>
							</h2>
						</SimpleFormItem>
					</FixedGrid>
					<PasswordFormInput
						label="New Password"
						name="password"
						placeholder="Enter a new password"
					/>

					<PasswordFormInput
						label="Confirm Password"
						name="confirmPassword"
						placeholder="Confirm new password"
					/>
				</Form>
			</ResponsiveGrid>
		</Fragment>
	);
};

const UpdateData = (props) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const userError = useSelector(selectUserError);
	const adminError = useSelector(selectAdminError);

	const { setEditView, user, loadUsers, setEditPasswordView, setLoading } = props;

	const onFinish = async (updatedData) => {
		setLoading(true);
		if (userError) {
			console.error(userError);
			ErrorAlert("Failed to update user data. Please try again later.");
		} else {
			const { _id } = user;
			await dispatch(updateUserThunk({ _id, updatedData }));
			setEditView(false);
			InfoAlert("Successfully updated user data");
			loadUsers(adminError);
		}
		setLoading(false);
	};

	const onFinishFailed = (error) => {
		console.error("Failed : ", error);
	};

	const setFieldsValue = async (userData) => {
		await form.setFieldsValue({
			firstname: userData.firstname,
			lastname: userData.lastname,
			email: userData.email
		});
	};

	useEffect(() => {
		if (user) {
			setFieldsValue(user);
		}
		// eslint-disable-next-line
	}, [user]);

	return (
		<Fragment>
			<ResponsiveGrid xl={10}>
				<Form
					name="update_form"
					hideRequiredMark
					form={form}
					layout="vertical"
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}>
					<FixedGrid>
						<SimpleFormItem>
							<h2 style={{ textAlign: "center" }}>
								Update user&apos;s details
								<Row
									gutter={[16, 16]}
									justify="end"
									align="middle"
									style={{ float: "right" }}>
									<SemiColumn>
										<Popconfirm
											placement="top"
											title="Are you sure to update this user's data?"
											onConfirm={form.submit}
											okText="Yes"
											cancelText="No">
											<PrimaryButton icon={<CheckOutlined />} />
										</Popconfirm>
									</SemiColumn>

									<SemiColumn>
										<SecondaryButton
											onClick={() => setEditView(false)}
											icon={<CloseOutlined />}
										/>
									</SemiColumn>
								</Row>
							</h2>
						</SimpleFormItem>
					</FixedGrid>
					<Row gutter={8} justify="space-around" align="middle">
						<SemiColumn>
							<SimpleFormInput
								name="firstname"
								rules={[
									{
										required: true,
										message: "Please input your First Name"
									}
								]}
								prefix={<UserOutlined />}
							/>
						</SemiColumn>

						<SemiColumn>
							<SimpleFormInput
								name="lastname"
								rules={[
									{
										required: true,
										message: "Please input your Last Name"
									}
								]}
								prefix={<UserOutlined />}
							/>
						</SemiColumn>
					</Row>

					<SimpleFormInput
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
						]}
						prefix={<MailOutlined />}
					/>

					<SimpleFormItem>
						<Row gutter={[16, 24]} justify="center" align="middle">
							<Col>
								<SimpleFormItem>
									{user.isVerified ? (
										<Popconfirm
											placement="bottom"
											title="Are you sure to de-verify this user?"
											onConfirm={async () => {
												const { _id } = user;
												await dispatch(deverifyUserThunk(_id));
												InfoAlert("De-verified the user successfully");
												setEditView(false);
												loadUsers(adminError);
											}}
											okText="Yes"
											cancelText="No">
											<SecondaryButton buttontext="De-verify User" />
										</Popconfirm>
									) : (
										<Popconfirm
											placement="bottom"
											title="Are you sure to verify this user?"
											onConfirm={async () => {
												const { _id } = user;
												await dispatch(reverifyUserThunk(_id));
												InfoAlert("Re-verified the user successfully");
												setEditView(false);
												loadUsers(adminError);
											}}
											okText="Yes"
											cancelText="No">
											<SecondaryButton buttontext="Verify User" />
										</Popconfirm>
									)}
								</SimpleFormItem>
							</Col>
							<Col>
								<SimpleFormItem>
									<SecondaryButton
										onClick={() => setEditPasswordView(true)}
										buttontext="Reset Password"
									/>
								</SimpleFormItem>
							</Col>

							<Col>
								<SimpleFormItem>
									{user.isActive ? (
										<Popconfirm
											placement="leftTop"
											title="Are you sure to de-activate this user?"
											onConfirm={async () => {
												const { _id } = user;
												await dispatch(deactivateUserThunk(_id));
												InfoAlert("De-activated the user successfully");
												setEditView(false);
												loadUsers(adminError);
											}}
											okText="Yes"
											cancelText="No">
											<SecondaryButton danger>
												Deactivate User
											</SecondaryButton>
										</Popconfirm>
									) : (
										<Popconfirm
											placement="leftTop"
											title="Are you sure to re-activate this user?"
											onConfirm={async () => {
												const { _id } = user;
												await dispatch(reactivateUserThunk(_id));
												InfoAlert("Re-activated the user successfully");
												setEditView(false);
												loadUsers(adminError);
											}}
											okText="Yes"
											cancelText="No">
											<SecondaryButton>Reactivate User</SecondaryButton>
										</Popconfirm>
									)}
								</SimpleFormItem>
							</Col>
						</Row>
					</SimpleFormItem>
				</Form>
			</ResponsiveGrid>
		</Fragment>
	);
};

const UpdateUser = (props) => {
	const { setEditView, user, loadUsers } = props;
	const [editPasswordView, setEditPasswordView] = useState(false);
	const [loading, setLoading] = useState(false);
	return (
		<Wrapper>
			{loading ? (
				<Spinner loadingtext="Updating user data. Please wait" />
			) : editPasswordView ? (
				<ResetPassword
					user={user}
					setLoading={setLoading}
					setEditPasswordView={setEditPasswordView}
				/>
			) : (
				<UpdateData
					setLoading={setLoading}
					setEditPasswordView={setEditPasswordView}
					user={user}
					setEditView={setEditView}
					loadUsers={loadUsers}
				/>
			)}
		</Wrapper>
	);
};

UpdateUser.propTypes = {
	user: PropTypes.object.isRequired,
	setEditView: PropTypes.func.isRequired,
	loadUsers: PropTypes.func.isRequired
};
ResetPassword.propTypes = {
	user: PropTypes.object.isRequired,
	setEditPasswordView: PropTypes.func.isRequired,
	setLoading: PropTypes.func.isRequired
};
UpdateData.propTypes = {
	user: PropTypes.object.isRequired,
	setEditView: PropTypes.func.isRequired,
	loadUsers: PropTypes.func.isRequired,
	setEditPasswordView: PropTypes.func.isRequired,
	setLoading: PropTypes.func.isRequired
};

export default UpdateUser;
