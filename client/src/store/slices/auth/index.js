import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";

import feathersClient from "@client";

export const signUpUserThunk = createAsyncThunk("auth/signUpUser", async (data) => {
	const result = await feathersClient.service("users").create(data);
	return result;
});

const signUpReducers = {
	[signUpUserThunk.pending]: (state) => {
		state.loading = true;
		state.error = false;
		state.userID = null;
	},
	[signUpUserThunk.rejected]: (state, action) => {
		state.loading = false;
		state.error = action.error.message;
		state.userID = null;
	},
	[signUpUserThunk.fulfilled]: (state, action) => {
		state.loading = false;
		state.error = false;
		state.userID = action.payload._id;
	}
};

export const signInUserThunk = createAsyncThunk("auth/signInUser", async (data) => {
	if (!data) {
		await feathersClient.reAuthenticate();

		const { user, accessToken } = await feathersClient.get("authentication");
		return { user, accessToken };
	} else {
		await feathersClient.authenticate({
			strategy: "local",
			...data
		});

		const { user, accessToken } = await feathersClient.get("authentication");
		return { user, accessToken };
	}
});

const signInReducers = {
	[signInUserThunk.pending]: (state) => {
		state.loading = true;
		state.error = false;
		state.userID = null;
		state.token = null;
	},
	[signInUserThunk.rejected]: (state, action) => {
		state.loading = false;
		state.error = action.error.message;
		state.userID = null;
		state.token = null;
	},
	[signInUserThunk.fulfilled]: (state, action) => {
		state.loading = false;
		state.error = false;
		state.userID = action.payload.user._id;
		state.token = action.payload.accessToken;
	}
};

export const signOutUserThunk = createAsyncThunk("auth/signOutUser", async () => {
	await feathersClient.logout();
});

const signOutReducers = {
	[signOutUserThunk.pending]: (state) => {
		state.loading = true;
		state.error = false;
		state.userID = null;
		state.token = null;
	},
	[signOutUserThunk.rejected]: (state, action) => {
		state.loading = false;
		state.error = action.error.message;
		state.userID = null;
		state.token = null;
	},
	[signOutUserThunk.fulfilled]: (state) => {
		state.loading = false;
		state.error = false;
		state.userID = null;
		state.token = null;
	}
};

export const verifyAccountThunk = createAsyncThunk("auth/verifyAccount", async (token) => {
	const result = await feathersClient.service("authmanagement").create({
		action: "verifySignupLong",
		value: token
	});
	return result;
});

const verifyAccountReducers = {
	[verifyAccountThunk.pending]: (state) => {
		state.loading = true;
		state.error = false;
	},
	[verifyAccountThunk.rejected]: (state, action) => {
		state.loading = false;
		state.error = action.error.message;
	},
	[verifyAccountThunk.fulfilled]: (state) => {
		state.loading = false;
		state.error = false;
	}
};

export const forgotPasswordThunk = createAsyncThunk("auth/forgotPassword", async (email) => {
	await feathersClient.service("authmanagement").create({
		action: "sendResetPwd",
		value: { email }
	});
});

const forgotPasswordReducers = {
	[forgotPasswordThunk.pending]: (state) => {
		state.loading = true;
		state.error = false;
	},
	[forgotPasswordThunk.rejected]: (state, action) => {
		state.loading = false;
		state.error = action.error.message;
	},
	[forgotPasswordThunk.fulfilled]: (state) => {
		state.loading = false;
		state.error = false;
	}
};

export const resetPasswordThunk = createAsyncThunk("auth/resetPassword", async (data) => {
	const { token, password } = data;
	await feathersClient.service("authmanagement").create({
		action: "resetPwdLong",
		value: { token, password }
	});
});

const resetPasswordReducers = {
	[resetPasswordThunk.pending]: (state) => {
		state.loading = true;
		state.error = false;
	},
	[resetPasswordThunk.rejected]: (state, action) => {
		state.loading = false;
		state.error = action.error.message;
	},
	[resetPasswordThunk.fulfilled]: (state) => {
		state.loading = false;
		state.error = false;
	}
};

export const updateEmailThunk = createAsyncThunk(
	"auth/updateEmail",
	async ({ currentEmail, password, updatedEmail }) => {
		await feathersClient.service("authmanagement").create({
			action: "identityChange",
			value: {
				user: { email: currentEmail },
				password,
				changes: { email: updatedEmail }
			}
		});
	}
);

const updateEmailReducers = {
	[updateEmailThunk.pending]: (state) => {
		state.loading = true;
		state.error = false;
	},
	[updateEmailThunk.rejected]: (state, action) => {
		state.loading = false;
		state.error = action.error.message;
	},
	[updateEmailThunk.fulfilled]: (state) => {
		state.loading = false;
		state.error = false;
	}
};

export const updatePasswordThunk = createAsyncThunk(
	"auth/updatePassword",
	async ({ email, password, oldPassword }) => {
		await feathersClient.service("authmanagement").create({
			action: "passwordChange",
			value: {
				user: { email },
				oldPassword,
				password
			}
		});
	}
);

const updatePasswordReducers = {
	[updatePasswordThunk.pending]: (state) => {
		state.loading = true;
		state.error = false;
	},
	[updatePasswordThunk.rejected]: (state, action) => {
		state.loading = false;
		state.error = action.error.message;
	},
	[updatePasswordThunk.fulfilled]: (state) => {
		state.loading = false;
		state.error = false;
	}
};

const authSlice = createSlice({
	name: "auth",
	initialState: {
		userID: null,
		token: null,
		loading: null,
		error: null
	},
	reducers: {},
	extraReducers: {
		...signUpReducers,
		...signInReducers,
		...signOutReducers,
		...verifyAccountReducers,
		...forgotPasswordReducers,
		...resetPasswordReducers,
		...updateEmailReducers,
		...updatePasswordReducers
	}
});

export const selectAuthError = createSelector(
	(state) => state.auth.error,
	(error) => {
		if (error !== null) return error;
	}
);

export const selectLoading = createSelector(
	(state) => state.auth.loading,
	(loading) => {
		if (loading !== null) return loading;
	}
);

export const selectUserID = createSelector(
	(state) => state.auth.userID,
	(userID) => {
		if (userID !== null) return userID;
	}
);

export const selectIsAuthenticated = createSelector(
	(state) => state.auth.userID,
	(state) => state.auth.token,
	(userID, token) => {
		if (userID !== null && token !== null) return true;
		else return false;
	}
);

export default authSlice.reducer;
