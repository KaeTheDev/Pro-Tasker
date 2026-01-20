import mongoose, { Schema, Document } from 'mongoose';

// Define the Task interface
interface ITask {
  _id: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  status: 'To Do' | 'In Progress' | 'Done';
}

// Define the Project interface for TypeScript
export interface IProject extends Document {
    name: string;
    description?: string;
    user: mongoose.Types.ObjectId; // references the owner
    tasks: ITask[]; // Add tasks array
    createdAt: Date;
    updatedAt: Date;
}

// Task sub-schema
const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { 
    type: String, 
    enum: ['To Do', 'In Progress', 'Done'], 
    default: 'To Do' 
  }
}, { _id: true }); // Enable _id for tasks

// Project Schema
const projectSchema: Schema<IProject> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    tasks: { type: [taskSchema], default: [] } // Add tasks field with default empty array
  },
  { timestamps: true }
);

export default mongoose.model<IProject>('Project', projectSchema);