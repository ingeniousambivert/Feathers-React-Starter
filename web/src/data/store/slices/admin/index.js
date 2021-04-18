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
		state.userData = null;
		state.users = null;
	},
	[loadUsersThunk.rejected]: (state, action) => {
		state.loading = false;
		state.error = action.error.message;
		state.userData = null;
		state.users = null;
	},
	[loadUsersThunk.fulfilled]: (state, action) => {
		state.loading = false;
		state.error = false;
		state.userData = {
			total: action.payload.total,
			limit: action.payload.limit,
			skip: action.payload.skip
		};
		state.users = action.payload.data;
	}
};
export const deactivateUserThunk = createAsyncThunk("admin/deactivateUser", async (id) => {
	await feathersClient.service("users").patch(id, { isActive: false });
});

const deactivateUserReducer = {
	[deactivateUserThunk.pending]: (state) => {
		state.loading = true;
		state.error = false;
	},
	[deactivateUserThunk.rejected]: (state, action) => {
		state.loading = false;
		state.error = action.error.message;
	},
	[deactivateUserThunk.fulfilled]: (state) => {
		state.loading = false;
		state.error = false;
	}
};

export const reactivateUserThunk = createAsyncThunk("admin/reactivateUser", async (id) => {
	await feathersClient.service("users").patch(id, { isActive: true });
});

const reactivateUserReducer = {
	[reactivateUserThunk.pending]: (state) => {
		state.loading = true;
		state.error = false;
	},
	[reactivateUserThunk.rejected]: (state, action) => {
		state.loading = false;
		state.error = action.error.message;
	},
	[reactivateUserThunk.fulfilled]: (state) => {
		state.loading = false;
		state.error = false;
	}
};

export const deverifyUserThunk = createAsyncThunk("admin/deverifyUser", async (id) => {
	await feathersClient.service("users").patch(id, { isVerified: false });
});

const deverifyUserReducer = {
	[deverifyUserThunk.pending]: (state) => {
		state.loading = true;
		state.error = false;
	},
	[deverifyUserThunk.rejected]: (state, action) => {
		state.loading = false;
		state.error = action.error.message;
	},
	[deverifyUserThunk.fulfilled]: (state) => {
		state.loading = false;
		state.error = false;
	}
};

export const reverifyUserThunk = createAsyncThunk("admin/reverifyUser", async (id) => {
	await feathersClient.service("users").patch(id, { isVerified: true });
});

const reverifyUserReducer = {
	[reverifyUserThunk.pending]: (state) => {
		state.loading = true;
		state.error = false;
	},
	[reverifyUserThunk.rejected]: (state, action) => {
		state.loading = false;
		state.error = action.error.message;
	},
	[reverifyUserThunk.fulfilled]: (state) => {
		state.loading = false;
		state.error = false;
	}
};

export const resetUserPasswordThunk = createAsyncThunk("admin/reverifyUser", async (data) => {
	const { _id, password } = data;
	await feathersClient.service("users").patch(_id, { password });
});

const resetUserPasswordReducer = {
	[resetUserPasswordThunk.pending]: (state) => {
		state.loading = true;
		state.error = false;
	},
	[resetUserPasswordThunk.rejected]: (state, action) => {
		state.loading = false;
		state.error = action.error.message;
	},
	[resetUserPasswordThunk.fulfilled]: (state) => {
		state.loading = false;
		state.error = false;
	}
};

const adminSlice = createSlice({
	name: "admin",
	initialState: {
		loading: null,
		error: null,
		userData: null,
		users: null
	},
	reducers: {},
	extraReducers: {
		...loadUsersReducer,
		...deactivateUserReducer,
		...reactivateUserReducer,
		...deverifyUserReducer,
		...reverifyUserReducer,
		...resetUserPasswordReducer
	}
});

export const selectAdminError = createSelector(
	(state) => state.admin.error,
	(error) => {
		if (error !== null) return error;
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

export const selectUserData = createSelector(
	(state) => state.admin.userData,
	(userData) => {
		if (userData !== null) {
			return userData;
		}
	}
);

export default adminSlice.reducer;
