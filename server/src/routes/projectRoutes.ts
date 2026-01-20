import express from 'express';
import { getProjects, createProject, getProjectById, addTaskToProject } from '../controllers/projectController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect routes with authMiddleware
router.get('/', authMiddleware, getProjects);
router.post('/', authMiddleware, createProject);
router.get('/:id', authMiddleware, getProjectById);
router.post("/:id/tasks", authMiddleware, addTaskToProject); 

export default router;