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
		state.users = null;
		state.user = null;
	},
	[loadUsersThunk.rejected]: (state, action) => {
		state.loading = false;
		state.error = action.error.message;
		state.users = null;
		state.user = null;
	},
	[loadUsersThunk.fulfilled]: (state, action) => {
		state.loading = false;
		state.error = false;
		state.users = action.payload.data;
	}
};

export const loadUserThunk = createAsyncThunk("admin/loadUser", async (id) => {
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

export const updateUserThunk = createAsyncThunk("admin/updateUser", async (data) => {
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

const adminSlice = createSlice({
	name: "admin",
	initialState: {
		loading: null,
		error: null,
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
	extraReducers: { ...loadUserReducer, ...updateUserReducer, ...loadUsersReducer }
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
