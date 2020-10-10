import React, { useState, useEffect } from "react";
import { Divider, Tabs, Row, Col, message, Badge, notification } from "antd";
import { ProjectOutlined, UserOutlined, BellOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { loadUserThunk, removeUserAction, selectUser, selectError } from "@slices/user";
import { selectUserID, signOutUserThunk } from "@slices/auth";

import { Spinner, RandomGreet, primaryColor } from "@utils";

import Projects from "./sections/projects";
import Notices from "./sections/notices";
import User from "./sections/user";

const { TabPane } = Tabs;

function HomeComponent() {
	const dispatch = useDispatch();
	const error = useSelector(selectError);
	const userID = useSelector(selectUserID);
	const user = useSelector(selectUser);
	const [greet, setGreet] = useState();
	let [activeKey, setActiveKey] = useState("1");
	let location = useLocation();

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

	const onTabChange = (key) => {
		setActiveKey(key);
	};
	const changeTabs = (state) => {
		if (state) {
			state.to === "userSettings" && setActiveKey("3");
			state.to === "userNotices" && setActiveKey("2");
			state.to === "projectsList" && setActiveKey("1");
		} else {
			setActiveKey("1");
		}
	};
	const tabStyle = { height: 475 };
	const tabpaneStyle = {
		height: 475,
		overflowY: "scroll"
	};
	const badgeStyle = { backgroundColor: primaryColor };

	const renderUserName = (user) => (
		<div>
			<b>{greet}, </b>
			<b style={{ color: primaryColor }}>{user.firstname}</b>
		</div>
	);

	useEffect(() => {
		loadUser(userID, error);
		greetUser();
		changeTabs(location.state);
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
									<h3>{renderUserName(user)}</h3>
								</Divider>
							</Col>
						</Row>
						<Row gutter={[16, 48]} justify="space-around" align="middle">
							<Col xs={23} sm={21} md={20} lg={18} xl={18}>
								<div>
									<Tabs
										centered
										type="card"
										size="large"
										onChange={onTabChange}
										activeKey={activeKey}
										tabPosition="left"
										style={tabStyle}>
										<TabPane
											tab={
												<span>
													{" "}
													<ProjectOutlined /> Projects{" "}
												</span>
											}
											key="1">
											<div className="profileTab" style={tabpaneStyle}>
												<Projects userinfo={user} />
											</div>
										</TabPane>

										<TabPane
											tab={
												<span>
													<BellOutlined /> Notices
													<Badge
														count={0}
														style={badgeStyle}
														offset={[5, 0]}
														showZero
													/>{" "}
												</span>
											}
											key="2">
											{" "}
											<div className="profileTab" style={tabpaneStyle}>
												<Notices />
											</div>
										</TabPane>

										<TabPane
											tab={
												<span>
													<UserOutlined /> Account
												</span>
											}
											key="3">
											<div className="profileTab" style={tabpaneStyle}>
												<User userinfo={user} />
											</div>
										</TabPane>
									</Tabs>
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
