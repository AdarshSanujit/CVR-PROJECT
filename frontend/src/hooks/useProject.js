import { useDispatch, useSelector } from "react-redux";
import { projectService } from "../services/project.service";

import {
  addProjectStart,
  addProjectSuccess,
  addProjectFailed,
  deleteProjectStart,
  deleteProjectSuccess,
  deleteProjectFailed,
  updateProjectStart,
  updateProjectSuccess,
  updateProjectFailed,
  getProjectByIdStart,
  getProjectByIdSuccess,
  getProjectByIdFailed,
  getProjectsStart,
  getProjectsSuccess,
  getProjectsFailed,
} from "../store/features/project.slice";

export const useProject = () => {
  const dispatch = useDispatch();

  const { projects, userFindingProject, loading, error } = useSelector(
    (state) => state.project,
  );

  const createProject = async (projectData) => {
    try {
      dispatch(addProjectStart());

      const response = await projectService.createProject(projectData);

      if (response.success) {
        dispatch(addProjectSuccess(response.project));
      }

      return response;
    } catch (error) {
      dispatch(
        addProjectFailed(error.response?.data?.message || error.message),
      );
    }
  };

  const deleteProject = async (projectId) => {
    try {
      dispatch(deleteProjectStart());

      const response = await projectService.deleteProject(projectId);

      if (response.success) {
        dispatch(deleteProjectSuccess(projectId));
      }

      return response;
    } catch (error) {
      dispatch(
        deleteProjectFailed(error.response?.data?.message || error.message),
      );
    }
  };

  const updateProject = async (projectId, updateData) => {
    try {
      dispatch(updateProjectStart());

      const response = await projectService.updateProject(
        projectId,
        updateData,
      );

      if (response.success) {
        dispatch(updateProjectSuccess(response.project));
      }

      return response;
    } catch (error) {
      dispatch(
        updateProjectFailed(error.response?.data?.message || error.message),
      );
    }
  };

  const getProjectById = async (projectId) => {
    try {
      dispatch(getProjectByIdStart());

      const response = await projectService.getProjectById(projectId);

      if (response.success) {
        dispatch(getProjectByIdSuccess(response.project));
      }

      return response;
    } catch (error) {
      dispatch(
        getProjectByIdFailed(error.response?.data?.message || error.message),
      );
    }
  };

  const getProjects = async () => {
    try {
      dispatch(getProjectsStart());

      const response = await projectService.getProjects();

      if (response.success) {
        dispatch(getProjectsSuccess(response.projects));
      }

      return response;
    } catch (error) {
      dispatch(
        getProjectsFailed(error.response?.data?.message || error.message),
      );
    }
  };

  return {
    projects,
    userFindingProject,
    loading,
    error,

    createProject,
    deleteProject,
    updateProject,
    getProjectById,
    getProjects,
  };
};
