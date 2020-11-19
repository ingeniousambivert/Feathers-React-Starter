import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import feathersClient from "@client";

export const loadUserThunk = createAsyncThunk("user/loadUser", async (id) => {
	const user = await feathersClient.service("users").get(id);
	return { user };
});

const loadUserReducer = {
	[loadUserThunk.pending]: (state) => {
		state.loading = true;
		state.error = false;
		state.user = null;
	},
	[loadUserThunk.rejected]: (state, action) => {
		state.loading = false;
		state.error = action.error.message;
		state.user = null;
	},
	[loadUserThunk.fulfilled]: (state, action) => {
		state.loading = false;
		state.error = false;
		state.user = action.payload.user;
	}
};

export const updateUserThunk = createAsyncThunk("user/updateUser", async (data) => {
	const { _id, updatedData } = data;
	const user = await feathersClient.service("users").patch(_id, updatedData);
	return { user };
});

const updateUserReducer = {
	[updateUserThunk.pending]: (state) => {
		state.loading = true;
		state.error = false;
	},
	[updateUserThunk.rejected]: (state, action) => {
		state.loading = false;
		state.error = action.error.message;
	},
	[updateUserThunk.fulfilled]: (state, action) => {
		state.loading = false;
		state.error = false;
		state.user = action.payload.user;
	}
};

const userSlice = createSlice({
	name: "user",
	initialState: {
		loading: null,
		error: null,
		user: null
	},
	reducers: {
		removeUser: (state) => {
			state.user = null;
		}
	},
	extraReducers: { ...loadUserReducer, ...updateUserReducer }
});

export const selectUserError = createSelector(
	(state) => state.user.error,
	(error) => {
		if (error !== null) return error;
	}
);

export const selectUser = createSelector(
	(state) => state.user.user,
	(user) => {
		if (user !== null) return user;
	}
);

export const { removeUser: removeUserAction } = userSlice.actions;

export default userSlice.reducer;
