## Final Capstone Project - Pro-Tasker

##  Overview
Pro-Tasker is a full-stack MERN application built as a modern, collaborative project management platform. It enables individuals and small teams to efficiently manage projects, track tasks, and collaborate in real-time. This project demonstrates:

* Secure, modular backend architecture with Node.js, Express, and MongoDB
* Nested Mongoose relationships between Users, Projects, and Tasks
* JWT-based authentication and ownership-based authorization
* Dynamic, responsive React frontend using Context API for global state management
* Full CRUD operations with seamless frontend-backend integration
* Deployment to Render and MongoDB Atlas

## Features & User Stories

# User Management
* Users can register, log in, and log out securely.
* JWT-based session management ensures persistent login.

# Project Management
* Create, view, update, and delete your own projects.
* Dashboard shows all projects created by the logged-in user.
* Detailed view for individual projects.

# Task Management
* Create tasks within projects, with title, description, and status (To Do, In Progress, Done).
* Update or delete tasks within projects you own.
* Task status counts and progress bars are shown in project views.

##  Workplace Context
You have been hired by a growing startup to lead the development of their new flagship productivity product, Pro-Tasker. The company’s goal is to empower users with an intuitive yet powerful platform for managing projects and tasks — combining simplicity for individuals with collaboration tools for small teams. As the lead full-stack developer, you are responsible for building a secure, scalable, and maintainable system from concept to deployment.

##  Learning Objectives
Through this project, we:

* Design and implement a secure, RESTful API using Node.js, Express, and MongoDB.

* Use Mongoose models and schema relationships (ref) between User, Project, and Task.

* Implement secure authentication with JWT and robust ownership-based authorization.

* Build a responsive React frontend with Context API for global state management.

* Integrate frontend and backend through protected API routes.

* Deploy a complete production-ready application using Render and MongoDB Atlas.

##  Description

This lab focuses on applying full-stack development principles to create a real-world, end-to-end web application.

Your implementation will demonstrate mastery in:

* User management: Secure registration, login, logout, and session persistence.

* Project management: Full CRUD functionality for creating, viewing, editing, and deleting projects owned by the user.

* Task management: Nested CRUD operations within projects for managing project-specific tasks.

* Collaboration (Stretch Feature): Inviting other users to collaborate on shared projects.

* Frontend experience: A polished, SPA-style interface with role-based content rendering and responsive design.

## Backend:
* Node.js, Express
* MongoDB Atlas, Mongoose
* JWT for authentication
* bcrypt for password hashing
* TypeScript

## Frontend:
* React, TypeScript
* Context API for global state
* Axios for API calls
* React Router DOM for client-side routing
* Tailwind CSS for responsive UI

## Deployment:
* Render (Frontend & Backend)

* Backend: Deploy to Render as a web service. Connect to MongoDB Atlas. Update .env with production secrets.
* Frontend: Deploy to Render as a static site. Ensure API base URL points to live backend.
* Test the live deployment and verify that all endpoints and frontend pages work as expected.

##  Resources

*  React Docs — https://react.dev
*  TypeScript Handbook — https://www.typescriptlang.org/docs
*  https://mongoosejs.com/docs/typescript.html
*  TypeScript + React Cheatsheets (recommended)
*  MongoDB with TypeScript - https://www.mongodb.com/resources/products/compatibilities/using-typescript-with-mongodb-tutorial
*  Typescript Express API with MongoDB, Mongoose and Decorators - https://www.youtube.com/watch?v=WQWw1-IV4io
*  Setting Up TypeScript, Express, MongoDB- https://dev.to/sazid60/setting-up-a-typescript-express-mongodbmongoose-backend-from-scratch-3273
*  Axios Interceptors - https://axios-http.com/docs/interceptors
*  Axios Interceptors - https://axios-http.com/docs/interceptors#interceptors
*  Express Documentation — https://expressjs.com
*  MongoDB + Mongoose Docs — https://mongoosejs.com
*  Render Deployment Docs — https://render.com/docs

##  Getting Started

##  Requirements

*  Node.js v24+
*  npm
*  Git
*  A code editor (VS Code recommended)
*  MongoDB Atlas or local MongoDB instance
*  Environment variables configured via .env
*  TypeScript
*  React

##  OS Compatibility

This lab works on:

*  Windows
*  macOS
*  Linux

##  Installation

1. Clone the repository:

git clone [<repository-url>](https://github.com/KaeTheDev/Pro-Tasker.git)

2. Navigate into the project folder:

cd pro-tasker

##  Backend Setup

1. Navigate to the backend folder:

cd server

2. Install dependencies:

npm install

3. Create a .env file in /server and add:

PORT=3000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>

4. Run the backend server:
npm run dev

## Frontend Setup

1. Navigate to the frontend folder:
cd client

2. Install frontend dependencies:
npm install

3. Run the frontend:
npm run dev

The frontend will run on http://localhost:5173 and automatically connect to the backend.

##  Project Structure

Pro-Tasker/
├─ client/               # React frontend
│  ├─ src/
│  │  ├─ api/            # Axios instance & API calls
│  │  ├─ components/     # Reusable UI components
│  │  ├─ context/        # Context API for auth and global state
│  │  ├─ pages/          # Page components (Dashboard, ProjectDetails, Login, Register)
│  │  └─ App.tsx         # Routes and layout
├─ server/               # Node/Express backend
│  ├─ controllers/       # Controllers for User, Project, Task
│  ├─ middleware/        # Auth and error handling
│  ├─ models/            # Mongoose models (User, Project, Task)
│  ├─ routes/            # Express routes
│  └─ server.ts          # Server entry point
└─ README.md             # Documentation

## API Endpoints

# Users

| Method | Endpoint              | Description               | Protected? |
| ------ | --------------------- | ------------------------- | ---------- |
| POST   | `/api/users/register` | Register a new user       | No         |
| POST   | `/api/users/login`    | Login user and return JWT | No         |
| GET    | `/api/users/me`       | Get logged-in user info   | Yes        |

# Projects

| Method | Endpoint                  | Description                             | Protected? |
| ------ | ------------------------- | --------------------------------------- | ---------- |
| GET    | `/api/projects`           | Get all projects for the logged-in user | Yes        |
| POST   | `/api/projects`           | Create a new project                    | Yes        |
| GET    | `/api/projects/:id`       | Get details of a single project         | Yes        |
| PUT    | `/api/projects/:id`       | Update a project                        | Yes        |
| DELETE | `/api/projects/:id`       | Delete a project                        | Yes        |
| POST   | `/api/projects/:id/tasks` | Add a new task to a project             | Yes        |

# Tasks

| Method | Endpoint                                 | Description                | Protected? |
| ------ | ---------------------------------------- | -------------------------- | ---------- |
| PUT    | `/api/projects/:projectId/tasks/:taskId` | Update task details/status | Yes        |
| DELETE | `/api/projects/:projectId/tasks/:taskId` | Delete a task              | Yes        |