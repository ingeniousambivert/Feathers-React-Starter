import React, { useEffect } from "react";
import { Table, Button, Space } from "antd";
import { EditOutlined, PoweroffOutlined } from "@ant-design/icons";
import Container from "@containers";
import { Wrapper, ErrorAlert } from "@components";
import { useSelector, useDispatch } from "react-redux";
import { loadUsersThunk, selectUsers, selectAdminError } from "@slices/admin";
import { removeUserAction } from "@slices/user";
import { signOutUserThunk } from "@slices/auth";

function AdminDashboard() {
	const dispatch = useDispatch();
	const error = useSelector(selectAdminError);
	const users = useSelector(selectUsers);

	const loadUsers = async (error) => {
		await dispatch(loadUsersThunk());

		if (error) {
			ErrorAlert("Failed to load user data", error);
			dispatch(removeUserAction());
			dispatch(signOutUserThunk());
		}
	};

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			align: "center",
			// eslint-disable-next-line
			render: (text) => <a>{text}</a>
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
			dataIndex: "lastLoggedIn",
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

	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
		},
		getCheckboxProps: (record) => ({
			name: record.name
		})
	};
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
						rowSelection={{
							type: "checkbox",
							...rowSelection
						}}
						columns={columns}
						dataSource={users}
					/>
				</Wrapper>
			</Container>
		</React.Fragment>
	);
}

export default AdminDashboard;
