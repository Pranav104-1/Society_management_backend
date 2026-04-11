# Email OTP-Based Authentication API Documentation

## Overview
This document describes the email OTP-based authentication system implemented for SocietyWeb. Users can now register and log in using their email address with One-Time Password (OTP) verification.

---

## Authentication Flow

### OTP-Based Login Flow
```
1. User registers with email
2. User provides email to request OTP
3. System generates 6-digit OTP and sends to email
4. User receives OTP in email (valid for 15 minutes)
5. User submit OTP for verification
6. System verifies OTP and issues JWT token
7. User is now logged in
```

---

## API Endpoints

### 1. Register with OTP
**Endpoint:** `POST /api/users/register-otp`

**Description:** Register a new user for OTP-based authentication

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "Flat_no": "101"
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully. Please check your email for further instructions.",
  "userId": "507f1f77bcf86cd799439011",
  "email": "john@example.com"
}
```

**Error Responses:**
- `400` - Missing required fields
- `409` - User already exists
- `500` - Server error

**Rate Limit:** 5 requests per 15 minutes per IP

---

### 2. Request OTP for Login
**Endpoint:** `POST /api/users/request-otp`

**Description:** Request an OTP code to log in

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Success Response (200):**
```json
{
  "message": "OTP sent to your email",
  "email": "john@example.com",
  "expiresIn": "15 minutes"
}
```

**Error Responses:**
- `400` - Email is required
- `404` - User not found
- `500` - Failed to send OTP email
- `500` - Server error

**Rate Limit:** 5 requests per 5 minutes per IP

**Email Template:**
- Subject: "🔐 Your OTP Verification Code - SocietyWeb"
- Contains: 6-digit OTP code
- Valid for: 15 minutes
- Formatted HTML email with professional design

---

### 3. Verify OTP and Login
**Endpoint:** `POST /api/users/verify-otp`

**Description:** Verify the OTP code and complete login

**Request Body:**
```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "Flat_no": "101",
    "is_verified": true
  }
}
```

**Error Responses:**
- `400` - Email and OTP are required
- `401` - Invalid OTP / OTP expired / Max attempts exceeded
- `404` - User not found
- `500` - Server error

**Rate Limit:** 10 requests per 15 minutes per IP

**Security Features:**
- Maximum 5 OTP verification attempts
- OTP expires after 15 minutes
- Invalid attempt count incremented per try
- Account security check on max attempts exceeded

---

### 4. Resend OTP
**Endpoint:** `POST /api/users/resend-otp`

**Description:** Resend OTP code to user's email

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Success Response (200):**
```json
{
  "message": "OTP resent to your email",
  "email": "john@example.com",
  "expiresIn": "15 minutes"
}
```

**Error Responses:**
- `400` - Email is required
- `404` - User not found
- `500` - Failed to send OTP email
- `500` - Server error

**Rate Limit:** 5 requests per 5 minutes per IP

---

## Legacy Password-Based Authentication

### 5. Register with Password (Legacy)
**Endpoint:** `POST /api/users/register`

**Description:** Register a new user with password (backward compatibility)

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePassword123",
  "Flat_no": "101"
}
```

**Success Response (201):**
```json
{
  "message": "User created successfully"
}
```

---

### 6. Login with Password (Legacy)
**Endpoint:** `POST /api/users/login`

**Description:** Login using email and password

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123",
  "Flat_no": "101"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "Flat_no": "101"
  }
}
```

---

## Protected Endpoints

### 7. Get User Profile
**Endpoint:** `GET /api/users/user/:Flat_no`

**Description:** Retrieve user profile (requires authentication)

**Headers:**
```
Cookie: token=<JWT_TOKEN>
```

**URL Params:**
- `Flat_no`: User's flat number

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "john_doe",
  "email": "john@example.com",
  "Flat_no": "101",
  "is_verified": true,
  "loginMethod": "otp",
  "createdAt": "2026-04-11T10:00:00.000Z"
}
```

---

### 8. Logout
**Endpoint:** `POST /api/users/logout`

**Description:** Logout user and clear authentication token

**Headers:**
```
Cookie: token=<JWT_TOKEN>
```

**Success Response (200):**
```json
{
  "message": "Logout successful"
}
```

---

## Email Templates

### OTP Verification Email
**Template Features:**
- Professional gradient header
- Clear OTP display (38px bold font)
- 15-minute expiry notice
- Security warning section
- Footer with company info
- Mobile-responsive design
- Color scheme: Purple gradient

**Sample:**
```
Subject: 🔐 Your OTP Verification Code - SocietyWeb

Your One-Time Password (OTP) for SocietyWeb login is: 123456
This OTP is valid for 15 minutes. Please do not share it with anyone.
If you didn't request this code, please ignore this email.
```

