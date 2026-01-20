import type { Request, Response } from "express";
import Project from "../models/Project.js";
import Task from "../models/Task.js";

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

// Get single project by ID with tasks
// GET /api/projects/:id
// Private
// Get single project by ID with tasks
// GET /api/projects/:id
// Private
export const getProjectById = async (req: AuthRequest, res: Response) => {
    try {
        const project = await Project.findOne({ 
            _id: req.params.id as string, 
            user: req.user!.id 
        });
        
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Fetch tasks from Task collection - add type assertion
        const tasks = await Task.find({ project: req.params.id as string });

        console.log(`✅ Found ${tasks.length} tasks for project ${project._id}`);

        // Return project with tasks array
        res.json({
            _id: project._id,
            name: project.name,
            description: project.description,
            user: project.user,
            createdAt: project.createdAt,
            updatedAt: project.updatedAt,
            tasks: tasks
        });
    } catch (error) {
        console.error("Error in getProjectById:", error);
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