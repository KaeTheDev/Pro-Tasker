import type { Request, Response } from "express";
import Project from "../models/Project.js";
import { promiseHooks } from "node:v8";

// Extend request to include authenticated user
interface AuthRequest extends Request {
    user?: { id: string };
}

// Get all projects for the logged-in user
// GET /api/projects
// Private
export const getProjects = async (req: AuthRequest, res: Response) => {
    try {
        const projects = await Project.find({ user: req.user!.id });
        res.json(projects);
    } catch(error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new project
// POST /api/projects
// Private
export const createProject = async (req: AuthRequest, res: Response) => {
    const { name, description } = req.body;

    if(!name) return res.status(400).json({ message: 'Project name is required' });

    try {
        const project = await Project.create({
            name,
            description,
            user: req.user!.id,
        });
        res.status(201).json(project);
    } catch(error) {
        res.status(500).json({ message: 'Server error' });
    }
};