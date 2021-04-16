import React, { useState, useEffect } from "react";
import { Divider, notification } from "antd";
import { ErrorAlert, ResponsiveGrid } from "@components";
import { useSelector, useDispatch } from "react-redux";
import { loadUserThunk, removeUserAction, selectUser, selectUserError } from "@slices/user";
import { selectUserID, signOutUserThunk } from "@slices/auth";

import { Spinner, RandomGreet, primaryColor } from "@utils";
import Container from "@containers";

import UserData from "./user";

function HomeContainer() {
	const dispatch = useDispatch();
	const error = useSelector(selectUserError);
	const userID = useSelector(selectUserID);
	const user = useSelector(selectUser);
	const [greet, setGreet] = useState();

	const loadUser = async (userID, error) => {
		await dispatch(loadUserThunk(userID));
		if (error) {
			ErrorAlert("Failed to load user data", error);
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
			<Container header={true} iconcolor="#fff" background="#6669CC" elevate={true}>
				<React.Fragment>
					{user ? (
						<React.Fragment>
							{((user) => {
								!user.isVerified && unverifiedWarning();
							})(user)}
							<div>
								<ResponsiveGrid
									xs={22}
									sm={20}
									md={20}
									lg={18}
									xl={18}
									style={{ marginTop: "2%" }}
									justify="center"
									align="middle">
									<Divider orientation="center">
										<h1>{renderUserName(user)}</h1>
									</Divider>
								</ResponsiveGrid>
								<ResponsiveGrid
									align="middle"
									xs={23}
									sm={21}
									md={20}
									lg={18}
									xl={18}>
									<div>
										<UserData userinfo={user} />
									</div>
								</ResponsiveGrid>
							</div>
						</React.Fragment>
					) : (
						<Spinner />
					)}
				</React.Fragment>
			</Container>
		</React.Fragment>
	);
}

export default HomeContainer;
