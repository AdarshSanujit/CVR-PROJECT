import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const projectService = {
  createProject: async (projectData) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/project/add-projrct`,
      projectData,
    );
    return response.data;
  },
  deleteProject: async (projectId) => {
    const response = await axios.delete(
      `${API_BASE_URL}/api/project/delete-project/${projectId}`,
      );
    return response.data;
  },
  updateProject: async (projectId,updateData) => {
    const response = await axios.put(
      `${API_BASE_URL}/api/project/update-project/${projectId}`,
      updateData
      );
    return response.data;
  },
  getProjectById: async (projectId) => {
    const response = await axios.get(
      `${API_BASE_URL}/api/project/get-project/${projectId}`,
      
      );
    return response.data;
  },
  getProjects: async () => {
    const response = await axios.get(
      `${API_BASE_URL}/api/project/get-projects`,
      
      );
    return response.data;
  },
};

export default projectService;
