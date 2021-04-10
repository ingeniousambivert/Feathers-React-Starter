import React, { useState, useEffect } from "react";
import Container from "@containers";
import ResetContainer from "@containers/reset";
import { ErrorAlert } from "@components";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	resetPasswordThunk,
	selectAuthError,
	signOutUserThunk,
	selectIsAuthenticated
} from "@slices/auth";
import { removeUserAction } from "@slices/user";

function ResetPassword() {
	const dispatch = useDispatch();
	const error = useSelector(selectAuthError);

	let location = useLocation();
	let history = useHistory();
	let isUserAuthenticated = useSelector(selectIsAuthenticated);

	const token = location.search.substring(7);

	const [loading, setLoading] = useState(false);
	const [emailSent, setEmailSent] = useState(false);

	const onFinish = async (credentials) => {
		const { password, confirmPassword } = credentials;

		if (password !== confirmPassword) {
			return <ErrorAlert message="Passwords do not match. Please re-enter" timeOut={5} />;
		} else {
			if (isUserAuthenticated) {
				dispatch(removeUserAction());
				dispatch(signOutUserThunk());
			}
			setLoading(true);
			await dispatch(resetPasswordThunk({ token, password }));
			if (error) console.error(error);
			setEmailSent(true);
			setLoading(false);
		}
	};

	const onFinishFailed = (error) => {
		console.error("Failed : ", error);
	};

	useEffect(() => {
		if (!token) {
			history.push("/signin");
		}
	}, [token]);
	return (
		<React.Fragment>
			<Container
				header={true}
				contentstyle={{ marginTop: "4%" }}
				iconcolor="#202020"
				background="#FEFEFE"
				footer={false}>
				<ResetContainer
					loading={loading}
					emailSent={emailSent}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				/>
			</Container>
		</React.Fragment>
	);
}

export default ResetPassword;
