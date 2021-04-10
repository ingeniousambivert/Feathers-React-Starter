import React, { useState } from "react";
import Container from "@containers";
import ForgotContainer from "@containers/forgot";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordThunk, selectAuthError } from "@slices/auth";

function ForgotPasswordPage() {
	const dispatch = useDispatch();
	const error = useSelector(selectAuthError);

	const [loading, setLoading] = useState(false);
	const [emailSent, setEmailSent] = useState(false);

	const onFinish = async (credentials) => {
		const { email } = credentials;
		setLoading(true);
		await dispatch(forgotPasswordThunk(email));
		if (error) console.error(error);
		setEmailSent(true);
		setLoading(false);
	};

	const onFinishFailed = (error) => {
		console.error("Failed : ", error);
	};

	return (
		<React.Fragment>
			<Container
				header={true}
				contentstyle={{ marginTop: "4%" }}
				iconcolor="#202020"
				background="#FEFEFE"
				footer={false}>
				<ForgotContainer
					loading={loading}
					emailSent={emailSent}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				/>
			</Container>
		</React.Fragment>
	);
}

export default ForgotPasswordPage;
