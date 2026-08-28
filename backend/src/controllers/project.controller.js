import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Helper function to check if user has senior or admin role
const isAuthorizedUser = (user) => {
  return user && (user.role === "senior" || user.role === "admin");
};

// Helper function to check if user is authorized to access a specific project (owner or admin)
const isAuthorizedForProject = (project, userId, userRole) => {
  return project && (project.senior_profile_id.toString() === userId.toString() || userRole === "admin");
};

const addProject = async (req, res) => {
  try {
    // Validate user role first using helper function
    if (!isAuthorizedUser(req.user)) {
      return res.status(403).json({
        success: false,
        message: "Only senior users can add projects",
      });
    }

    const file = req.file;
    let result;
    if (file?.path) {
        const { path } = file;
        result = await uploadOnCloudinary(path);
    }
    const {
      title,
      category,
      description,
      technologies,
      github_url,
      live_demo_url,
      duration,
      academic_year,
    } = req.body;

    if ( !title || !category || !description) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    // Create project and update user in parallel where possible
    const project = await Project.create({
      senior_profile_id: req.user._id,
      title,
      category,
      description,
      technologies,
      github_url,
      live_demo_url,
      project_image: file ? result?.secure_url : null,
      duration,
      academic_year,
    });

    // Update user's projects array
    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { projects: project._id } },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Project added successfully",
      project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add project",
      error: error.message,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    // Validate user authentication
    if (!req.user) {
      return res.status(403).json({
        success: false,
        message: "Please Login First"
      });
    }

    // Validate user role using helper function
    if (!isAuthorizedUser(req.user)) {
      return res.status(403).json({
        success: false,
        message: "Only senior users and admins can update projects",
      });
    }

    const { projectId } = req.params;
    if(!projectId ){
      return res.status(400).json({
        success: false,
        message: "Please provide a valid Project Id"
      });
    }
    const {
      title,
      category,
      description,
      technologies,
      github_url,
      live_demo_url,
      project_image,
      duration,
      academic_year,
    } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    // Check if user is authorized to update this project (owner or admin)
    if (!isAuthorizedForProject(project, req.user._id, req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to edit this project"
      });
    }

    // Simplified updateData object creation
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (category !== undefined) updateData.category = category;
    if (description !== undefined) updateData.description = description;
    if (technologies !== undefined) updateData.technologies = technologies;
    if (github_url !== undefined) updateData.github_url = github_url;
    if (live_demo_url !== undefined) updateData.live_demo_url = live_demo_url;
    if (project_image !== undefined) updateData.project_image = project_image;
    if (duration !== undefined) updateData.duration = duration;
    if (academic_year !== undefined) updateData.academic_year = academic_year;

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $set: updateData },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update project",
      error: error.message,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    // Validate user authentication
    if (!req.user) {
      return res.status(403).json({
        success: false,
        message: "Please Login First",
      });
    }

    // Validate user role using helper function
    if (!isAuthorizedUser(req.user)) {
      return res.status(403).json({
        success: false,
        message: "Only senior users and admins can delete projects",
      });
    }

    const { projectId } = req.params;
    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid Project Id",
      });
    }

    // Admin can delete any project, senior users can only delete their own
    let project;
    if (req.user.role === "admin") {
      project = await Project.findByIdAndDelete(projectId);
    } else {
      project = await Project.findOneAndDelete({
        _id: projectId,
        senior_profile_id: req.user._id,
      });
    }

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found or you don't have permission to delete it",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete project",
      error: error.message,
    });
  }
};

async function getAllProjects(req, res) {
  try {
    const { user } = req;
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Please Login First",
      });
    }
    const projects = await Project.find({ senior_profile_id: user.id });

    // Simplified array check
    return res.status(200).json({
      success: true,
      message: projects.length > 0 ? "Projects Fetched Successfully" : "No Project Created Yet",
      projects: projects || []
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

async function getProjectById(req, res) {
  try {
    const { user } = req;
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Please Login First",
      });
    }
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please Provide Project ID",
      });
    }

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project Not Found"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Project Fetched Successfully",
      project
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export default {
  addProject,
  updateProject,
  deleteProject,
  getProjectById,
  getAllProjects,
};
