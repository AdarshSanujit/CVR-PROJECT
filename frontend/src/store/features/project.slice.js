import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  loading: false,
  projects: [],
  userFindingProject: null,
};

export const projectSlice = createSlice({
  name: "project",
  initialState,

  reducers: {
    addProjectStart: (state) => {
      state.error = null;
      state.loading = true;
    },

    addProjectFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    addProjectSuccess: (state, action) => {
      state.error = null;
      state.loading = false;
      state.projects.push(action.payload);
    },

    deleteProjectStart: (state) => {
      state.error = null;
      state.loading = true;
    },

    deleteProjectFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    deleteProjectSuccess: (state, action) => {
      state.error = null;
      state.loading = false;
      state.projects = state.projects.filter((p) => p._id !== action.payload);
    },

    updateProjectStart: (state) => {
      state.error = null;
      state.loading = true;
    },

    updateProjectFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    updateProjectSuccess: (state, action) => {
      state.error = null;
      state.loading = false;

      const project = state.projects.find((p) => p._id === action.payload._id);

      if (project) {
        Object.assign(project, action.payload);
      }
    },

    getProjectByIdStart: (state) => {
      state.error = null;
      state.loading = true;
      state.userFindingProject = null;
    },

    getProjectByIdFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.userFindingProject = null;
    },

    getProjectByIdSuccess: (state, action) => {
      state.error = null;
      state.loading = false;
      state.userFindingProject = action.payload;
    },

    getProjectsStart: (state) => {
      state.error = null;
      state.loading = true;
    },

    getProjectsFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    getProjectsSuccess: (state, action) => {
      state.error = null;
      state.loading = false;
      state.projects = action.payload;
    },
  },
});
export const {
  addProjectStart,
  addProjectFailed,
  addProjectSuccess,

  deleteProjectStart,
  deleteProjectFailed,
  deleteProjectSuccess,

  updateProjectStart,
  updateProjectFailed,
  updateProjectSuccess,

  getProjectByIdStart,
  getProjectByIdFailed,
  getProjectByIdSuccess,

  getProjectsStart,
  getProjectsFailed,
  getProjectsSuccess,
} = projectSlice.actions;

export default projectSlice.reducer;