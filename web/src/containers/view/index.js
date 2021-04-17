import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import {
	SecondaryButton,
	LinkButton,
	Text,
	ResponsiveGrid,
	SimpleDescription,
	SimpleDescriptionItem,
	Wrapper
} from "@components";
import {
	CheckCircleTwoTone,
	ExclamationCircleTwoTone,
	MailOutlined,
	UserOutlined
} from "@ant-design/icons";
import { verified, unverified } from "@utils";

const marginRight = { marginRight: "1%" };
const floatRight = { float: "right" };

const ViewDataContainer = (props) => {
	const {
		user,
		resendConfirmation,
		editDetailsView,
		editEmailView,
		editPasswordView,
		signOutAndRemove
	} = props;
	return (
		<Wrapper>
			<div className="userInfo">
				<ResponsiveGrid justify="center" span={22}>
					<SimpleDescription>
						<SimpleDescriptionItem label="Name">
							<Text>
								<UserOutlined /> &nbsp; {user.firstname} {user.lastname}
							</Text>
						</SimpleDescriptionItem>

						<SimpleDescriptionItem label="Account Status">
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
						</SimpleDescriptionItem>
						<SimpleDescriptionItem label="Email">
							<Text>
								<MailOutlined /> &nbsp; {user.email}
							</Text>
							{!user.isVerified && (
								<LinkButton
									style={floatRight}
									onClick={() => {
										resendConfirmation(user);
									}}
									buttontext="Resend Confirmation"
								/>
							)}
						</SimpleDescriptionItem>
					</SimpleDescription>
				</ResponsiveGrid>
				<Row justify="center" align="middle" gutter={[16, 16]}>
					<Col xs={10} sm={8} md={6} lg={5} xl={4}>
						<SecondaryButton onClick={editDetailsView} buttontext="Update Details" />
					</Col>
					<Col xs={10} sm={8} md={6} lg={5} xl={4}>
						<SecondaryButton onClick={editEmailView} buttontext="Update Email" />
					</Col>
					<Col xs={10} sm={8} md={6} lg={5} xl={4}>
						<SecondaryButton onClick={editPasswordView} buttontext="Update Password" />
					</Col>
					<Col xs={10} sm={8} md={6} lg={5} xl={4}>
						<SecondaryButton onClick={signOutAndRemove} danger>
							Sign Out
						</SecondaryButton>
					</Col>
				</Row>
			</div>
		</Wrapper>
	);
};

ViewDataContainer.propTypes = {
	user: PropTypes.object.isRequired,
	editDetailsView: PropTypes.func.isRequired,
	editEmailView: PropTypes.func.isRequired,
	editPasswordView: PropTypes.func.isRequired,
	resendConfirmation: PropTypes.func.isRequired,
	signOutAndRemove: PropTypes.func.isRequired
};

export default ViewDataContainer;
