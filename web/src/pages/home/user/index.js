import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import ViewData from "./view";
import { UpdateDetails, UpdateEmail, UpdatePassword } from "./update";

import { signOutUserThunk } from "@slices/auth";
import { removeUserAction } from "@slices/user";

function UserData(props) {
	const { userinfo } = props;
	const dispatch = useDispatch();
	const [editable, setEditable] = useState(false);
	const [editDetails, setEditDetails] = useState(false);
	const [editEmail, setEditEmail] = useState(false);
	const [editPassword, setEditPassword] = useState(false);

	const signOutAndRemove = () => {
		dispatch(removeUserAction());
		dispatch(signOutUserThunk());
	};

	const showEditView = () => {
		setEditable(true);
	};
	const hideEditView = () => {
		setEditable(false);
	};

	const showDetailsForm = () => {
		setEditDetails(true);
	};
	const hideDetailsForm = () => {
		setEditDetails(false);
	};

	const showEmailForm = () => {
		setEditEmail(true);
	};
	const hideEmailForm = () => {
		setEditEmail(false);
	};

	const showPaswordForm = () => {
		setEditPassword(true);
	};
	const hidePasswordForm = () => {
		setEditPassword(false);
	};

	const EditData = () => {
		if (editDetails)
			return (
				<React.Fragment>
					<UpdateDetails
						user={userinfo}
						hideDetailsForm={hideDetailsForm}
						hideEditView={hideEditView}
					/>
				</React.Fragment>
			);
		else if (editEmail)
			return (
				<React.Fragment>
					<UpdateEmail
						user={userinfo}
						hideEmailForm={hideEmailForm}
						hideEditView={hideEditView}
					/>
				</React.Fragment>
			);
		else if (editPassword)
			return (
				<React.Fragment>
					<UpdatePassword
						user={userinfo}
						hidePasswordForm={hidePasswordForm}
						hideEditView={hideEditView}
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
				<ViewData
					user={userinfo}
					signOutAndRemove={signOutAndRemove}
					showEditView={showEditView}
					showDetailsForm={showDetailsForm}
					showEmailForm={showEmailForm}
					showPaswordForm={showPaswordForm}
				/>
			)}
		</div>
	);
}

UserData.propTypes = {
	userinfo: PropTypes.object.isRequired
};

export default UserData;
