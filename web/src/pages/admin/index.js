import React, { useEffect, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Space, Tag, Popconfirm } from "antd";
import {
	CheckCircleTwoTone,
	ExclamationCircleTwoTone,
	ClockCircleOutlined,
	MailOutlined,
	UserOutlined,
	ReloadOutlined,
	EditOutlined,
	SyncOutlined,
	PoweroffOutlined
} from "@ant-design/icons";
import { verified, unverified } from "@utils";
import Container from "@containers";
import { Wrapper, ErrorAlert, InfoAlert } from "@components";
import { useSelector, useDispatch } from "react-redux";
import {
	loadUsersThunk,
	deactivateUserThunk,
	reactivateUserThunk,
	selectUsers,
	selectAdminError
} from "@slices/admin";
import { loadUserThunk, removeUserAction } from "@slices/user";
import { signOutUserThunk } from "@slices/auth";
import UpdateUser from "./update";

function AdminDashboard() {
	const dispatch = useDispatch();
	const error = useSelector(selectAdminError);
	const users = useSelector(selectUsers);

	const [editView, setEditView] = useState(false);
	const [editUser, setEditUser] = useState(null);

	const editUserData = (user) => {
		setEditUser(user);
		setEditView(true);
	};

	const removeUser = () => {
		dispatch(removeUserAction());
		dispatch(signOutUserThunk());
	};

	const loadUser = async (userID, error) => {
		await dispatch(loadUserThunk(userID));

		if (error) {
			ErrorAlert("Failed to load user data", error);
			removeUser();
		}
	};

	const loadUsers = async (error) => {
		await dispatch(loadUsersThunk());

		if (error) {
			ErrorAlert("Failed to load users data", error);
			removeUser();
		}
	};

	const renderName = (user) => (
		<Fragment>
			<UserOutlined /> &nbsp;
			<Link to="/home" onClick={() => loadUser(user._id, error)}>
				{user.name} &nbsp;
				{user.permissions.includes("admin", "super_admin") ? (
					user.isActive ? (
						<Tag color="geekblue">admin</Tag>
					) : (
						<Tag color="red">deactivated</Tag>
					)
				) : user.isActive ? (
					<Tag color="cyan">user</Tag>
				) : (
					<Tag color="red">deactivated</Tag>
				)}
				&nbsp;
			</Link>
		</Fragment>
	);

	const renderEmail = (user) => (
		<Fragment>
			<MailOutlined /> &nbsp; {user.email} &nbsp;
			{user.isVerified ? (
				<CheckCircleTwoTone twoToneColor={verified} />
			) : (
				<ExclamationCircleTwoTone twoToneColor={unverified} />
			)}
		</Fragment>
	);

	const renderActions = (user) => (
		<Space size="middle">
			<Button type="link" onClick={() => editUserData(user)} icon={<EditOutlined />} />
			{user.isActive ? (
				<Popconfirm
					placement="leftTop"
					title="Are you sure to de-activate this user?"
					onConfirm={async () => {
						const { _id } = user;
						await dispatch(deactivateUserThunk(_id));
						InfoAlert("De-activated the user successfully");
						loadUsers(error);
					}}
					onCancel={() => console.log("Cancel")}
					okText="Yes"
					cancelText="No">
					<Button danger type="link" icon={<PoweroffOutlined />} />
				</Popconfirm>
			) : (
				<Popconfirm
					placement="leftTop"
					title="Are you sure to re-activate this user?"
					onConfirm={async () => {
						const { _id } = user;
						await dispatch(reactivateUserThunk(_id));
						InfoAlert("Re-activated the user successfully");
						loadUsers(error);
					}}
					onCancel={() => console.log("Cancel")}
					okText="Yes"
					cancelText="No">
					<Button type="link" icon={<ReloadOutlined style={{ color: verified }} />} />
				</Popconfirm>
			)}
		</Space>
	);

	const columns = [
		{
			title: "Name",
			align: "left",
			// eslint-disable-next-line react/display-name
			render: (record) => renderName(record),
			responsive: ["xs", "sm", "md", "lg", "xl"]
		},
		{
			title: "Email",
			align: "left",
			// eslint-disable-next-line react/display-name
			render: (record) => renderEmail(record),
			responsive: ["xs", "sm", "md", "lg", "xl"]
		},
		{
			title: "Last Login",
			dataIndex: "lastLogIn",
			align: "left",
			// eslint-disable-next-line react/display-name
			render: (text) => (
				<span>
					<ClockCircleOutlined /> &nbsp;
					{text}
				</span>
			),
			responsive: ["xs", "sm", "md", "lg", "xl"]
		},
		{
			title: "Created At",
			dataIndex: "createdAt",
			align: "left",
			// eslint-disable-next-line react/display-name
			render: (text) => (
				<span>
					<ClockCircleOutlined /> &nbsp;
					{text}
				</span>
			),
			responsive: ["xs", "sm", "md", "lg", "xl"]
		},
		{
			title: "Actions",
			key: "actions",
			align: "left",
			// eslint-disable-next-line
			render: (record) => renderActions(record),
			responsive: ["xs", "sm", "md", "lg", "xl"]
		}
	];

	useEffect(() => {
		loadUsers(error);
		// eslint-disable-next-line
	}, [error]);

	return (
		<React.Fragment>
			<Container header={true} iconcolor="#fff" background="#6669CC" elevate={true}>
				<Wrapper>
					{!editView ? (
						<Table
							bordered
							title={() => (
								<Fragment>
									<h1 style={{ textAlign: "center" }}>
										Users &nbsp;
										<Button
											style={{ float: "right", marginTop: "1%" }}
											type="link"
											onClick={() => loadUsers(error)}
											icon={<SyncOutlined />}
										/>
									</h1>
								</Fragment>
							)}
							columns={columns}
							dataSource={users}
						/>
					) : (
						<UpdateUser user={editUser} setEditView={setEditView} />
					)}
				</Wrapper>
			</Container>
		</React.Fragment>
	);
}

export default AdminDashboard;
