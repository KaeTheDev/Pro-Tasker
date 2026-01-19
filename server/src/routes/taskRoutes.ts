import express from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all routes
router.use(authMiddleware);

// Routes
router.get('/:projectId', getTasks);
router.post('/:projectId', createTask);
router.put('/update/:taskId', updateTask);
router.delete('/delete/:taskId', deleteTask);

export default router;