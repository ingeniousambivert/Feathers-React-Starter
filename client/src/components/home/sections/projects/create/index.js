/* eslint-disable react/prop-types */
import React, { useState, Fragment } from "react";
import { Steps, Button, message, Result, Row, Col } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "@slices/user";
import { removeProjectDataAction } from "@slices/project";
import Wrapper from "@components/wrapper";
import { FirstForm, SecondForm, ThirdForm } from "./stepForms";

const { Step } = Steps;

const CreateProject = (props) => {
	const { cancel, created } = props;
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	let [current, setCurrent] = useState(0);
	let [completed, setCompleted] = useState(false);

	const viewProjects = () => {
		created();
		dispatch(removeProjectDataAction());
	};
	const next = () => {
		setCurrent(++current);
	};
	const prev = () => {
		setCurrent(--current);
	};

	const create = () => {
		setCompleted(true);
	};

	const steps = [
		{
			title: "What's your idea ?",
			content: <FirstForm next={next} user={user} cancel={cancel} />
		},
		{
			title: "Tell us more",
			content: <SecondForm next={next} prev={prev} />
		},
		{
			title: "Start working",
			content: <ThirdForm prev={prev} create={create} />
		}
	];

	const stepsForm = () => {
		return (
			<div>
				<Steps current={current}>
					{steps.map((item) => (
						<Step key={item.title} title={item.title} />
					))}
				</Steps>
				<div className="steps-content">{steps[current].content}</div>
			</div>
		);
	};

	const ctaButtons = () => {
		return (
			<Fragment key={1}>
				<Row gutter={[16, 16]} align="middle" justify="center">
					<Col>
						<Link to={"/project/dashboard"}>
							<Button type="primary">Goto Dashboard</Button>
						</Link>
					</Col>
				</Row>
				<Row gutter={[16, 16]} align="middle" justify="center">
					<Col>
						<Button onClick={viewProjects}>View Projects</Button>
					</Col>
				</Row>
			</Fragment>
		);
	};

	return (
		<Wrapper>
			{!user.isVerified ? (
				<Result
					status="warning"
					title="Unverified User"
					subTitle="Please verify your account to create a project"
					extra={
						<Button
							type="primary"
							onClick={() => {
								message.info("Verification E-mail sent");
							}}>
							Verify Now
						</Button>
					}
				/>
			) : !completed ? (
				stepsForm()
			) : (
				<Result
					status="success"
					title="Successfully created a new project !"
					subTitle="Manage the project in a uniquely customized dashboard."
					extra={[ctaButtons()]}
				/>
			)}
		</Wrapper>
	);
};

export default CreateProject;
