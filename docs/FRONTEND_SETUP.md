# Society Web - Full Stack Community Management System

A modern, responsive full-stack application for managing society complaints, notices, and community engagement.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Frontend Pages](#frontend-pages)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### User Features
- **User Authentication**: Secure login and registration with JWT
- **Complaint Management**: File and track complaints
- **Dashboard**: View statistics and complaint status
- **Notifications**: Real-time updates on complaint status
- **User Profile**: Manage personal information

### Admin Features
- **Complaint Management**: Review and respond to complaints
- **User Management**: Manage registered users
- **Visitor Tracking**: Record and manage visitor information
- **Maintenance Tracking**: Track maintenance requests
- **Analytics**: View system statistics and reports

### General Features
- **Responsive Design**: Mobile-first, works on all devices
- **Secure**: JWT authentication, password hashing with bcrypt
- **Cloud Storage**: Cloudinary integration for image uploads
- **Email Verification**: Secure email verification system
- **Rate Limiting**: API rate limiting to prevent abuse

## 🛠 Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js v5
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken), bcryptjs
- **File Upload**: Multer, Cloudinary
- **Email**: Email verification system
- **Middleware**: CORS, Cookie Parser, Express Rate Limit
- **Development**: Nodemon

### Frontend
- **Library**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS 3
- **State Management**: Zustand
- **HTTP Client**: Axios
- **PostCSS**: Autoprefixer

## 📁 Project Structure

```
SocietyWeb/
├── backend (Node.js/Express)
│   ├── src/
│   │   ├── controllers/      # Route controllers
│   │   ├── models/           # MongoDB schemas
│   │   ├── routes/           # API routes
│   │   ├── middlewares/      # Express middlewares
│   │   ├── utils/            # Helper utilities
│   │   └── db/               # Database connection
│   ├── uploads/              # File uploads
│   ├── package.json
│   ├── index.js              # Entry point
│   └── .env                  # Environment variables
│
├── frontend (React/Vite)
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   ├── store/            # State management
│   │   ├── styles/           # CSS files
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── .env.example
│
├── package.json              # Root package.json
├── README.md                 # This file
└── .gitignore
```

## 🔧 Prerequisites

- Node.js v14 or higher
- npm or yarn
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)
- Git

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Pranav104-1/Society_Mangement_backend.git
cd Society_Mangement_backend
```

### 2. Backend Setup

```bash
# Install backend dependencies
npm install

# Create .env file in root directory
cp .env.example .env

# Edit .env with your configuration:
# - MongoDB URI
# - JWT Secret
# - Cloudinary credentials
# - Email configuration
# - Port settings
```

### 3. Frontend Setup

```bash
cd frontend

# Install frontend dependencies
npm install

# Create .env file
cp .env.example .env

# Configure API endpoint if needed
# VITE_API_URL=http://localhost:5000/api
```

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend Server:**
```bash
npm run dev
```
Server runs on `http://localhost:5000`

**Terminal 2 - Frontend Server:**
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

### Production Mode

**Backend:**
```bash
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 📡 API Endpoints

### Authentication Routes (`/api/users`)
- `POST /login` - User login
- `POST /register` - User registration
- `POST /logout` - User logout
- `GET /profile` - Get user profile

### Complaint Routes (`/api/complaints`)
- `GET /` - Get all complaints
- `POST /` - Create new complaint
- `PUT /:id` - Update complaint
- `DELETE /:id` - Delete complaint

### Admin Routes (`/api/admin`)
- `GET /users` - Get all users
- `GET /complaints` - Get all complaints
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## 🎨 Frontend Pages

- **Home (`/`)**: Landing page with features showcase
- **Login (`/login`)**: User authentication
- **Register (`/register`)**: New user signup
- **Dashboard (`/dashboard`)**: Main user dashboard with statistics
- **Complaints (`/complaints`)**: Complaint management interface

## 🔐 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/society-web
JWT_SECRET=your-secret-key
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Society Web
```

## 📱 Responsive Design Features

- Mobile-first approach
- Tailwind CSS breakpoints (sm, md, lg, xl, 2xl)
- Flexible grid layouts
- Touch-friendly interfaces
- Optimized images
- Performance-optimized

## 🎯 Key Features Implementation

### Authentication Flow
1. User registers with email and password
2. Password is hashed with bcryptjs
3. JWT token is generated on login
4. Token is stored in HTTP-only cookies
5. Protected routes require valid token

### Complaint Management
1. Users can file new complaints
2. Complaints are categorized
3. Status tracking (open, pending, resolved)
4. Admin can update complaint status
5. Users get notifications on updates

### File Upload
- Images uploaded to Cloudinary
- Multer middleware for handling uploads
- Automatic image optimization
- Secure file handling

## 🚀 Performance Optimizations

- Code splitting with Vite
- Lazy loading of components
- Optimized images with Cloudinary
- Minified CSS and JavaScript
- Database indexing for queries
- API response caching where applicable

## 📝 Error Handling

- Global error middleware on backend
- Input validation on both frontend and backend
- User-friendly error messages
- Comprehensive error logging
- Graceful fallbacks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🆘 Support

For support, email support@societyweb.com or open an issue on GitHub.

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Vite Documentation](https://vitejs.dev/)

---

**Created with ❤️ for better community management**
