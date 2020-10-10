import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";

import feathersClient from "@client";

export const signUpUserThunk = createAsyncThunk("auth/signUpUser", async (data) => {
	try {
		const result = await feathersClient.service("users").create(data);
		return result;
	} catch (error) {
		throw Error(error);
	}
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
		await feathersClient.reAuthenticate().catch((error) => {
			throw Error(error);
		});
		const { user, accessToken } = await feathersClient.get("authentication");
		return { user, accessToken };
	} else {
		try {
			await feathersClient.authenticate({
				strategy: "local",
				...data
			});
		} catch (error) {
			throw Error(error);
		}
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
	await feathersClient.logout().catch((error) => {
		throw Error(error);
	});
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

const authSlice = createSlice({
	name: "auth",
	initialState: {
		userID: null,
		token: null,
		loading: null,
		error: null
	},
	reducers: {},
	extraReducers: { ...signUpReducers, ...signInReducers, ...signOutReducers }
});

export const selectError = createSelector(
	(state) => state.auth.error,
	(error) => {
		if (error !== null) return error;
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
