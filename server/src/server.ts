// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import connectDB from './config/db.js';
// import userRoutes from './routes/userRoutes.js';
// import projectRoutes from './routes/projectRoutes.js';
// import taskRoutes from './routes/taskRoutes.js';

// dotenv.config();
// connectDB();

// const app = express();

// // ✅ CORS must come BEFORE express.json()
// const allowedOrigins = [
//   process.env.CLIENT_URL,
//   'https://pro-tasker-frontend-9k8n.onrender.com',
//   'http://localhost:3000'
// ].filter(Boolean);

// app.use(cors({
//   origin: (origin, callback) => {
//     // Allow requests with no origin (like mobile apps, Postman, etc.)
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(express.json());

// // Routes
// app.use('/api/users', userRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/tasks', taskRoutes);

// app.get('/', (req, res) => {
//   res.send('Server is running! 🚀');
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

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

// ✅ CORS Configuration
const allowedOrigins = [
  process.env.CLIENT_URL,
  'https://pro-tasker-frontend-9k8n.onrender.com',
  'http://localhost:3000',
  'http://localhost:5173' // Vite default dev port
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400 // 24 hours
};

// ✅ Apply CORS globally
app.use(cors(corsOptions));

// ✅ Handle preflight requests explicitly
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Add a simple test endpoint to verify CORS
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    cors: 'enabled',
    origin: req.headers.origin 
  });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Server is running! 🚀');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
});