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
// import express, { type Request, type Response } from 'express';
// import dotenv from 'dotenv';
// import cors, { type CorsOptions } from 'cors';
// import connectDB from './config/db.js';
// import userRoutes from './routes/userRoutes.js';
// import projectRoutes from './routes/projectRoutes.js';
// import taskRoutes from './routes/taskRoutes.js';

// dotenv.config();
// connectDB();

// const app = express();

// // ✅ CORS Configuration
// const allowedOrigins = [
//   process.env.CLIENT_URL || 'https://pro-tasker-frontend-9k8n.onrender.com',
//   'http://localhost:3000',
//   'http://localhost:5173'
// ];

// const corsOptions: CorsOptions = {
//   origin: allowedOrigins,
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// };

// // ✅ Apply CORS before all routes
// app.use(cors(corsOptions));

// // ✅ Handle preflight - use a middleware function instead of '*'
// app.use((req, res, next) => {
//   if (req.method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     return res.sendStatus(200);
//   }
//   next();
// });

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get('/api/health', (req: Request, res: Response) => {
//   res.json({ 
//     status: 'ok', 
//     message: 'Server is running',
//     cors: 'enabled'
//   });
// });

// // Routes
// app.use('/api/users', userRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/tasks', taskRoutes);

// app.get('/', (req: Request, res: Response) => {
//   res.send('Server is running! 🚀');
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import express, { type Request, type Response, type NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
  'https://pro-tasker-frontend-9k8n.onrender.com',
  'http://localhost:3000',
  'http://localhost:5173'
];

// ✅ Manual CORS middleware - more control
app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    console.log('✅ OPTIONS request from:', origin);
    return res.sendStatus(204);
  }
  
  console.log(`${req.method} ${req.path} from ${origin}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    cors: 'enabled'
  });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running! 🚀');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
});