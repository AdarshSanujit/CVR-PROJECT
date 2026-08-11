import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
async function register(req, res) {
  try {
    const {
      name,
      email,
      password,
      department,
      branch,
      graduation_year,
      batch_year,
      semester,
      interest,
      current_role,
      role,
      companyName,
      linkedin_url,
      github_url,
      bio,
      location,
    } = req.body;
    const file = req.file;

    if (
      name === "" ||
      name === null ||
      email === "" ||
      email === null ||
      password === "" ||
      password === null ||
      department === "" ||
      department === null ||
      branch === "" ||
      branch === null ||
      role === "" ||
      role === null
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    let result;
    const hashedPassword = await bcrypt.hash(password, 10);
    if (file?.path) {
      const { path } = file;
      result = await uploadOnCloudinary(path);
    }
    const user = await User.create({
      name,
      profile_picture: file ? result?.secure_url : null,
      email,
      password: hashedPassword,
      department,
      branch,
      graduation_year,
      batch_year,
      semester,
      interest,
      current_role,
      role,
      companyName,
      linkedin_url,
      github_url,
      bio,
      location,
    });
    const token = generateToken(user);
    return res
      .cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(201)
      .json({
        success: true,
        message: "User registered successfully",
        user,
        token,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
}
async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (
      email === "" ||
      email === null ||
      password === "" ||
      password === null
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password",
      });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const token = generateToken(user);
    const { password: _, ...userInfo } = user.toObject();
    return res
      .cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        userInfo,
        token,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}
async function getUserById(req, res) {
  try {
    const { id } = req.params;
    if (id === "" || id === null) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid user ID",
      });
    }
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "user fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}
async function getMe(req, res) {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "user not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "user fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}
async function logout(req, res) {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}
async function updateProfile(req, res) {
  try {
    const { id } = req.user;
    if (!id) {
      return res.status(403).json({
        success: false,
        message: "Please Login with valid credentials",
      });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    const {
      name,
      department,
      branch,
      graduation_year,
      batch_year,
      semester,
      interest,
      current_role,
      companyName,
      linkedin_url,
      github_url,
      bio,
      location,
    } = req.body;
    const file = req.file;
    const updateData = {};

    if (file?.path) {
      const { path } = file;
      const result = await uploadOnCloudinary(path);
      updateData.profile_picture = result.secure_url;
    }
    if (name !== undefined) updateData.name = name;
    if (department !== undefined) updateData.department = department;
    if (branch !== undefined) updateData.branch = branch;
    if (graduation_year !== undefined)
      updateData.graduation_year = graduation_year;
    if (batch_year !== undefined) updateData.batch_year = batch_year;
    if (semester !== undefined) updateData.semester = semester;
    if (interest !== undefined) updateData.interest = interest;
    if (current_role !== undefined) updateData.current_role = current_role;
    if (companyName !== undefined) updateData.companyName = companyName;
    if (linkedin_url !== undefined) updateData.linkedin_url = linkedin_url;
    if (github_url !== undefined) updateData.github_url = github_url;
    if (bio !== undefined) updateData.bio = bio;
    if (location !== undefined) updateData.location = location;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { returnDocument: "after" },
    ).select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}
async function deleteProfile(req, res) {
  try {
    const { user } = req;
    const { id } = req.params;
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Please Login First",
      });
    }
    if (user.role === "admin") {
      const deletedUser = await User.findByIdAndDelete(user.id);
      if (!deletedUser) {
        return res
          .status(400)
          .json({ success: false, message: "Something went wrong" });
      }
      return res
        .status(200)
        .json({ success: true, message: "Account Deleted SuccessFully" });
    }

    if (id !== user.id) {
      return res.status(400).json({
        success: false,
        message: "You can't delete this account",
      });
    }
    const deletedUser = await User.findByIdAndDelete(user.id);
    if (!deletedUser) {
      return res
        .status(400)
        .json({ success: false, message: "Something went wrong" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Account Deleted SuccessFully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
async function getAllUsers(req,res) {
  try {
    const { user } = req;
    if (!user) { 
      return res.status(401).json({
        success: false,
        message: "Please Login First",
      });
    }
    const users = await User.find({
         _id: { $ne: user.id } ,
        role: {$ne : "admin"}
    }).select("-password");
    if (!users) { 
      return res.status(200).json({
        success: false,
        message: "No Users Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "users fetched successfully",
      users
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export default {
  register,
  login,
  getUserById,
  getMe,
  logout,
  updateProfile,
  deleteProfile,
  getAllUsers
};
