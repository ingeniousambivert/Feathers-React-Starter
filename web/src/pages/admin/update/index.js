import React, { useEffect, useState, Fragment } from "react";
import { Row, Col, Form, Popconfirm } from "antd";
import { UserOutlined, MailOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { updateUserThunk, selectUserError } from "@slices/user";
import { Spinner } from "@utils";
import PropTypes from "prop-types";
import {
	Wrapper,
	SubmitButton,
	SecondaryButton,
	SimpleFormInput,
	SimpleFormItem,
	PasswordFormInput,
	ResponsiveGrid,
	FixedGrid,
	SemiColumn,
	ErrorAlert,
	SuccessAlert
} from "@components";

const ResetPassword = () => {};

const UpdateUser = (props) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const error = useSelector(selectUserError);

	const { setEditView, user } = props;
	const [loading, setLoading] = useState(false);

	const onFinish = async (updatedData) => {
		setLoading(true);

		if (error) {
			console.error(error);
			ErrorAlert("Failed to update your data. Please try again later.");
		} else {
			console.log(updatedData);
			setEditView();
			SuccessAlert("Successfully updated your data");
		}
		setLoading(false);
	};

	const onFinishFailed = (error) => {
		console.error("Failed : ", error);
	};

	const setFieldsValue = async (user) => {
		await form.setFieldsValue({
			firstname: user.firstname,
			lastname: user.lastname,
			email: user.email
		});
	};

	useEffect(() => {
		if (user) {
			setFieldsValue(user);
		}
	}, []);

	return (
		<Wrapper>
			{loading ? (
				<Spinner loadingtext="Updating your details. Please wait" />
			) : (
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
										Update user details
										<Row
											gutter={[16, 16]}
											justify="end"
											align="middle"
											style={{ float: "right" }}>
											<SemiColumn>
												<SubmitButton icon={<CheckOutlined />} />
											</SemiColumn>

											<SemiColumn>
												<SecondaryButton
													onClick={() => setEditView()}
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
													title="Are you sure to unverify this user?"
													onConfirm={() => setEditView()}
													onCancel={() => console.log("Cancel")}
													okText="Yes"
													cancelText="No">
													<SecondaryButton buttontext="Unverify User" />
												</Popconfirm>
											) : (
												<Popconfirm
													placement="bottom"
													title="Are you sure to verify this user?"
													onConfirm={() => setEditView()}
													onCancel={() => console.log("Cancel")}
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
												onClick={() => setEditView()}
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
													onConfirm={() => setEditView()}
													onCancel={() => console.log("Cancel")}
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
													onConfirm={() => setEditView()}
													onCancel={() => console.log("Cancel")}
													okText="Yes"
													cancelText="No">
													<SecondaryButton>
														Reactivate User
													</SecondaryButton>
												</Popconfirm>
											)}
										</SimpleFormItem>
									</Col>
								</Row>
							</SimpleFormItem>
						</Form>
					</ResponsiveGrid>
				</Fragment>
			)}
		</Wrapper>
	);
};

export default UpdateUser;
