import User from "../models/user.model.js";
import { verifyToken } from "../utils/token.js";

export async function verifyUser(req, res, next) {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (
      !token ||
      token === "" ||
      token === null 
    ) {
      return res.status(401).json({
        success: false,
        message: "Please Login First",
      });
    }
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "user not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}
export default {verifyUser};