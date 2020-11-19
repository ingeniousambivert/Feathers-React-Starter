import React from "react";
import { Descriptions, Row, Col, Typography, Button } from "antd";
import {
	CheckCircleTwoTone,
	ExclamationCircleTwoTone,
	MailOutlined,
	UserOutlined
} from "@ant-design/icons";
import { verified, unverified } from "@utils";
import Wrapper from "@components/wrapper";
import PropTypes from "prop-types";

const { Text } = Typography;
const marginRight = { marginRight: "1%" };

const Data = (props) => {
	const {
		user,
		editView,
		editDetailsForm,
		editEmailForm,
		editPasswordForm,
		signOutAndRemove
	} = props;
	return (
		<Wrapper>
			<div className="userInfo">
				<Row gutter={[16, 32]} justify="center" align="middle">
					<Col span={22}>
						<Descriptions
							size="small"
							bordered
							column={{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
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
										/>{" "}
										&nbsp; Verified
									</Text>
								) : (
									<Text>
										<ExclamationCircleTwoTone
											style={marginRight}
											twoToneColor={unverified}
										/>{" "}
										&nbsp; Unverified
									</Text>
								)}
							</Descriptions.Item>
							<Descriptions.Item label="Email">
								<Text>
									<MailOutlined /> &nbsp; {user.email}
								</Text>
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
