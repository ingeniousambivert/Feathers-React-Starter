import React from "react";
import ViewDataContainer from "@containers/view";
import { InfoAlert, ErrorAlert } from "@components";
import { useDispatch, useSelector } from "react-redux";
import { resendConfirmationThunk, selectAuthError } from "@slices/auth";
import PropTypes from "prop-types";

function ViewData(props) {
	const {
		user,
		showEditView,
		showDetailsForm,
		showEmailForm,
		showPaswordForm,
		signOutAndRemove
	} = props;
	const dispatch = useDispatch();
	const error = useSelector(selectAuthError);

	const editDetailsView = () => {
		showDetailsForm();
		showEditView();
	};
	const editEmailView = () => {
		showEmailForm();
		showEditView();
	};
	const editPasswordView = () => {
		showPaswordForm();
		showEditView();
	};

	const resendConfirmation = async (data) => {
		await dispatch(resendConfirmationThunk(data));
		if (error) ErrorAlert(error);
		else InfoAlert("Resent account verification e-mail");
	};

	return (
		<ViewDataContainer
			user={user}
			resendConfirmation={resendConfirmation}
			editPasswordView={editPasswordView}
			editEmailView={editEmailView}
			editDetailsView={editDetailsView}
			signOutAndRemove={signOutAndRemove}
		/>
	);
}

ViewData.propTypes = {
	user: PropTypes.object.isRequired,
	showEditView: PropTypes.func.isRequired,
	showDetailsForm: PropTypes.func.isRequired,
	showEmailForm: PropTypes.func.isRequired,
	showPaswordForm: PropTypes.func.isRequired,
	signOutAndRemove: PropTypes.func.isRequired
};

export default ViewData;
