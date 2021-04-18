import React, { Fragment } from "react";
import { Row, Form } from "antd";
import { Spinner } from "@utils";
import PropTypes from "prop-types";

import {
	Wrapper,
	SubmitButton,
	SecondaryButton,
	PasswordFormInput,
	SimpleFormItem,
	StrongText,
	ResponsiveGrid,
	FixedGrid,
	SemiColumn
} from "@components";

function UpdatePasswordContainer(props) {
	const { onFinish, onFinishFailed, closeUpdateView, form, loading } = props;
	return (
		<Wrapper>
			{loading ? (
				<Spinner loadingtext="Updating your password. Please wait" />
			) : (
				<Fragment>
					<ResponsiveGrid xl={10}>
						<FixedGrid>
							<StrongText>Update your password</StrongText>
						</FixedGrid>
						<Form
							hideRequiredMark
							form={form}
							layout="vertical"
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}>
							<PasswordFormInput
								label="Current Password"
								name="oldPassword"
								rules={[
									{
										required: true,
										message: "Please input your current password"
									}
								]}
								placeholder="Enter your current password"
							/>

							<PasswordFormInput
								label="New Password"
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

							<SimpleFormItem>
								<Row gutter={[16, 24]} justify="center" align="middle">
									<SemiColumn>
										<SimpleFormItem>
											<SubmitButton buttontext="Update" />
										</SimpleFormItem>
									</SemiColumn>

									<SemiColumn>
										<SimpleFormItem>
											<SecondaryButton
												onClick={closeUpdateView}
												buttontext="Cancel"
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

UpdatePasswordContainer.propTypes = {
	onFinish: PropTypes.func.isRequired,
	onFinishFailed: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	closeUpdateView: PropTypes.func.isRequired,
	form: PropTypes.instanceOf(Form).isRequired
};
export default UpdatePasswordContainer;
