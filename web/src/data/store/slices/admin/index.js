import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import feathersClient from "@client";
import { transformAdminTable } from "@utils";

export const loadUsersThunk = createAsyncThunk("admin/loadUsers", async () => {
	const users = await feathersClient.service("users").find();
	return users;
});

const loadUsersReducer = {
	[loadUsersThunk.pending]: (state) => {
		state.loading = true;
		state.error = false;
		state.data = null;
		state.users = null;
		state.user = null;
	},
	[loadUsersThunk.rejected]: (state, action) => {
		state.loading = false;
		state.error = action.error.message;
		state.data = null;
		state.users = null;
		state.user = null;
	},
	[loadUsersThunk.fulfilled]: (state, action) => {
		state.loading = false;
		state.error = false;
		state.data = action.payload;
		state.users = action.payload.data;
	}
};

const adminSlice = createSlice({
	name: "admin",
	initialState: {
		loading: null,
		error: null,
		data: null,
		users: null,
		user: null
	},
	reducers: {
		removeUser: (state) => {
			state.user = null;
		},
		setUser: (state, action) => {
			state.user = action.payload;
		}
	},
	extraReducers: { ...loadUsersReducer }
});

export const selectAdminError = createSelector(
	(state) => state.admin.error,
	(error) => {
		if (error !== null) return error;
	}
);

export const selectUser = createSelector(
	(state) => state.admin.user,
	(user) => {
		if (user !== null) return user;
	}
);

export const selectUsers = createSelector(
	(state) => state.admin.users,
	(users) => {
		if (users !== null) {
			return transformAdminTable(users);
		}
	}
);

export const { removeUser: removeUserAction, setUser: setUserAction } = adminSlice.actions;

export default adminSlice.reducer;
