# SocietyWeb - Society Management System

A comprehensive web application for managing residential societies, including complaints, notices, and user management.

## 🌟 Features

- User Authentication & Authorization
- Notice Management with File Attachments
- Complaint System
- Admin Dashboard
- Role-based Access Control
- File Upload Support (Local & Cloudinary)
- Email Verification
- JWT Token Authentication

## 📁 Project Structure

```
src/
├── controllers/          # Business logic
│   ├── complaint.controllers.js
│   ├── notices.controllers.js
│   ├── users.controllers.js
│   └── Visitor.controller.js
├── db/                  # Database configuration
│   └── connect.js
├── middlewares/         # Custom middlewares
│   ├── admin.middleware.js
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   └── fileUpload.middleware.js
├── models/             # Database models
│   ├── Admins/
│   │   ├── maintainenaces.models.js
│   │   └── visitors.models.js
│   ├── auth/
│   │   └── user.models.js
│   └── societyM/
│       ├── complaint.models.js
│       ├── FlatDeatails.models.js
│       └── notices.models.js
├── routes/            # API routes
│   ├── admin.routes.js
│   ├── complaint.routes.js
│   ├── notices.routes.js
│   └── users.routes.js
└── utils/            # Utility functions
    ├── cloudinary.config.js
    ├── email_verfying.js
    ├── jwt.js
    └── multer.js
```

## 🔧 Setup & Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd SocietyWeb
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Create .env file
\`\`\`env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
USE_CLOUDINARY=true
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
\`\`\`

4. Start the server
\`\`\`bash
npm run dev
\`\`\`

## 📚 Core Components Explanation

### Authentication System (auth/)
- JWT-based authentication
- Token stored in HTTP-only cookies
- Role-based access control (Admin/User)
- Email verification system

Example usage:
\`\`\`javascript
// Login Request
POST /api/users/login
{
  "email": "user@example.com",
  "password": "password123",
  "Flat_no": "A101"
}

// Response
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "username",
    "email": "user@example.com",
    "Flat_no": "A101"
  }
}
\`\`\`

### Notice System (notices/)
- Create, read, update, delete notices
- File attachment support
- Pagination and search functionality
- Role-based access control

Example usage:
\`\`\`javascript
// Create Notice with File
POST /api/notices/create
Content-Type: multipart/form-data
{
  "title": "Monthly Meeting",
  "content": "Meeting details...",
  "priority": "High",
  "attachment": [File]
}

// Response
{
  "success": true,
  "message": "Notice created successfully",
  "notice": {
    "title": "Monthly Meeting",
    "content": "Meeting details...",
    "attachment": {
      "filename": "meeting.pdf",
      "path": "path_to_file",
      "mimetype": "application/pdf"
    }
  }
}
\`\`\`

### Complaint System (complaints/)
- Create and track complaints
- Status updates
- Comment system
- Priority levels

Example usage:
\`\`\`javascript
// Create Complaint
POST /api/complaints/create
{
  "title": "Water Leakage",
  "description": "Water leaking from ceiling",
  "category": "Maintenance",
  "priority": "High"
}
\`\`\`

### Error Handling
Centralized error handling with specific error types:
\`\`\`javascript
// Validation Error
{
  "success": false,
  "message": "Validation Error",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}

// Authentication Error
{
  "success": false,
  "message": "Invalid token"
}
\`\`\`

## 📡 API Routes

### 🔐 Authentication Routes
- \`POST /api/users/register\` - Register new user
- \`POST /api/users/login\` - Login user
- \`POST /api/users/logout\` - Logout user
- \`GET /api/users/user/:Flat_no\` - Get user profile

### 📢 Notice Routes
- \`GET /api/notices\` - Get all notices (public)
- \`POST /api/notices/create\` - Create notice (auth required)
- \`GET /api/notices/:id\` - Get single notice (auth required)
- \`PUT /api/notices/:id\` - Update notice (auth required)
- \`DELETE /api/notices/:id\` - Delete notice (auth required)
- \`DELETE /api/notices/admin/bulk-delete\` - Bulk delete notices (admin only)

### ⚠️ Complaint Routes
- \`POST /api/complaints/create\` - Create complaint
- \`GET /api/complaints/my-complaints\` - Get user's complaints
- \`GET /api/complaints/:id\` - Get complaint details
- \`PUT /api/complaints/:id/status\` - Update complaint status (admin)
- \`POST /api/complaints/:id/comment\` - Add comment to complaint

### 👑 Admin Routes
- \`GET /api/admin/complaints\` - Get all complaints
- \`PUT /api/admin/complaints/:id\` - Update complaint
- \`GET /api/admin/users\` - Get all users
- \`PUT /api/admin/users/:id\` - Update user details
- \`DELETE /api/admin/users/:id\` - Delete user

### Rate Limits
- Registration: 5 requests per 15 minutes
- Login: 10 requests per 15 minutes
- File Upload: 10 uploads per 15 minutes

## 🔒 Security Features

1. Password Security
   - Bcrypt hashing
   - Minimum length requirement
   - Complexity validation

2. File Upload Security
   - File type validation
   - Size limits (5MB max)
   - Secure file naming
   - Optional Cloudinary storage

3. API Security
   - JWT authentication
   - Rate limiting
   - CORS protection
   - HTTP-only cookies

## 🛠 Error Codes

| Code | Description |
|------|-------------|
| 200  | Success |
| 201  | Created |
| 400  | Bad Request |
| 401  | Unauthorized |
| 403  | Forbidden |
| 404  | Not Found |
| 409  | Conflict |
| 429  | Too Many Requests |
| 500  | Server Error |



## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
6. make a pdf of otp or auth done by user in private session like payment or document upload section 

