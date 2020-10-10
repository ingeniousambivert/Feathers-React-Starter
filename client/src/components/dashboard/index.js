import React, { useEffect } from "react";
import { message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { loadProjectThunk, selectProjectData, selectError } from "@slices/project";
import { removeUserAction } from "@slices/user";
import { signOutUserThunk } from "@slices/auth";
import { useLocation, useHistory } from "react-router-dom";
import SiderContainer from "@components/sider";
import Overview from "./sections/overview";

import { Spinner } from "@utils";

function DashboardComponent() {
	const dispatch = useDispatch();
	const error = useSelector(selectError);
	const project = useSelector(selectProjectData);
	let location = useLocation();
	let history = useHistory();

	const loadProject = async (id, error) => {
		await dispatch(loadProjectThunk(id)).then(() => {
			if (error) {
				dispatch(removeUserAction());
				dispatch(signOutUserThunk());
				message.error("Failed to load project data", error);
			}
		});
	};

	useEffect(() => {
		if (location.state) {
			loadProject(location.state.id, error);
		} else {
			history.push("/home");
			message.info("Please select a project");
		}
	}, [error]);

	return (
		<React.Fragment>
			{project !== null ? (
				<SiderContainer title={project.title} owner={project.owner}>
					<Overview />
				</SiderContainer>
			) : (
				<Spinner />
			)}
		</React.Fragment>
	);
}

export default DashboardComponent;
