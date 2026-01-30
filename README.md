# Student Profile Management System

A full-stack student management system with authentication, role-based access control, and MongoDB integration.

## Features

- User registration and login
- Role-based access (Student/Admin)
- Student profile management
- Academic information tracking
- Fees management
- Clean, basic UI

## Tech Stack

- Frontend: React, Vite
- Backend: Node.js, Express
- Database: MongoDB Atlas
- Authentication: JWT

## Quick Start

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your MongoDB URI and JWT secret
npm run dev
```

### Frontend Setup
```bash
npm install
npm run dev
```

## Deployment

### Deploy Backend (Heroku)
```bash
cd backend
heroku create your-app-name
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-jwt-secret
heroku config:set MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/studentdb
git subtree push --prefix backend heroku main
```

### Deploy Frontend (Vercel)
1. Push code to GitHub
2. Go to vercel.com
3. Import GitHub repository
4. Set environment variable: `VITE_API_URL=https://your-backend-url.herokuapp.com/api`
5. Deploy

## API Endpoints

### Authentication
- POST /api/auth/register - User registration
- POST /api/auth/login - User login

### Students
- GET /api/students/profile - Get student profile
- PUT /api/students/profile - Update student profile

## License

MIT
