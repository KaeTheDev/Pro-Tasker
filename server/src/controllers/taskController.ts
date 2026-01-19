import type { Request, Response } from 'express';
import Task from '../models/Task.js';
import Project from '../models/Project.js';

// Extend request to include authenticated user
interface AuthRequest extends Request {
  user?: { id: string };
}

// GET /api/tasks/:projectId
// Get all tasks for a project
export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.params;

    if (!projectId || typeof projectId !== 'string') {
      return res.status(400).json({ message: 'Invalid project ID' });
    }

    const project = await Project.findById(projectId);
    if (!project || project.user.toString() !== req.user!.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const tasks = await Task.find({ project: projectId });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/tasks/:projectId
// Create a new task for a project
export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.params;

    if (!projectId || typeof projectId !== 'string') {
      return res.status(400).json({ message: 'Invalid project ID' });
    }

    const { title, description, status } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const project = await Project.findById(projectId);
    if (!project || project.user.toString() !== req.user!.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const task = await Task.create({
      title,
      description,
      status: status || 'To Do',
      project: projectId,
      user: req.user!.id,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/tasks/:taskId
// Update a task
export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { taskId } = req.params;

    if (!taskId || typeof taskId !== 'string') {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    const task = await Task.findById(taskId);
    if (!task || task.user.toString() !== req.user!.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { title, description, status } = req.body;

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;

    await task.save();
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/tasks/:taskId
// Delete a task
export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { taskId } = req.params;

    if (!taskId || typeof taskId !== 'string') {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    const task = await Task.findById(taskId);
    if (!task || task.user.toString() !== req.user!.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await task.deleteOne();
    res.json({ message: 'Task deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};