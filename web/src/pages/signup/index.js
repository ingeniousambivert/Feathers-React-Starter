import React from "react";
import Container from "@containers";
import CreateContainer from "@containers/create";
import { SuccessAlert, ErrorAlert } from "@components";
import { useDispatch, useSelector } from "react-redux";
import { signUpUserThunk, signInUserThunk, selectAuthError } from "@slices/auth";

function SignUpPage() {
	const dispatch = useDispatch();
	const error = useSelector(selectAuthError);

	const onFinish = async (credentials) => {
		const { email, password } = credentials;
		await dispatch(signUpUserThunk(credentials));
		if (error) {
			if (
				error.includes("value already exists") ||
				error.includes("conflict") ||
				error.includes(409)
			) {
				return (
					<ErrorAlert
						message="Failed to create an account. Email is already in use"
						timeOut={10}
					/>
				);
			} else {
				return (
					<ErrorAlert
						message={`${error}. Failed to create an account. Please try again`}
						timeOut={10}
					/>
				);
			}
		} else {
			dispatch(signInUserThunk({ email, password })).then(
				<SuccessAlert message="Successfully created a new account." timeOut={5} />
			);
		}
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
				<CreateContainer onFinish={onFinish} onFinishFailed={onFinishFailed} />
			</Container>
		</React.Fragment>
	);
}

export default SignUpPage;
