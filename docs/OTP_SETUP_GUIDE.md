# Email OTP Authentication Setup Guide

## 📋 Quick Start

This guide walks you through implementing the email OTP-based authentication system for SocietyWeb.

---

## 📦 Prerequisites

- Node.js v14+ and npm
- MongoDB v4.0+
- Gmail account (or any SMTP-compatible email service)
- .env file configuration

---

## 🚀 Installation & Setup

### 1. Install Required Dependencies

All required packages are already in `package.json`:

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the project root:

```env
# MongoDB
MONGO_URI=mongodb://localhost:27017/societyweb

# Email Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-specific-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
MAIL_FROM=noreply@societyweb.com

# JWT
JWT_SECRET=your-super-secure-secret-key-here-min-32-chars

# Server
NODE_ENV=development
PORT=5000
```

### 3. Gmail Setup (Important!)

If using Gmail:

1. Enable 2-Factor Authentication on your Google Account
2. Generate an App Password:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Select "App passwords"
   - Choose Email and Device to generate a password
   - Copy the 16-character password
   - Use this as `GMAIL_PASS` in `.env`

### 4. Database Setup

Ensure MongoDB is running:

```bash
# On Windows
mongod

# On macOS/Linux
brew services start mongodb-community
# or
sudo systemctl start mongod
```

### 5. Start the Server

```bash
# Development mode (with live reload)
npm run dev

# Production mode
npm start
```

Server should start at `http://localhost:5000`

---

## 🏗 Project Structure

```
SocietyWeb/
├── src/
│   ├── controllers/
│   │   └── users.controllers.js      # OTP controllers
│   ├── models/
│   │   └── auth/
│   │       └── user.models.js        # Updated with OTP fields
│   ├── routes/
│   │   └── users.routes.js           # OTP endpoints
│   ├── middlewares/
│   │   └── auth.middleware.js        # JWT authentication
│   ├── utils/
│   │   ├── email_verfying.js         # Email sending
│   │   └── emailTemplates.js         # Email templates (NEW)
│   └── components/
│       ├── OTPLoginForm.jsx          # React component (NEW)
│       └── OTPLoginForm.css          # Styling (NEW)
├── otp.js                            # OTP utilities (NEW)
├── docs/
│   └── OTP_AUTH_API.md               # API documentation (NEW)
└── .env                              # Environment variables
```

---

## 📚 API Quick Reference

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register-otp` | Register new user with OTP |
| POST | `/api/users/request-otp` | Request OTP for login |
| POST | `/api/users/verify-otp` | Verify OTP and complete login |
| POST | `/api/users/resend-otp` | Resend OTP code |
| POST | `/api/users/register` | Register with password (legacy) |
| POST | `/api/users/login` | Login with password (legacy) |
| POST | `/api/users/logout` | Logout user |
| GET | `/api/users/user/:Flat_no` | Get user profile |

---

## 🔧 Implementation Steps

### Step 1: Register New User

**Request:**
```bash
curl -X POST http://localhost:5000/api/users/register-otp \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "Flat_no": "101"
  }'
```

**Response:**
```json
{
  "message": "User registered successfully. Please check your email for further instructions.",
  "userId": "507f1f77bcf86cd799439011",
  "email": "john@example.com"
}
```

### Step 2: Request OTP

**Request:**
```bash
curl -X POST http://localhost:5000/api/users/request-otp \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com"}'
```

**Response:**
```json
{
  "message": "OTP sent to your email",
  "email": "john@example.com",
  "expiresIn": "15 minutes"
}
```

User receives email with OTP code (valid for 15 minutes)

### Step 3: Verify OTP

**Request:**
```bash
curl -X POST http://localhost:5000/api/users/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "otp": "123456"
  }'
```

**Response:**
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

---

## 🎨 Frontend Integration

### Using the React Component

1. Copy the component files to your React project:
   - `src/components/OTPLoginForm.jsx`
   - `src/components/OTPLoginForm.css`

2. Import in your app:

```javascript
import OTPLoginForm from './components/OTPLoginForm';

function App() {
  return (
    <div className="App">
      <OTPLoginForm />
    </div>
  );
}

