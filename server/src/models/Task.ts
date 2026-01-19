import mongoose, { Schema, Document } from "mongoose";

// Task Interface
export interface ITask extends Document {
    title: string;
    description?: string;
    status: 'To Do' | 'In Progress' | 'Done';
    project: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const taskSchema: Schema<ITask> = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        status: {
            type: String,
            enum: ['To Do', 'In Progress', 'Done'],
            default: 'To Do',
        },
        project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true }
);

export default mongoose.model<ITask>('Task', taskSchema);