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
				ErrorAlert("Failed to create an account. Email is already in use", 10);
			} else {
				ErrorAlert(`${error}. Failed to create an account. Please try again`, 10);
			}
		} else {
			dispatch(signInUserThunk({ email, password })).then(
				SuccessAlert("Successfully created a new account.", 5)
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