export default App;
```

3. The component handles all authentication steps automatically:
   - Registration
   - OTP request
   - OTP verification
   - Token storage

### Custom Integration

```javascript
// services/authService.js

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const authService = {
  // Register new user
  async registerOTP(username, email, flatNo) {
    const response = await fetch(`${API_BASE}/users/register-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, Flat_no: flatNo })
    });
    return response.json();
  },

  // Request OTP
  async requestOTP(email) {
    const response = await fetch(`${API_BASE}/users/request-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return response.json();
  },

  // Verify OTP
  async verifyOTP(email, otp) {
    const response = await fetch(`${API_BASE}/users/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, otp })
    });
    return response.json();
  },

  // Resend OTP
  async resendOTP(email) {
    const response = await fetch(`${API_BASE}/users/resend-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return response.json();
  },

  // Logout
  async logout() {
    const response = await fetch(`${API_BASE}/users/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    return response.json();
  }
};
```

---

## 🧪 Testing the System

### Manual Testing with Postman

1. Open Postman or Insomnia
2. Create new request: POST `http://localhost:5000/api/users/register-otp`
3. Set body to:
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "Flat_no": "202"
}
```

4. Check your email for the welcome message
5. Request OTP: POST `http://localhost:5000/api/users/request-otp`
6. Check email for OTP code
7. Verify OTP: POST `http://localhost:5000/api/users/verify-otp`
8. Get token from response

### Automated Testing Script

```javascript
// test-otp-flow.js
const API_URL = 'http://localhost:5000/api';

async function testOTPFlow() {
  try {
    console.log('1️⃣ Testing user registration...');
    const regRes = await fetch(`${API_URL}/users/register-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'testuser',
        email: 'test@example.com',
        Flat_no: '303'
      })
    });
    const regData = await regRes.json();
    console.log('✅ Registration:', regData);

    console.log('\n2️⃣ Testing OTP request...');
    const otpRes = await fetch(`${API_URL}/users/request-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com' })
    });
    const otpData = await otpRes.json();
    console.log('✅ OTP Requested:', otpData);

    console.log('\n3️⃣ Check email for OTP code and update the script');
    console.log('   (Manual step: Copy OTP from email)');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testOTPFlow();
```

Run with:
```bash
node test-otp-flow.js
```

---

## 🔒 Security Features

### Implemented Security Measures

1. **OTP Expiration** - 15 minutes
2. **Attempt Limiting** - Max 5 failed attempts
3. **Rate Limiting** - Prevents brute force attacks
4. **Password Hashing** - bcryptjs with salt rounds
5. **JWT Tokens** - 24-hour expiry
6. **HTTP-Only Cookies** - XSS protection
7. **CORS Protection** - Configurable origins
8. **Email Verification** - User ownership validation

### Best Practices

1. **Never log OTP codes** - Only log hashes
2. **Always use HTTPS** in production
3. **Validate email addresses** - RFC 5322 compliant
4. **Monitor failed attempts** - Alert on suspicious activity
5. **Regular token refresh** - Implement refresh tokens for long sessions
6. **IP whitelisting** (optional) - For additional security

---

## 🐛 Troubleshooting

### OTP Not Being Sent

**Problem:** "Failed to send OTP email"

**Solutions:**
1. Check `.env` file for correct GMAIL_USER and GMAIL_PASS
2. If using Gmail, verify App Password is set correctly
3. Check email inbox for "Less secure app access" notification from Google
4. Test SMTP connection:

```javascript
// test-email.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email config error:', error);
  } else {
    console.log('✅ Email server ready');
  }
});
```

### "Too many requests" Error

**Problem:** Rate limiting activated

**Solutions:**
1. Wait for the rate limit window to expire
2. Adjust rate limits in `src/routes/users.routes.js`
3. Use different IP/network
4. Clear browser cache

### OTP Already Expired

**Problem:** "OTP has expired"

**Solutions:**
1. OTPs valid for 15 minutes - request new OTP
2. Use "Resend OTP" endpoint
3. Check server time synchronization

### Database Connection Issues

**Problem:** "Cannot connect to MongoDB"

**Solutions:**
1. Ensure MongoDB is running: `mongod`
2. Verify `MONGO_URI` in `.env`
3. Check MongoDB user credentials
4. Use connection string with auth: `mongodb://user:pass@localhost:27017/societyweb`

---

## 📊 Monitoring & Logging

### Monitor Failed Login Attempts

```javascript
// In users.controllers.js
const logAttempt = async (email, success, reason) => {
  console.log(`[${new Date().toISOString()}] Email: ${email}, Success: ${success}, Reason: ${reason}`);
  // Store in database for analytics
};
```

### Check Server Logs

```bash
# For development
npm run dev

# Check logs in console
# Look for:
# - "OTP sent to..."
# - "OTP verified successfully"
# - "Invalid OTP attempt"
```

---

## 🚀 Deployment

### Deploy to Production

1. **Set production environment:**
```env
NODE_ENV=production
SMTP_SECURE=true
```

2. **Use environment variables:**
```bash
export MONGODB_URI=production_mongo_url
export GMAIL_USER=prod_email
export GMAIL_PASS=prod_app_password
export JWT_SECRET=long_secure_random_string
```

3. **Enable HTTPS** - Required for secure cookies

4. **Update CORS** - Allow frontend domain:
```javascript
// index.js
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

---

## 📞 Support & FAQ

**Q: Can I customize the OTP length?**
A: Yes, modify `generateOTP()` in `otp.js`

**Q: Can I change the OTP expiry time?**
A: Yes, modify `getOTPExpiry()` in `otp.js` (default: 15 minutes)

**Q: Can I use a different email provider?**
A: Yes, update SMTP settings in `.env`

**Q: How do I integrate with frontend?**
A: Use provided React component or follow API documentation

**Q: Can I have both password and OTP login?**
A: Yes, both are implemented and work simultaneously

---

## 📞 Additional Resources

- Full API Documentation: [OTP_AUTH_API.md](./OTP_AUTH_API.md)
- Email Templates: `src/utils/emailTemplates.js`
- OTP Utilities: `otp.js`
- React Component: `src/components/OTPLoginForm.jsx`

---

## ✅ Implementation Checklist

- [ ] Environment variables configured
- [ ] MongoDB running and connected
- [ ] Email service configured
- [ ] Dependencies installed
- [ ] Server starts without errors
- [ ] OTP registration working
- [ ] Email sending verified
- [ ] OTP verification successful
- [ ] JWT token generated
- [ ] Frontend component integrated
- [ ] Rate limiting active
- [ ] Error handling tested
- [ ] Security features verified
- [ ] Production deployment ready

---

**Version:** 1.0.0  
**Last Updated:** April 11, 2026

For updates and support, refer to the main project documentation.
