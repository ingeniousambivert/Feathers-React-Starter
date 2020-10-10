/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Typography, Row, Col, message, Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateUserThunk, selectError } from "@slices/user";
import Wrapper from "@components/wrapper";
import PropTypes from "prop-types";

const { Text } = Typography;
const headingStyle = { textAlign: "center", margin: "2%" };

const UpdateDetails = (props) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const error = useSelector(selectError);
	const { updateDetailsForm, updateView, user } = props;

	const onFinish = (updatedData) => {
		(async (updatedData, error) => {
			const { firstname, lastname, email } = updatedData;
			const { _id } = user;
			await dispatch(updateUserThunk({ _id, userData: { firstname, lastname, email } })).then(
				() => {
					if (error) {
						console.error(error);
						message.error("Failed to update your data");
					} else {
						updateDetailsForm();
						updateView();
						message.success("Successfully updated your data");
					}
				}
			);
		})(updatedData, error);
	};

	const onFinishFailed = (error) => {
		console.error("Failed : ", error);
	};

	useEffect(() => {
		form.setFieldsValue({
			firstname: user.firstname,
			lastname: user.lastname,
			email: user.email
		});
	}, []);

	return (
		<Wrapper className="editUserInfo">
			<div style={headingStyle}>
				<Text strong>Update your personal details</Text>
			</div>
			<Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
				<Row gutter={[16, 16]} justify="center" align="middle">
					<Col xs={20} sm={18} md={14} lg={10} xl={10}>
						<Form.Item label="First Name" name="firstname">
							<Input name="firstname" />
						</Form.Item>
					</Col>
					<Col xs={20} sm={18} md={14} lg={10} xl={10}>
						<Form.Item label="Last Name" name="lastname">
							<Input name="lastname" />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={[16, 16]} justify="center" align="middle">
					<Col xs={20} sm={18} md={14} lg={10} xl={10}>
						<Form.Item label="E-mail" name="email">
							<Input type="email" name="email" />
						</Form.Item>
					</Col>
				</Row>
				<Row justify="end" align="middle" gutter={[16, 16]}>
					<Col xs={22} sm={22} md={10} lg={5} xl={3}>
						<Form.Item name="updateDetails">
							<Button name="updateDetails" htmlType="submit" type="primary">
								Update
							</Button>
						</Form.Item>
					</Col>
					<Col xs={22} sm={22} md={10} lg={5} xl={3}>
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

const UpdatePassword = (props) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const error = useSelector(selectError);
	const { updatePasswordForm, updateView } = props;

	const onFinish = (updatedData) => {
		console.log(updatedData);
		updatePasswordForm();
		updateView();
		message.success("Successfully updated your password");
	};
	const onFinishFailed = (error) => {
		console.error("Failed : ", error);
	};

	return (
		<Wrapper className="editUserInfo">
			<div style={headingStyle}>
				<Text strong>Update your Password </Text>
			</div>

			<Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
				<Row gutter={16} justify="center" align="middle">
					<Col xs={20} sm={18} md={14} lg={10} xl={10}>
						<Form.Item label="Current Password" name="currentPassword">
							<Input.Password name="currentPassword" />
						</Form.Item>

						<Form.Item label="New Password" name="newPassword">
							<Input.Password name="newPassword" />
						</Form.Item>

						<Form.Item label="Confirm Password" name="confirmPassword">
							<Input.Password name="confirmPassword" />
						</Form.Item>
					</Col>
				</Row>

				<Row justify="end" align="middle" gutter={[16, 16]}>
					<Col xs={22} sm={22} md={10} lg={5} xl={3}>
						<Form.Item name="updatePassword">
							<Button name="updatePassword" htmlType="submit" type="primary">
								Update
							</Button>
						</Form.Item>
					</Col>
					<Col xs={22} sm={22} md={10} lg={5} xl={3}>
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

UpdatePassword.propTypes = {
	user: PropTypes.object.isRequired,
	updatePasswordForm: PropTypes.func.isRequired,
	updateView: PropTypes.func.isRequired
};

export { UpdateDetails, UpdatePassword };
