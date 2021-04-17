import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Space } from "antd";
import { EditOutlined, PoweroffOutlined } from "@ant-design/icons";
import Container from "@containers";
import { Wrapper, ErrorAlert } from "@components";
import { useSelector, useDispatch } from "react-redux";
import { loadUsersThunk, selectUsers, selectAdminError } from "@slices/admin";
import { loadUserThunk, removeUserAction } from "@slices/user";
import { signOutUserThunk } from "@slices/auth";

function AdminDashboard() {
	const dispatch = useDispatch();
	const error = useSelector(selectAdminError);
	const users = useSelector(selectUsers);

	const removeUser = () => {
		dispatch(removeUserAction());
		dispatch(signOutUserThunk());
	};

	const loadUser = async (userID, error) => {
		await dispatch(loadUserThunk(userID));

		if (error) {
			ErrorAlert("Failed to load user data", error);
			console.log(error);
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

	const columns = [
		{
			title: "Name",
			align: "center",
			// eslint-disable-next-line
			render: (record) => {
				return (
					<Fragment>
						<Link to="/home" onClick={() => loadUser(record._id, error)}>
							{record.name}
						</Link>
					</Fragment>
				);
			}
		},
		{
			title: "Email",
			dataIndex: "email",
			align: "center"
		},
		{
			title: "Permissions",
			dataIndex: "permissions",
			align: "center"
		},
		{
			title: "Last Login",
			dataIndex: "lastLogIn",
			align: "center"
		},
		{
			title: "Created At",
			dataIndex: "createdAt",
			align: "center"
		},
		{
			title: "Action",
			key: "action",
			align: "center",
			// eslint-disable-next-line
			render: (record) => (<Space size="middle">
					<Button
						type="link"
						onClick={() => console.log(record)}
						icon={<EditOutlined />}
					/>
					<Button
						danger
						type="link"
						onClick={() => console.log(record)}
						icon={<PoweroffOutlined />}
					/>
				</Space>
			)
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
					<Table
						bordered
						title={() => <h1 style={{ textAlign: "center" }}>Users</h1>}
						columns={columns}
						dataSource={users}
					/>
				</Wrapper>
			</Container>
		</React.Fragment>
	);
}

export default AdminDashboard;
