import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Data from "./partials/data";
import { UpdateDetails, UpdatePassword } from "./partials/update";

import { signOutUserThunk } from "@slices/auth";
import { removeUserAction } from "@slices/user";

function User(props) {
	const dispatch = useDispatch();
	const [editable, setEditable] = useState(false);
	const [editDetails, setEditDetails] = useState(false);
	const [editPassword, setEditPassword] = useState(false);

	const signOutAndRemove = () => {
		dispatch(removeUserAction());
		dispatch(signOutUserThunk());
	};

	const editView = () => {
		setEditable(true);
	};
	const updateView = () => {
		setEditable(false);
	};

	const editDetailsForm = () => {
		setEditDetails(true);
	};
	const updateDetailsForm = () => {
		setEditDetails(false);
	};

	const editPasswordForm = () => {
		setEditPassword(true);
	};
	const updatePasswordForm = () => {
		setEditPassword(false);
	};

	const EditData = () => {
		if (editDetails)
			return (
				<React.Fragment>
					<UpdateDetails
						user={props.userinfo}
						updateDetailsForm={updateDetailsForm}
						updateView={updateView}
					/>
				</React.Fragment>
			);
		else if (editPassword)
			return (
				<React.Fragment>
					<UpdatePassword
						user={props.userinfo}
						updatePasswordForm={updatePasswordForm}
						updateView={updateView}
					/>
				</React.Fragment>
			);
		else return null;
	};

	return (
		<div style={{ marginTop: "2%" }}>
			{editable ? (
				EditData()
			) : (
				<Data
					user={props.userinfo}
					signOutAndRemove={signOutAndRemove}
					editView={editView}
					editDetailsForm={editDetailsForm}
					editPasswordForm={editPasswordForm}
				/>
			)}
		</div>
	);
}

User.propTypes = {
	userinfo: PropTypes.object.isRequired
};

export default User;
