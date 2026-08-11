import express from 'express';
import  authController from '../controllers/auth.controller.js';
import  authMiddleware from '../middlewares/auth.middleware.js';
import {upload} from '../middlewares/multer.middleware.js';
const router = express.Router();

router.post('/register',upload.single("image"),authController.register) 
router.post('/login',authController.login) 
router.get('/logout', authMiddleware.verifyUser, authController.logout)
router.put('/update-profile', authMiddleware.verifyUser, upload.single("image"), authController.updateProfile)

router.get("/user/:id", authMiddleware.verifyUser, authController.getUserById); 
router.get('/get-me',authMiddleware.verifyUser,authController.getMe) 
router.delete('/delete/:id',authMiddleware.verifyUser,authController.deleteProfile) 
router.get('/get-users',authMiddleware.verifyUser,authController.getAllUsers) 

export default router;
