import React, { useState, useEffect } from "react";
import { Button, Empty, Typography, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "@utils";
import PropTypes from "prop-types";
import { loadProjectsThunk, selectProjects, selectError } from "@slices/projects";
import CreateProject from "./create";
import ShowProjects from "./partials/data";

const { Text } = Typography;

function CreateButton(props) {
	const { create } = props;
	return (
		<div style={{ marginTop: "2%" }}>
			<Empty
				imageStyle={{
					height: 100,
					alignContent: "center",
					margin: "0 auto"
				}}
				description={<Text>No Projects Created</Text>}>
				<Button type="primary" onClick={create}>
					Create Now
				</Button>
			</Empty>
		</div>
	);
}

function Projects(props) {
	const dispatch = useDispatch();
	const [showCreate, setShowCreate] = useState(false);

	const { userinfo } = props;
	const { _id } = userinfo;

	const loadProjects = async (userID, error) => {
		await dispatch(loadProjectsThunk(userID)).then(() => {
			if (error) {
				console.error(error);
				message.error("Failed to load projects", error);
			}
		});
	};

	const projects = useSelector(selectProjects);
	const error = useSelector(selectError);

	useEffect(() => {
		loadProjects(_id, error);
	}, [showCreate]);

	const create = () => {
		setShowCreate(true);
	};

	const complete = () => {
		setShowCreate(false);
	};
	const cancel = () => {
		setShowCreate(false);
	};

	return (
		<React.Fragment>
			{showCreate ? (
				<CreateProject cancel={cancel} created={complete} />
			) : (
				<React.Fragment>
					{projects ? (
						<React.Fragment>
							{projects.total > 0 ? (
								<ShowProjects projects={projects} create={create} />
							) : (
								<CreateButton create={create} />
							)}
						</React.Fragment>
					) : (
						<Spinner loadingtext="Loading Projects..." />
					)}
				</React.Fragment>
			)}
		</React.Fragment>
	);
}

Projects.propTypes = {
	userinfo: PropTypes.object.isRequired
};
CreateButton.propTypes = {
	create: PropTypes.func.isRequired
};

export default Projects;
