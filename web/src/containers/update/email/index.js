import React, { Fragment } from "react";
import { Row, Form } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { Spinner } from "@utils";
import PropTypes from "prop-types";

import {
	Wrapper,
	SubmitButton,
	SecondaryButton,
	SimpleFormInput,
	PasswordFormInput,
	SimpleFormItem,
	StrongText,
	ResponsiveGrid,
	FixedGrid,
	SemiColumn
} from "@components";

function UpdateEmailContainer(props) {
	const { onFinish, onFinishFailed, closeUpdateView, form, loading } = props;
	return (
		<Wrapper>
			{loading ? (
				<Spinner loadingtext="Updating your email. Please wait" />
			) : (
				<Fragment>
					<ResponsiveGrid xl={10}>
						<FixedGrid>
							<StrongText center={true}>Update your Email Address</StrongText>
						</FixedGrid>
						<Form
							hideRequiredMark
							form={form}
							layout="vertical"
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}>
							<SimpleFormInput
								label="New Email"
								name="updatedEmail"
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
								placeholder="Enter your new email"
								prefix={<MailOutlined />}
							/>

							<PasswordFormInput
								label="Password"
								name="password"
								rules={[
									{
										required: true,
										message: "Please input your password"
									},
									{ min: 6, message: "Password must be minimum 6 characters" }
								]}
								placeholder="Enter your password"
							/>

							<SimpleFormItem>
								<Row gutter={[16, 24]} justify="center" align="middle">
									<SemiColumn>
										<SimpleFormItem>
											<SubmitButton buttonText="Update" />
										</SimpleFormItem>
									</SemiColumn>

									<SemiColumn>
										<SimpleFormItem>
											<SecondaryButton
												onClick={closeUpdateView}
												buttonText="Cancel"
											/>
										</SimpleFormItem>
									</SemiColumn>
								</Row>
							</SimpleFormItem>
						</Form>
					</ResponsiveGrid>
				</Fragment>
			)}
		</Wrapper>
	);
}

UpdateEmailContainer.propTypes = {
	onFinish: PropTypes.func.isRequired,
	onFinishFailed: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	closeUpdateView: PropTypes.func.isRequired,
	form: PropTypes.instanceOf(Form).isRequired
};
export default UpdateEmailContainer;
