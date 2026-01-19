import express from 'express';
import { getProjects, createProject } from '../controllers/projectController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect routes with authMiddleware
router.get('/', authMiddleware, getProjects);
router.post('/', authMiddleware, createProject);

export default router;