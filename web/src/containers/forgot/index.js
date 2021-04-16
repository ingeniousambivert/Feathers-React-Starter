import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Form } from "antd";
import { MailOutlined } from "@ant-design/icons";
import {
	LinkText,
	SuccessResult,
	ErrorResult,
	Wrapper,
	SubmitButton,
	PrimaryButton,
	SimpleFormInput,
	SimpleFormItem,
	SimpleHeadingText,
	SimpleText,
	ResponsiveGrid,
	FixedGrid
} from "@components";
import { Spinner, white } from "@utils";

function ForgotContainer(props) {
	const { error, loading, emailSent, onFinish, onFinishFailed } = props;

	const renderResult = (error) => {
		const errorMessage = `${error} Please try again.`;
		return loading ? (
			<Spinner loadingtext="Sending the email. Please wait" />
		) : error ? (
			<ErrorResult
				title="Failed to send the email"
				subTitle={errorMessage}
				extra={[
					<PrimaryButton key="signin">
						<LinkText style={{ color: white }} linkTo="/signin" linkText="Sign In" />
					</PrimaryButton>
				]}
			/>
		) : (
			<SuccessResult
				title="Successfully sent the email"
				subTitle="You will recieve an email with a link. Visit the link to reset your password."
				extra={[
					<PrimaryButton key="signin">
						<LinkText style={{ color: white }} linkTo="/signin" linkText="Sign In" />
					</PrimaryButton>
				]}
			/>
		);
	};
	const renderForm = () => {
		return (
			<div>
				<ResponsiveGrid xl={8}>
					<FixedGrid>
						<SimpleHeadingText>Forgot Your Password ?</SimpleHeadingText>
					</FixedGrid>
					<FixedGrid>
						<SimpleText>Enter your email to recieve a password reset link.</SimpleText>
					</FixedGrid>
					<Form
						hideRequiredMark
						name="forgot_password_form"
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

						<SimpleFormItem>
							<Row gutter={[16, 24]} justify="space-around" align="middle">
								<Col
									style={{ textAlign: "center" }}
									xs={24}
									sm={24}
									md={8}
									lg={6}
									xl={6}>
									<SubmitButton block buttonText="Send" />
								</Col>
							</Row>
						</SimpleFormItem>
					</Form>
				</ResponsiveGrid>
			</div>
		);
	};

	return <Wrapper>{emailSent ? renderResult(error) : renderForm()}</Wrapper>;
}

ForgotContainer.propTypes = {
	error: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.bool,
		PropTypes.number,
		PropTypes.string,
		PropTypes.element
	]),
	loading: PropTypes.bool.isRequired,
	emailSent: PropTypes.bool.isRequired,
	onFinish: PropTypes.func.isRequired,
	onFinishFailed: PropTypes.func.isRequired
};

export default ForgotContainer;
