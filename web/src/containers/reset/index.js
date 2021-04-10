import React from "react";
import PropTypes from "prop-types";
import {
	LinkButton,
	SuccessResult,
	ErrorResult,
	Wrapper,
	SubmitButton,
	SimpleFormItem,
	SimpleHeadingText,
	PasswordFormInput,
	ResponsiveGrid,
	FixedGrid
} from "@components";
import { Row, Col, Form } from "antd";
import { Spinner } from "@utils";

function ResetContainer(props) {
	const { error, loading, emailSent, onFinish, onFinishFailed } = props;

	const renderResult = (error) => {
		const errorMessage = `${error} Please try again.`;
		return loading ? (
			<Spinner loadingtext="Resetting your password. Please wait" />
		) : error ? (
			<ErrorResult
				title="Password Reset Failed"
				subTitle={errorMessage}
				extra={[<LinkButton linkTo="/signin" key="signin" buttonText="Sign In" />]}
			/>
		) : (
			<SuccessResult
				title="Password Reset Successful"
				subTitle="Please sign in with your new password"
				extra={[<LinkButton linkTo="/signin" key="signin" buttonText="Sign In" />]}
			/>
		);
	};

	const renderForm = () => {
		return (
			<ResponsiveGrid xl={8}>
				<FixedGrid>
					<SimpleHeadingText>Reset Your Password</SimpleHeadingText>
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
					<PasswordFormInput
						name="password"
						rules={[
							{
								required: true,
								message: "Please input your new password"
							},
							{ min: 6, message: "Password must be minimum 6 characters" }
						]}
						placeholder="Enter your new password"
					/>
					<PasswordFormInput
						name="confirmPassword"
						rules={[
							{
								required: true,
								message: "Please confirm your password"
							},
							{ min: 6, message: "Password must be minimum 6 characters" }
						]}
						placeholder="Confirm your new password"
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
								<SubmitButton buttonText="Reset" />
							</Col>
						</Row>
					</SimpleFormItem>
				</Form>
			</ResponsiveGrid>
		);
	};
	return <Wrapper>{emailSent ? renderResult(error) : renderForm()}</Wrapper>;
}

ResetContainer.propTypes = {
	error: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.bool,
		PropTypes.number,
		PropTypes.string,
		PropTypes.element
	]).isRequired,
	loading: PropTypes.bool.isRequired,
	emailSent: PropTypes.bool.isRequired,
	onFinish: PropTypes.func.isRequired,
	onFinishFailed: PropTypes.func.isRequired
};

export default ResetContainer;
