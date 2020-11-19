import React, { useState, useEffect } from "react";
import { Divider, Row, Col, message, notification } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { loadUserThunk, removeUserAction, selectUser, selectUserError } from "@slices/user";
import { selectUserID, signOutUserThunk } from "@slices/auth";

import { Spinner, RandomGreet, primaryColor } from "@utils";

import User from "./sections/user";

function HomeComponent() {
	const dispatch = useDispatch();
	const error = useSelector(selectUserError);
	const userID = useSelector(selectUserID);
	const user = useSelector(selectUser);
	const [greet, setGreet] = useState();

	const loadUser = async (userID, error) => {
		await dispatch(loadUserThunk(userID));
		if (error) {
			message.error("Failed to load user data", error);
			dispatch(removeUserAction());
			dispatch(signOutUserThunk());
		}
	};

	const greetUser = async () => {
		let greeting = await RandomGreet().toString();
		setGreet(greeting);
	};

	const unverifiedWarning = () => {
		notification["warning"]({
			message: "Account Unverified",
			description: "Please verify your E-mail to use all the features",
			duration: 0
		});
	};

	const renderUserName = (user) => (
		<div>
			<b>{greet}, </b>
			<b style={{ color: primaryColor }}>{user.firstname}</b>
		</div>
	);

	useEffect(() => {
		loadUser(userID, error);
		greetUser();
	}, [error]);

	return (
		<React.Fragment>
			{user ? (
				<React.Fragment>
					{((user) => {
						!user.isVerified && unverifiedWarning();
					})(user)}
					<div>
						<Row gutter={[16, 32]} justify="center" align="middle">
							<Col
								xs={22}
								sm={20}
								md={20}
								lg={18}
								xl={18}
								style={{ marginTop: "2%" }}>
								<Divider orientation="center">
									<h1>{renderUserName(user)}</h1>
								</Divider>
							</Col>
						</Row>
						<Row gutter={[16, 48]} justify="space-around" align="middle">
							<Col xs={23} sm={21} md={20} lg={18} xl={18}>
								<div>
									<User userinfo={user} />
								</div>
							</Col>
						</Row>
					</div>
				</React.Fragment>
			) : (
				<Spinner />
			)}
		</React.Fragment>
	);
}

export default HomeComponent;
