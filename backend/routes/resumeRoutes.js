import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createResume,
  getUserResumes,
  updateResume,
  getResumeById,
  deleteResume,
} from "../controllers/resumeController.js";
import { uploadResumeImages } from '../controllers/uploadImages.js';


const resumeRouter = express.Router()
resumeRouter.post('/',protect, createResume)
resumeRouter.get('/:id',protect, getResumeById)
resumeRouter.get('/',protect, getUserResumes)
resumeRouter.put('/:id',protect, updateResume)
resumeRouter.put('/:id/images',protect, uploadResumeImages)

resumeRouter.delete('/:id',protect, deleteResume)

export default resumeRouter;