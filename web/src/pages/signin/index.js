import React, { useState, useEffect } from "react";
import Container from "@containers";
import AuthenticateContainer from "@containers/authenticate";
import { ErrorAlert } from "@components";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInUserThunk, selectAuthError } from "@slices/auth";

function SignInPage() {
	const dispatch = useDispatch();
	const error = useSelector(selectAuthError);

	let location = useLocation();
	const url = location.pathname;
	const [title, setTitle] = useState(" ");

	const renderTitle = (url) => {
		if (url.includes("signin")) {
			setTitle("Welcome Back");
		} else {
			setTitle("Sign In To Continue");
		}
	};

	const onFinish = async (credentials) => {
		await dispatch(signInUserThunk(credentials));
		if (error) {
			console.error(error);
			if (
				error.includes("Invalid login") ||
				error.includes("Unauthorized") ||
				error.includes(401)
			) {
				return <ErrorAlert message="Failed to sign in. Invalid credentials" timeOut={10} />;
			} else {
				return (
					<ErrorAlert
						message={`${error}. Failed to sign in. Please try again`}
						timeOut={10}
					/>
				);
			}
		}
	};

	const onFinishFailed = (error) => {
		console.error("Failed : ", error);
	};

	useEffect(() => {
		renderTitle(url);
	}, [url]);
	return (
		<React.Fragment>
			<Container
				header={true}
				contentstyle={{ marginTop: "4%" }}
				iconcolor="#202020"
				background="#FEFEFE"
				footer={false}>
				<AuthenticateContainer
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					title={title}
				/>
			</Container>
		</React.Fragment>
	);
}

export default SignInPage;
