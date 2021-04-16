import React from "react";
import { Descriptions, Row, Col, Typography, Button, message } from "antd";
import {
	CheckCircleTwoTone,
	ExclamationCircleTwoTone,
	MailOutlined,
	UserOutlined
} from "@ant-design/icons";
import { verified, unverified } from "@utils";
import Wrapper from "@components/wrapper";
import { useDispatch, useSelector } from "react-redux";
import { resendConfirmationThunk, selectAuthError } from "@slices/auth";

import PropTypes from "prop-types";

const { Text } = Typography;
const marginRight = { marginRight: "1%" };
const floatRight = { float: "right" };

const Data = (props) => {
	const {
		user,
		editView,
		editDetailsForm,
		editEmailForm,
		editPasswordForm,
		signOutAndRemove
	} = props;
	const dispatch = useDispatch();
	const error = useSelector(selectAuthError);

	const resendConfirmation = async (data) => {
		await dispatch(resendConfirmationThunk(data));
		if (error) message.error(error);
		else message.info("Resent account verification e-mail");
	};

	return (
		<Wrapper>
			<div className="userInfo">
				<Row gutter={[16, 32]} justify="center" align="middle">
					<Col span={22}>
						<Descriptions
							size="small"
							bordered
							column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
							layout="vertical">
							<Descriptions.Item label="Name">
								<Text>
									<UserOutlined /> &nbsp; {user.firstname} {user.lastname}
								</Text>
							</Descriptions.Item>

							<Descriptions.Item label="Account Status">
								{user.isVerified ? (
									<Text>
										<CheckCircleTwoTone
											style={marginRight}
											twoToneColor={verified}
										/>
										&nbsp; Verified
									</Text>
								) : (
									<Text>
										<ExclamationCircleTwoTone
											style={marginRight}
											twoToneColor={unverified}
										/>
										&nbsp; Unverified
									</Text>
								)}
							</Descriptions.Item>
							<Descriptions.Item label="Email">
								<Text>
									<MailOutlined /> &nbsp; {user.email}
								</Text>
								{!user.isVerified && (
									<Button
										style={floatRight}
										onClick={() => {
											resendConfirmation(user);
										}}
										type="link">
										Resend Confirmation
									</Button>
								)}
							</Descriptions.Item>
						</Descriptions>
					</Col>
				</Row>
				<Row justify="center" align="middle" gutter={[16, 16]}>
					<Col xs={10} sm={8} md={6} lg={5} xl={4}>
						<Button
							onClick={() => {
								editDetailsForm();
								editView();
							}}>
							Update Details
						</Button>
					</Col>
					<Col xs={10} sm={8} md={6} lg={5} xl={4}>
						<Button
							onClick={() => {
								editEmailForm();
								editView();
							}}>
							Update Email
						</Button>
					</Col>
					<Col xs={10} sm={8} md={6} lg={5} xl={4}>
						<Button
							onClick={() => {
								editPasswordForm();
								editView();
							}}>
							Update Password
						</Button>
					</Col>
					<Col xs={10} sm={8} md={6} lg={5} xl={4}>
						<Button onClick={signOutAndRemove} danger>
							Sign Out
						</Button>
					</Col>
				</Row>
			</div>
		</Wrapper>
	);
};

Data.propTypes = {
	user: PropTypes.object.isRequired,
	editView: PropTypes.func.isRequired,
	editDetailsForm: PropTypes.func.isRequired,
	editEmailForm: PropTypes.func.isRequired,
	editPasswordForm: PropTypes.func.isRequired,
	signOutAndRemove: PropTypes.func.isRequired
};

export default Data;
