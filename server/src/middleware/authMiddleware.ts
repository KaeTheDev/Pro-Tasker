import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Extend Express Request type to include a 'user' property
// This lets us attach the authenticated user's ID to the request object
interface AuthRequest extends Request {
  user?: { id: string };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // 1️⃣ Get the Authorization header from the request
  // Expected format: "Bearer <token>"
  const authHeader = req.headers.authorization;

  // 2️⃣ Check if the header exists and starts with "Bearer "
  if (authHeader && authHeader.startsWith('Bearer ')) {
    // Extract the token part from the header
    const token = authHeader.split(' ')[1]; // token is a string | undefined

    // 3️⃣ Handle missing token just in case
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
      // 4️⃣ Ensure JWT_SECRET is defined in environment variables
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in .env');
      }

      // 5️⃣ Verify the token using JWT_SECRET
      // jwt.verify may return string | object, so we cast it to unknown first
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as unknown;

      // 6️⃣ Type guard: ensure decoded is an object with an 'id' property
      if (typeof decoded === 'object' && decoded !== null && 'id' in decoded) {
        // Attach the user's ID to the request object for use in controllers
        req.user = { id: (decoded as { id: string }).id };
        // Call next() to continue to the actual route handler
        next();
      } else {
        // Token is invalid (does not contain an ID)
        res.status(401).json({ message: 'Not authorized, token invalid' });
      }
    } catch (error) {
      // Catch any JWT verification errors (expired, malformed, etc.)
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    // 7️⃣ No Authorization header or does not start with "Bearer "
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};