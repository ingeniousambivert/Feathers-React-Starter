import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import feathersClient from "@client";

export const loadProjectThunk = createAsyncThunk("project/createProject", async (id) => {
	try {
		const project = await feathersClient.service("projects").get(id);
		return { project };
	} catch (error) {
		throw Error(error);
	}
});

const loadProjectReducer = {
	[loadProjectThunk.pending]: (state) => {
		state.loading = true;
		state.error = false;
	},
	[loadProjectThunk.rejected]: (state, action) => {
		state.loading = false;
		state.error = action.error.message;
	},
	[loadProjectThunk.fulfilled]: (state, action) => {
		state.loading = false;
		state.error = false;
		state.project = action.payload.project;
	}
};

export const createProjectThunk = createAsyncThunk("project/createProject", async (projectData) => {
	try {
		const project = await feathersClient.service("projects").create(projectData);
		return { project };
	} catch (error) {
		throw Error(error);
	}
});

const createProjectReducer = {
	[createProjectThunk.pending]: (state) => {
		state.loading = true;
		state.error = false;
	},
	[createProjectThunk.rejected]: (state, action) => {
		state.loading = false;
		state.error = action.error.message;
	},
	[createProjectThunk.fulfilled]: (state, action) => {
		state.loading = false;
		state.error = false;
		state.project = action.payload.project;
	}
};

const projectSlice = createSlice({
	name: "project",
	initialState: {
		project: {},
		loading: null,
		error: null
	},
	reducers: {
		addProjectData: {
			reducer: (state, { payload }) => {
				state.project = { ...state.project, ...payload };
			}
		},
		removeProjectData: {
			reducer: (state) => {
				state.project = {};
			}
		}
	},
	extraReducers: { ...createProjectReducer, ...loadProjectReducer }
});

export const selectError = createSelector(
	(state) => state.project.error,
	(error) => {
		if (error !== null) return error;
	}
);

export const selectProjectData = createSelector(
	(state) => state.project.project,
	(project) => {
		if (project !== null) return project;
	}
);

export const {
	addProjectData: addProjectDataAction,
	removeProjectData: removeProjectDataAction
} = projectSlice.actions;

export default projectSlice.reducer;
