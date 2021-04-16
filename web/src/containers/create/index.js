import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
	SubmitButton,
	SimpleFormInput,
	PasswordFormInput,
	SimpleFormItem,
	SimpleHeadingText,
	Text,
	LinkText,
	ResponsiveGrid,
	FixedGrid,
	SemiColumn
} from "@components";
import { Row, Col, Form } from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";

function CreateContainer(props) {
	const { onFinish, onFinishFailed } = props;
	return (
		<Fragment>
			<ResponsiveGrid xl={10}>
				<FixedGrid>
					<SimpleHeadingText>Welcome Onboard</SimpleHeadingText>
				</FixedGrid>
				<Form
					hideRequiredMark
					name="signup_form"
					initialValues={{
						remember: true
					}}
					size="large"
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}>
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
								placeholder="First Name"
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
								placeholder="Last Name"
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
						placeholder="E-mail"
					/>

					<PasswordFormInput
						name="password"
						rules={[
							{
								required: true,
								message: "Please input your password"
							},
							{ min: 6, message: "Password must be minimum 6 characters" }
						]}
					/>

					<SimpleFormItem>
						<Row gutter={[16, 24]} justify="center" align="middle">
							<Col
								style={{ textAlign: "center" }}
								xs={24}
								sm={24}
								md={8}
								lg={8}
								xl={8}>
								<SubmitButton block buttonText="Sign Up" />
							</Col>
							<Col
								style={{ textAlign: "center" }}
								xs={24}
								sm={24}
								md={16}
								lg={14}
								xl={14}>
								<Text strong>Already have an account? </Text>
								<LinkText linkTo="/signin" linkText="Sign In" />
							</Col>
						</Row>
					</SimpleFormItem>
				</Form>
			</ResponsiveGrid>
		</Fragment>
	);
}

CreateContainer.propTypes = {
	onFinish: PropTypes.func.isRequired,
	onFinishFailed: PropTypes.func.isRequired
};
export default CreateContainer;
