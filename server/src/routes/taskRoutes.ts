import express from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// /api/projects/:projectId/tasks
router
  .route('/projects/:projectId/tasks')
  .get(authMiddleware, getTasks)
  .post(authMiddleware, createTask);

// /api/tasks/:taskId
router.put('/tasks/:taskId', authMiddleware, updateTask);
router.delete('/tasks/:taskId', authMiddleware, deleteTask);

export default router;