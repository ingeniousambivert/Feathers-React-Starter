import React, { useState, Fragment, useEffect } from "react";
import {
	Row,
	Col,
	Form,
	Input,
	Popconfirm,
	Typography,
	Select,
	Checkbox,
	Button,
	message
} from "antd";
import PropTypes from "prop-types";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import Wrapper from "@components/wrapper";
import {
	addProjectDataAction,
	selectProjectData,
	removeProjectDataAction,
	createProjectThunk,
	selectError
} from "@slices/project";
import { useDispatch, useSelector } from "react-redux";

const { TextArea } = Input;
const { Text } = Typography;
const { Option } = Select;

const FirstForm = (props) => {
	const dispatch = useDispatch();
	const projectData = useSelector(selectProjectData);
	const [addDescription, setAddDescription] = useState(false);
	const [form] = Form.useForm();
	const { user, cancel, next } = props;
	const name = `${user.firstname} ${user.lastname}`;

	const cancelAndRemove = () => {
		cancel();
		dispatch(removeProjectDataAction());
	};
	const onFinish = (data) => {
		dispatch(addProjectDataAction({ ...data, ownerID: user._id, owner: name }));
		next();
	};

	const onFinishFailed = (error) => {
		console.error("Failed : ", error);
	};

	const onChangeDesc = (e) => {
		setAddDescription(e.target.checked);
	};
	const text = "Are you sure ?";

	useEffect(() => {
		form.setFieldsValue({
			title: projectData.title,
			description: projectData.description
		});
	}, [projectData]);

	return (
		<Wrapper>
			<Text strong>Add basic details</Text>
			<Wrapper>
				<Form
					form={form}
					layout="vertical"
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					hideRequiredMark
					name="project_form">
					<Row justify="space-around" align="middle">
						<Col xs={22} sm={20} md={18} lg={18} xl={12}>
							<Form.Item
								name="title"
								rules={[
									{
										required: true,
										message: "Please input a title"
									}
								]}>
								<Input placeholder="Project Title" allowClear />
							</Form.Item>
						</Col>
					</Row>
					{addDescription ? (
						<Row justify="space-around" align="middle">
							<Col xs={22} sm={20} md={18} lg={18} xl={12}>
								<Form.Item
									name="description"
									rules={[
										{
											required: true,
											message: "Please input a description"
										}
									]}>
									<TextArea
										allowClear
										placeholder="Project Desciption"
										autoSize={{ minRows: 2, maxRows: 6 }}
									/>
								</Form.Item>
							</Col>
						</Row>
					) : null}

					<Row justify="space-around" align="middle" style={{ marginTop: "1%" }}>
						<Col xs={22} sm={20} md={18} lg={16} xl={12}>
							<Checkbox onChange={onChangeDesc}>Add a description</Checkbox>
						</Col>
					</Row>
					<Row gutter={[16, 24]} justify="end" align="middle" style={{ marginTop: "5%" }}>
						<Col>
							<Form.Item>
								<Popconfirm
									placement="bottom"
									title={text}
									onConfirm={cancelAndRemove}
									okText="Yes"
									cancelText="No">
									<Button danger>Cancel</Button>
								</Popconfirm>
							</Form.Item>
						</Col>
						<Col>
							<Form.Item>
								<Button type="primary" htmlType="submit">
									Next
								</Button>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Wrapper>
		</Wrapper>
	);
};

const SecondForm = (props) => {
	const dispatch = useDispatch();
	const projectData = useSelector(selectProjectData);
	const { prev, next } = props;
	const [form] = Form.useForm();

	const onFinish = (data) => {
		dispatch(addProjectDataAction({ ...data }));
		next();
	};

	const onFinishFailed = (error) => {
		console.error("Failed : ", error);
	};

	const nichesArray = [
		{ id: 1, niche: "IT & Engineering" },
		{ id: 2, niche: "Marketing & Sales" },
		{ id: 3, niche: "Product & Design" },
		{ id: 4, niche: "Production & Inventory" },
		{ id: 5, niche: "Customer Service & HR" },
		{ id: 6, niche: "Generic Project" }
	];

	const renderNiches = nichesArray.map((option) => (
		<Option value={option.niche} key={option.id}>
			{option.niche}
		</Option>
	));

	useEffect(() => {
		form.setFieldsValue({
			niche: projectData.niche
		});
	}, [projectData]);

	return (
		<Wrapper>
			<Text strong>Add your niche</Text>
			<Wrapper margin="3.25%">
				<Form
					form={form}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					layout="vertical"
					hideRequiredMark
					name="project_form">
					<Row gutter={[16, 24]} justify="space-around" align="middle">
						<Col xs={22} sm={20} md={18} lg={16} xl={13}>
							<Form.Item
								name="niche"
								rules={[
									{
										required: true,
										message: "Please choose a niche"
									}
								]}>
								<Select
									name="niche"
									style={{ width: "100%" }}
									placeholder="Choose your niche">
									{renderNiches}
								</Select>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={[16, 24]} justify="end" align="middle" style={{ marginTop: "5%" }}>
						<Col>
							<Form.Item>
								<Button onClick={prev}>Previous</Button>
							</Form.Item>
						</Col>
						<Col>
							<Form.Item>
								<Button type="primary" htmlType="submit">
									Next
								</Button>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Wrapper>
		</Wrapper>
	);
};

