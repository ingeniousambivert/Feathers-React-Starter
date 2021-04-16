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
	FixedGrid
} from "@components";
import { Row, Col, Form } from "antd";
import { MailOutlined } from "@ant-design/icons";

function AuthenticateContainer(props) {
	const { onFinish, onFinishFailed, title } = props;
	return (
		<Fragment>
			<ResponsiveGrid xl={8}>
				<FixedGrid>
					<SimpleHeadingText>{title}</SimpleHeadingText>
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
								message: "Please input your Password"
							}
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
								<SubmitButton block buttonText="Sign In" />
							</Col>
							<Col
								style={{ textAlign: "center" }}
								xs={24}
								sm={24}
								md={16}
								lg={14}
								xl={14}>
								<Row justify="space-around" align="middle">
									<Col xs={24} sm={24} md={22} lg={22} xl={20}>
										<Text strong> Don&apos;t have an account? </Text>
										<LinkText linkTo="/signup" linkText="Sign Up" />
									</Col>
								</Row>
								<Row justify="space-around" align="middle">
									<Col xs={24} sm={24} md={22} lg={22} xl={20}>
										<Text strong> Forgot password? </Text>
										<LinkText
											style={{
												color: "#6E70E5"
											}}
											linkTo="/forgot-password"
											linkText="Reset"
										/>
									</Col>
								</Row>
							</Col>
						</Row>
					</SimpleFormItem>
				</Form>
			</ResponsiveGrid>
		</Fragment>
	);
}

AuthenticateContainer.propTypes = {
	onFinish: PropTypes.func.isRequired,
	onFinishFailed: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired
};
export default AuthenticateContainer;
