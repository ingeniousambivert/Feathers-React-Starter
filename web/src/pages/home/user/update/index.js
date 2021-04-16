import React, { useEffect, useState } from "react";
import UpdateEmailContainer from "@containers/update/email";
import UpdateDetailsContainer from "@containers/update/details";
import UpdatePasswordContainer from "@containers/update/password";
import { Form } from "antd";
import { ErrorAlert, SuccessAlert } from "@components";
import { useDispatch, useSelector } from "react-redux";
import { updateUserThunk, removeUserAction, selectUserError, setUserAction } from "@slices/user";
import {
	updateEmailThunk,
	updatePasswordThunk,
	signOutUserThunk,
	selectAuthError
} from "@slices/auth";

import PropTypes from "prop-types";

const UpdateDetails = (props) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const error = useSelector(selectUserError);
	const { hideDetailsForm, hideEditView, user } = props;
	const [loading, setLoading] = useState(false);

	const closeUpdateView = () => {
		hideDetailsForm();
		hideEditView();
	};

	const onFinish = async (updatedData) => {
		setLoading(true);
		const { _id } = user;
		await dispatch(updateUserThunk({ _id, updatedData }));

		if (error) {
			console.error(error);
			ErrorAlert("Failed to update your details. Please try again later.");
		} else {
			closeUpdateView();
			SuccessAlert("Successfully updated your details");
		}
		setLoading(false);
	};

	const onFinishFailed = (error) => {
		console.error("Failed : ", error);
	};

	const setFieldsValue = (user) => {
		form.setFieldsValue({
			firstname: user.firstname,
			lastname: user.lastname
		});
	};

	useEffect(() => {
		if (user) {
			setFieldsValue(user);
		}
		// eslint-disable-next-line
	}, [user]);

	return (
		<UpdateDetailsContainer
			form={form}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			closeUpdateView={closeUpdateView}
			loading={loading}
		/>
	);
};

const UpdateEmail = (props) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const error = useSelector(selectAuthError);
	const { hideEmailForm, hideEditView, user } = props;
	const [loading, setLoading] = useState(false);
	const currentEmail = user.email;
	const { _id } = user;

	const closeUpdateView = () => {
		hideEmailForm();
		hideEditView();
	};

	const onFinish = async (updatedData) => {
		setLoading(true);
		updatedData.currentEmail = currentEmail;
		updatedData._id = _id;

		const actionResult = await dispatch(updateEmailThunk(updatedData));
		if (error) {
			if (error.includes("incorrect") || error.includes("not valid")) {
				ErrorAlert("Failed to update your email. Invalid password", 10);
			} else {
				console.error(error);
				ErrorAlert("Failed to update your email. Please try again later.", 10);
			}
		} else {
			dispatch(setUserAction(actionResult.payload));
			closeUpdateView();
			SuccessAlert("Successfully updated your email");
		}
		setLoading(false);
	};

	const onFinishFailed = (error) => {
		console.error("Failed : ", error);
	};

	return (
		<UpdateEmailContainer
			form={form}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			closeUpdateView={closeUpdateView}
			loading={loading}
		/>
	);
};

const UpdatePassword = (props) => {
	const [form] = Form.useForm();
	const { hidePasswordForm, hideEditView, user } = props;
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const error = useSelector(selectAuthError);

	const closeUpdateView = () => {
		hidePasswordForm();
		hideEditView();
	};

	const onFinish = async (updatedData) => {
		setLoading(true);
		const { password, oldPassword } = updatedData;
		const { email } = user;

		await dispatch(updatePasswordThunk({ email, password, oldPassword }));
		if (error) {
			console.error(error);
			ErrorAlert("Failed to update your password. Please try again later", 10);
		} else {
			closeUpdateView();
			SuccessAlert(
				"Successfully updated your password. Please sign in again with the updated password"
			);
			dispatch(removeUserAction());
			dispatch(signOutUserThunk());
		}

		setLoading(false);
	};
	const onFinishFailed = (error) => {
		console.error("Failed : ", error);
	};

	return (
		<UpdatePasswordContainer
			form={form}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			closeUpdateView={closeUpdateView}
			loading={loading}
		/>
	);
};

UpdateDetails.propTypes = {
	user: PropTypes.object.isRequired,
	hideDetailsForm: PropTypes.func.isRequired,
	hideEditView: PropTypes.func.isRequired
};

UpdateEmail.propTypes = {
	user: PropTypes.object.isRequired,
	hideEmailForm: PropTypes.func.isRequired,
	hideEditView: PropTypes.func.isRequired
};

UpdatePassword.propTypes = {
	user: PropTypes.object.isRequired,
	hidePasswordForm: PropTypes.func.isRequired,
	hideEditView: PropTypes.func.isRequired
};

export { UpdateDetails, UpdateEmail, UpdatePassword };
