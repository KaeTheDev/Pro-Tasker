import mongoose, { Schema, Document } from 'mongoose';

// Define the Project interface for TypeScript
export interface IProject extends Document {
  name: string;
  description?: string;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Project Schema
const projectSchema: Schema<IProject> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
  },
  { timestamps: true }
);

export default mongoose.model<IProject>('Project', projectSchema);