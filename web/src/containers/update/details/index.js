import React, { Fragment } from "react";
import { Row, Form } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Spinner } from "@utils";
import PropTypes from "prop-types";

import {
	Wrapper,
	SubmitButton,
	SecondaryButton,
	SimpleFormInput,
	SimpleFormItem,
	StrongText,
	ResponsiveGrid,
	FixedGrid,
	SemiColumn
} from "@components";

function UpdateDetailsContainer(props) {
	const { onFinish, onFinishFailed, closeUpdateView, form, loading } = props;
	return (
		<Wrapper>
			{loading ? (
				<Spinner loadingtext="Updating your details. Please wait" />
			) : (
				<Fragment>
					<ResponsiveGrid xl={10}>
						<FixedGrid>
							<StrongText>Update your personal details</StrongText>
						</FixedGrid>
						<Form
							hideRequiredMark
							form={form}
							layout="vertical"
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}>
							<SimpleFormInput
								label="First Name"
								name="firstname"
								rules={[
									{
										required: true,
										message: "Please input your First Name"
									}
								]}
								prefix={<UserOutlined />}
							/>

							<SimpleFormInput
								label="Last Name"
								name="lastname"
								rules={[
									{
										required: true,
										message: "Please input your Last Name"
									}
								]}
								prefix={<UserOutlined />}
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

UpdateDetailsContainer.propTypes = {
	onFinish: PropTypes.func.isRequired,
	onFinishFailed: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	closeUpdateView: PropTypes.func.isRequired,
	form: PropTypes.instanceOf(Form).isRequired
};
export default UpdateDetailsContainer;
