import express from "express";
import projectController from "../controllers/project.controller.js";
import  authMiddleware from '../middlewares/auth.middleware.js';
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/add-project", authMiddleware.verifyUser,upload.single("image"), projectController.addProject);
router.put(
  "/update-project/:projectId",
  authMiddleware.verifyUser,
  upload.single("image"),
  projectController.updateProject,
);
router.delete(
  "/delete-project/:projectId",
  authMiddleware.verifyUser,
  projectController.deleteProject,
);

export default router;
