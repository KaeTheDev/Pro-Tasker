import type { Request, Response } from "express";
import Project from "../models/Project.js";
import mongoose, { type Types } from "mongoose";

// Extend request to include authenticated user
interface AuthRequest extends Request {
    user?: { id: string };
}
// POST task to project
// /api/projects/:id/tasks
export const addTaskToProject = async (req: AuthRequest, res: Response) => {
    try {
        const id = req.params.id as string; 
        const { title, description, status } = req.body;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid project ID" });
        }

        const project = await Project.findOne({ _id: id, user: req.user!.id });
        
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Add new task - now TypeScript recognizes tasks!
        const newTask = {
            title,
            description,
            status,
            _id: new mongoose.Types.ObjectId(),
        };

        project.tasks.push(newTask as any); // No more type assertion needed for project.tasks
        await project.save();

        res.status(201).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

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

// Get single project by ID
// GET /api/projects/:projectID
export const getProjectById = async (req: AuthRequest, res: Response) => {
    try {
        const project = await Project.findOne({ 
            _id: req.params.id as string, 
            user: req.user!.id 
        });
        
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        
        res.json(project);
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
            tasks: [],
        });
        
        res.status(201).json(project);
    } catch(error) {
        res.status(500).json({ message: 'Server error' });
    }
};