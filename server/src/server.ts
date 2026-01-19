import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Server is running! 🚀')
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`);
});