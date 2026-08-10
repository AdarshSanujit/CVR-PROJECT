import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addProject = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if(!user || (user.role !== "senior" && user.role !== "admin")) {
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
    user.projects.push(project._id);
    await user.save();
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
    if (!req.user) { 
      return res.status(403).json({
        success: false,
        "message":"Please Login First"
      })
    }
    const { projectId } = req.params;
    if(!projectId ){
      return res.status(400).json({
        success: false,
        message:"Please gave a valid Project Id"
      })
    }
    const user = req.user;
    if (!user || (user.role !== "senior" && user.role !== "admin")) {
      return res.status(403).json({
        success: false,
        message: "Junior have no project",
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
    if (project.senior_profile_id.toString() !== user.id &&
      user.role !== "admin"
    ) { 
      return res.status(400).json({
        success: false,
        message:"You can't edit this project"
      })
    }
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
    const updatedProject= await Project.findByIdAndUpdate(
      projectId,
      { $set: updateData },
      { returnDocument: "after" },
    )


    return res.status(200).json({
      success: true,
      message: "Project added successfully",
      project:updatedProject,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add project",
      error: error.message,
    });
  }
};
const deleteProject = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(403).json({
        success: false,
        message: "Please Login First",
      });
    }
    const { projectId } = req.params;
    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "Please gave a valid Project Id",
      });
    }
    const user = req.user;
    if (!user || (user.role !== "senior" && user.role !== "admin")) {
      return res.status(403).json({
        success: false,
        message: "Junior have no project",
      });
    }

    if (user.role === "admin") { 
      const project = await Project.findByIdAndDelete(projectId);
      if (project) {
        return res.status(200).json({
          success: true,
          message: "Project deleted successfully",
        });
      }
      
      return res.status(200).json({
        success: true,
        message: "Gave a valid Project Id",
      });
      
    }

    const project = await Project.findOneAndDelete({
      _id: projectId,
      senior_profile_id: user.id,
    });

    if (project) {
      return res.status(200).json({
        success: true,
        message:"Project deleted successfully"
      })
    }
    if (!project) {
      return res.status(200).json({
        success: true,
        message: "you don't have access to do that",
      });
    }
    console.log(project);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add project",
      error: error.message,
    });
  }
};
export default { addProject, updateProject, deleteProject };