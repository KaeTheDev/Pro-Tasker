import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    matchPassword: (enteredPassword: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type:  String, required: true, unique: true },
        password: { type: String, required: true }
    },
    { timestamps: true });

    // Run function before any document is saved and hash password
    userSchema.pre('save', async function(this: any) {
        if(!this.isModified('password')) return;
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    });

    // Compare entered password with hashed password
    userSchema.methods.matchPassword = async function(enteredPassword: string) {
        return await bcrypt.compare(enteredPassword, this.password);
    };

    const User = mongoose.model<IUser>('User', userSchema);

export default User;