### Welcome Email (After Registration)
**Template Features:**
- User details display
- Account information summary
- Instructions for next steps
- Professional branding

---

## Database Schema Updates

### User Model Fields
```javascript
{
  username: String,
  email: String (unique),
  password: String (optional),
  Flat_no: String (unique),
  is_verified: Boolean (default: false),
  
  // OTP Fields
  otpCode: String,          // Current OTP code
  otpExpiry: Date,          // OTP expiration timestamp
  otpAttempts: Number,      // Failed OTP attempts count
  loginMethod: String,      // 'password' or 'otp'
  
  createdAt: Date (default: Now),
  isAdmin: Boolean (default: false)
}
```

---

## Error Handling

### Common Error Responses

**400 - Bad Request**
```json
{
  "message": "Email and OTP are required"
}
```

**401 - Unauthorized**
```json
{
  "message": "Invalid OTP. Please try again.",
  "attempts": 2
}
```

**404 - Not Found**
```json
{
  "message": "User not found"
}
```

**409 - Conflict**
```json
{
  "message": "User already exists"
}
```

**500 - Server Error**
```json
{
  "message": "Server error",
  "error": "Error details..."
}
```

---

## Rate Limiting

| Endpoint | Limit | Window |
|----------|-------|--------|
| Register | 5 requests | 15 minutes |
| Login | 10 requests | 15 minutes |
| Request OTP | 5 requests | 5 minutes |
| Resend OTP | 5 requests | 5 minutes |

---

## Security Features

1. **OTP Expiration:** OTPs expire after 15 minutes
2. **Attempt Limiting:** Maximum 5 failed verification attempts
3. **Rate Limiting:** API endpoints protected with rate limiting
4. **Password Hashing:** Passwords hashed with bcryptjs
5. **JWT Tokens:** 24-hour token validity
6. **HTTP-Only Cookies:** Tokens stored in secure HTTP-only cookies
7. **Email Validation:** User email verified before OTP issuance
8. **Secure OTP:** 6-digit cryptographically secure OTP generation

---

## Environment Variables

Create a `.env` file with the following variables:

```env
# Email Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
MAIL_FROM=noreply@societyweb.com

# Database
MONGO_URI=mongodb://localhost:27017/societyweb

# JWT
JWT_SECRET=your-secret-key

# Environment
NODE_ENV=development
```

---

## Implementation Examples

### Frontend - React Example

```javascript
// Request OTP
const requestOTP = async (email) => {
  const response = await fetch('/api/users/request-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  return response.json();
};

// Verify OTP
const verifyOTP = async (email, otp) => {
  const response = await fetch('/api/users/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, otp })
  });
  return response.json();
};

// Logout
const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    credentials: 'include'
  });
  return response.json();
};
```

### cURL Examples

**Request OTP:**
```bash
curl -X POST http://localhost:5000/api/users/request-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com"}'
```

**Verify OTP:**
```bash
curl -X POST http://localhost:5000/api/users/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","otp":"123456"}' \
  -c cookies.txt
```

**Get User:**
```bash
curl -X GET http://localhost:5000/api/users/user/101 \
  -b cookies.txt
```

---

## Testing Checklist

- [ ] User registration with OTP
- [ ] OTP request works correctly
- [ ] OTP sent to email
- [ ] OTP verification successful
- [ ] Invalid OTP rejected
- [ ] OTP expiration works
- [ ] Maximum attempts enforcement
- [ ] Resend OTP functionality
- [ ] JWT token generation
- [ ] User profile retrieval
- [ ] Logout functionality
- [ ] Legacy password auth still works
- [ ] Rate limiting active
- [ ] Email templates display correctly

---

## Troubleshooting

### OTP not being sent
1. Check email configuration in `.env`
2. Verify Gmail app password (if using Gmail)
3. Check email provider SMTP settings
4. Review server logs for email errors

### OTP already expired
1. OTPs are valid for 15 minutes
2. Use "Resend OTP" endpoint to get a new code
3. Check client-server time synchronization

### Too many requests error
1. Wait for rate limit window to expire
2. Review rate limit configuration in routes
3. Implement progressive backoff in frontend

---

## Migration from Old System

If migrating from password-based to OTP-based:

1. Export existing users
2. Set `loginMethod: 'password'` for existing users
3. Create migration script to update fields
4. Test both authentication methods
5. Gradually migrate users to OTP method

---

## Support & Feedback

For issues or feature requests, please contact the development team.

**Last Updated:** April 11, 2026
**Version:** 1.0.0
