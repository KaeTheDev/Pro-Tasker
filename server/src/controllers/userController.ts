import type { Request, Response } from "express";
import User from "../models/User.js";
import jwt from 'jsonwebtoken';

// Generate JWT
const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: '30d' });
};

// Register new user
// POST /api/users/register
// Public
export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;


    // Check if user exists
    const userExists = await User.findOne({ email });
    if(userExists) return res.status(400).json({ message: 'User already exists' });

    // Create User
    const user = await User.create({ name, email, password });

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// Authenticate user / login
// /api/users/login
// Public
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};