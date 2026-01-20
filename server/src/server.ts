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
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL, // read from .env
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        process.env.CLIENT_URL,
        'https://pro-tasker-frontend-9k8n.onrender.com', // fallback
        'http://localhost:3000' // dev
      ].filter(Boolean);
      
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
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