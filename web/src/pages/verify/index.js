import React, { useState, useLayoutEffect } from "react";
import Container from "@containers";
import VerifyContainer from "@containers/verify";

import { verifyAccountThunk, selectAuthError } from "@slices/auth";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function VerifyPage() {
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

	useLayoutEffect(() => {
		if (!token) {
			history.push("/signin");
		} else {
			verifyAccount(token);
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
				<VerifyContainer loading={loading} error={error} />
			</Container>
		</React.Fragment>
	);
}

export default VerifyPage;
