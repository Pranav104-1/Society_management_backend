# 🚀 Deployment Guide

## Deployment Options

### Option 1: Vercel (Recommended for Frontend)

#### Prerequisites
- Vercel account (free at vercel.com)
- GitHub account with repository

#### Steps

1. **Connect GitHub to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Frontend**
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variables:
     ```
     VITE_API_URL=https://your-backend-url/api
     ```

3. **Deploy**
   - Click "Deploy"
   - Vercel automatically deploys on every push

**Frontend URL:** `https://your-app.vercel.app`

---

### Option 2: Netlify (Alternative for Frontend)

#### Steps

1. **Connect Repository**
   - Go to https://netlify.com
   - Click "New site from Git"
   - Connect GitHub

2. **Configure Build**
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Add Environment Variables**
   - Site settings → Environment
   - Add `VITE_API_URL`

4. **Deploy**
   - Click "Deploy"

**Frontend URL:** `https://your-app.netlify.app`

---

### Option 3: Render (Backend Hosting)

#### Prerequisites
- Render account (free tier available)
- GitHub repository

#### Steps

1. **Create Web Service**
   - Go to https://render.com
   - New → Web Service
   - Connect GitHub

2. **Configure**
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Region: US (or closest to you)

3. **Add Environment Variables**
   ```
   PORT=5000
   MONGODB_URI=your-mongodb-uri
   JWT_SECRET=your-secret
   CLOUDINARY_NAME=your-cloudinary-name
   CLOUDINARY_API_KEY=your-key
   CLOUDINARY_API_SECRET=your-secret
   EMAIL_USER=your-email
   EMAIL_PASSWORD=your-password
   NODE_ENV=production
   ```

4. **Deploy**
   - Click "Create Web Service"

**Backend URL:** `https://your-app.onrender.com`

---

### Option 4: Railway (Simple Backend Hosting)

#### Steps

1. **Connect Repository**
   - Go to https://railway.app
   - New Project → Import from GitHub

2. **Configure Variables**
   - Add all environment variables
   - Same as Render config

3. **Deploy**
   - Railway auto-deploys

**Backend URL:** `https://your-app.up.railway.app`

---

### Option 5: MongoDB Atlas (Database)

#### Setup

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up (free tier available)

2. **Create Cluster**
   - Click "Create Deployment"
   - Choose Free tier
   - Select region closest to you

3. **Get Connection String**
   - Click "Connect"
   - Copy connection string
   - Replace username and password

4. **Use in .env**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/societyweb?retryWrites=true&w=majority
   ```

---

## Production Deployment Guide

### Step 1: Prepare Code

```bash
# Backend - Update CORS for production URLs
# In index.js, update CORS config:
cors({
    origin: ['https://your-frontend-url.vercel.app'],
    credentials: true,
})

# Frontend - Update API URL
# In frontend/.env:
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### Step 2: Test Production Build

```bash
# Backend
npm start

# Frontend
cd frontend
npm run build
npm run preview
```

### Step 3: Deploy Backend

**Using Render:**
```bash
git push origin main
# Render auto-deploys on push
```

### Step 4: Deploy Frontend

**Using Vercel:**
```bash
git push origin main
# Vercel auto-deploys on push
```

### Step 5: Update Frontend Environment

After backend is deployed:
1. Add API URL to Vercel Environment Variables
2. Redeploy frontend

---

## Environment Variables Summary

### Backend (.env)
```
# Server
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname

# Authentication
JWT_SECRET=your-very-secret-key-change-this

# Cloudinary (Image Upload)
CLOUDINARY_NAME=your-name
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret

# Email
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url/api
VITE_APP_NAME=Society Web
```

---

## Domain Setup (Optional)

### Custom Domain on Vercel

1. Go to Settings → Domains
2. Add custom domain
3. Update DNS records (usually done automatically)
4. Wait for SSL certificate

### Custom Domain on Render

1. Go to Settings → Custom Domain
2. Add domain
3. Update DNS records in domain registrar

---

## Monitoring & Maintenance

### Vercel Dashboard
- Analytics
- Performance metrics
- Deployment history
- Error logs

### Render Dashboard
- Logs
- Metrics
- Environment variables
- Restart service

### MongoDB Atlas
- Database performance
- Backups
- Connection monitoring

---

## Troubleshooting Deployment

### Frontend Not Loading
```
1. Check build logs in Vercel/Netlify
2. Verify API URL is correct
3. Check CORS settings in backend
4. Clear browser cache (Ctrl+Shift+Delete)
```

### API Not Responding
```
1. Check backend logs in Render/Railway
2. Verify environment variables are set
3. Check MongoDB connection
4. Verify CORS origin matches frontend URL
```

### Database Connection Failed
```
1. Check MongoDB URI is correct
2. Verify IP whitelist in MongoDB Atlas
3. Check username/password
4. Ensure database name is correct
```

### Images Not Loading
```
1. Check Cloudinary credentials
2. Verify image upload is working
3. Check Cloudinary URL format
4. Verify file permissions
```

---

## Performance Optimization

### Frontend
- Build output should be < 2MB
- Images should be < 100KB each
- Use lazy loading
- Enable gzip compression

### Backend
- Use database indexing
- Implement response caching
- Optimize queries
- Use compression middleware

---

## Security Checklist

- [ ] Change JWT_SECRET to strong value
- [ ] Enable HTTPS everywhere
- [ ] Update CORS to production domains only
- [ ] Use environment variables for secrets
- [ ] Enable MongoDB Atlas IP whitelist
- [ ] Use strong email password
- [ ] Implement rate limiting
- [ ] Add CSRF protection
- [ ] Sanitize user inputs
- [ ] Add security headers

---

## Backup & Recovery

### Database Backups
- MongoDB Atlas provides automatic backups
- Set backup window during off-peak hours
- Test restore procedures regularly

### Code Backups
- Git repository is your backup
- Push to multiple remotes
- Tag releases

---

## Scaling Considerations

### When to Scale
- Traffic increases significantly
- Database queries become slow
- Need higher uptime

### Scaling Options
- Upgrade database tier
- Add caching layer (Redis)
- Use CDN for static assets
- Load balancing
- Database replication

---

## Cost Estimates (Monthly)

### Vercel Frontend
- Free tier: $0
- Pro tier: $20+

### Render Backend
- Free tier: $0 (sleeps after 15 min inactivity)
- Paid tier: $7+

### MongoDB Atlas
- Free tier: $0
- Paid tier: $57+ (M10 cluster)

### Cloudinary
- Free tier: $0 (25GB storage)
- Paid tier: varies by usage

**Total Estimated Cost: $0-$100/month**

---

## Post-Deployment Checklist

- [ ] Test login/register functionality
- [ ] Verify complaint filing works
- [ ] Check dashboard loads correctly
- [ ] Test file uploads
- [ ] Verify email functionality
- [ ] Check responsive design on mobile
- [ ] Monitor error logs
- [ ] Set up analytics
- [ ] Create admin account
- [ ] Test admin dashboard

---

## Support & Resources

- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
- Express Deployment: https://expressjs.com/en/advanced/best-practice-performance.html

---

**Your app is ready to go live! 🎉**