const ThirdForm = (props) => {
	const dispatch = useDispatch();
	const projectData = useSelector(selectProjectData);
	const error = useSelector(selectError);
	const { prev, create } = props;
	const [form] = Form.useForm();
	const [inviteLater, setInviteLater] = useState(false);
	const [disableAdd, setDisableAdd] = useState(false);
	let [members, setMembers] = useState(0);

	const onFinish = (data) => {
		if (!inviteLater) {
			message.error("Please add a member to invite");
		} else {
			(async (data, projectData, error) => {
				await dispatch(addProjectDataAction(data));
				await dispatch(createProjectThunk(projectData)).then(() => {
					if (error) {
						console.error(error);
						message.error("Failed to create the project");
					}
				});
			})(data, projectData, error);
			create();
		}
	};

	const disableAddButton = () => {
		if (inviteLater && members === 0) {
			setDisableAdd(true);
		} else setDisableAdd(false);
	};

	const onFinishFailed = (error) => {
		console.error("Failed : ", error);
	};

	const onChangeInvite = (e) => {
		setInviteLater(e.target.checked);
		disableAddButton();
	};

	useEffect(() => {
		// form.setFieldsValue({
		// 	members: projectData.members,
		// });
		disableAddButton();
		members > 0 && setInviteLater(true);
	}, [disableAdd, inviteLater, members, projectData]);

	return (
		<Wrapper>
			<Text strong>Add people to your project</Text>
			<Wrapper>
				<Form
					form={form}
					layout="vertical"
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					hideRequiredMark
					name="project_form">
					<Row justify="space-around" align="middle">
						<Fragment>
							<Col xs={22} sm={20} md={18} lg={16} xl={13}>
								<Form.List name="members">
									{(fields, { add, remove }) => {
										return (
											<div>
												{fields.map((field) => (
													<Row
														gutter={24}
														justify="center"
														key={field.fieldKey}>
														<Col xs={20} md={22}>
															<Form.Item
																{...field}
																name={[field.name, "email"]}
																fieldKey={[field.fieldKey, "email"]}
																rules={[
																	{
																		required: true,
																		message:
																			"Please input an Email"
																	},
																	{
																		type: "email",
																		message:
																			"Please input a valid Email"
																	}
																]}>
																<Input
																	allowClear
																	placeholder="Email"
																/>
															</Form.Item>
														</Col>
														<Col xs={2} md={2}>
															<Form.Item>
																<Button
																	shape="circle"
																	icon={<MinusOutlined />}
																	size="small"
																	onClick={() => {
																		remove(field.name);
																		setMembers(--members);
																	}}
																/>
															</Form.Item>
														</Col>
													</Row>
												))}

												<Form.Item>
													<Button
														disabled={disableAdd}
														block
														onClick={() => {
															add();
															setMembers(++members);
														}}>
														<PlusOutlined /> Add Member
													</Button>
												</Form.Item>
											</div>
										);
									}}
								</Form.List>
							</Col>
						</Fragment>
					</Row>
					{members === 0 ? (
						<Row justify="space-around" align="middle">
							<Col xs={22} sm={20} md={18} lg={16} xl={13}>
								<Checkbox onChange={onChangeInvite}>
									Invite team members later
								</Checkbox>
							</Col>
						</Row>
					) : null}
					<Row gutter={[16, 24]} justify="end" align="middle" style={{ marginTop: "5%" }}>
						<Col>
							<Form.Item>
								<Button onClick={prev}>Previous</Button>
							</Form.Item>
						</Col>
						<Col>
							<Form.Item>
								<Button type="primary" htmlType="submit">
									Create
								</Button>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Wrapper>
		</Wrapper>
	);
};

FirstForm.propTypes = {
	user: PropTypes.object.isRequired,
	cancel: PropTypes.func.isRequired,
	next: PropTypes.func.isRequired
};

SecondForm.propTypes = {
	prev: PropTypes.func.isRequired,
	next: PropTypes.func.isRequired
};

ThirdForm.propTypes = {
	prev: PropTypes.object.isRequired,
	create: PropTypes.func.isRequired
};

export { FirstForm, SecondForm, ThirdForm };
