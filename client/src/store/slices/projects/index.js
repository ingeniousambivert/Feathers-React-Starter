import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import feathersClient from "@client";

export const loadProjectsThunk = createAsyncThunk("projects/loadProjects", async (userID) => {
	const query = {
		$sort: { createdAt: -1 },
		ownerID: userID
	};
	try {
		const projects = await feathersClient.service("projects").find({ query });
		return { projects };
	} catch (error) {
		throw Error(error);
	}
});

const loadProjectsReducer = {
	[loadProjectsThunk.pending]: (state) => {
		state.loading = true;
		state.error = false;
	},
	[loadProjectsThunk.rejected]: (state, action) => {
		state.loading = false;
		state.error = action.error.message;
	},
	[loadProjectsThunk.fulfilled]: (state, action) => {
		state.loading = false;
		state.error = false;
		state.projects = action.payload.projects;
	}
};

const projectsSlice = createSlice({
	name: "projects",
	initialState: {
		projects: null,
		loading: null,
		error: null
	},
	reducers: {},
	extraReducers: { ...loadProjectsReducer }
});

export const selectError = createSelector(
	(state) => state.projects.error,
	(error) => {
		if (error !== null) return error;
	}
);

export const selectProjects = createSelector(
	(state) => state.projects.projects,
	(projects) => {
		if (projects !== null) return projects;
	}
);

export default projectsSlice.reducer;
