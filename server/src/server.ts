import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// ✅ Enable CORS for frontend origin
app.use(
    cors({
      origin: 'http://localhost:5173', // your Vite dev server
    })
  );

// Routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api', taskRoutes);

app.get('/', (req, res) => {
    res.send('Server is running! 🚀')
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`);
});