import React, { useState, useLayoutEffect } from "react";
import { Result, Button } from "antd";
import Wrapper from "@components/wrapper";
import { verifyAccountThunk, selectAuthError } from "@slices/auth";
import { useLocation, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@utils";

function VerifyComponent() {
	const dispatch = useDispatch();
	const error = useSelector(selectAuthError);

	let location = useLocation();
	let history = useHistory();

	const [loading, setLoading] = useState(true);

	const token = location.search.substring(7);

	const verifyAccount = async (token) => {
		await dispatch(verifyAccountThunk(token));
		if (error) console.error(error);
		setLoading(false);
	};

	const renderResult = (error) =>
		error ? (
			<Result
				status="error"
				title="Email Verification Failed"
				subTitle="The token is invalid or your email has already been verified."
				extra={[
					<Button type="primary" key="signin">
						<Link to="/signin">
							<b> Sign In</b>
						</Link>
					</Button>
				]}
			/>
		) : (
			<Result
				status="success"
				title="Email Verification Successful"
				subTitle="Your email has been successfully verified. Sign in to try all the features."
				extra={[
					<Button type="primary" key="signin">
						<Link to="/signin">
							<b> Sign In</b>
						</Link>
					</Button>
				]}
			/>
		);

	useLayoutEffect(() => {
		if (!token) {
			history.push("/signin");
		} else {
			verifyAccount(token);
		}
	}, [token]);

	return (
		<Wrapper>
			{loading ? (
				<Spinner loadingtext="Verifying your email. Please wait" />
			) : (
				renderResult(error)
			)}
		</Wrapper>
	);
}

export default VerifyComponent;
