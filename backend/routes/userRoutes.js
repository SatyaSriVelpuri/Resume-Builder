import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/userController.js";


const userRouter = express.Router();
userRouter.post('/register',  registerUser)
userRouter.post('/login',  loginUser)
//protected route as token is needed 
import { protect } from "../middleware/authMiddleware.js";
userRouter.get('/profile', protect, getUserProfile)

export default userRouter;