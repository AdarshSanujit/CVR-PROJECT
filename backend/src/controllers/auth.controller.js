import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token.js";
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
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
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

export default { register, login };
