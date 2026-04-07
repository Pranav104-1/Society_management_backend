# 🚀 Quick Start Guide

## 5-Minute Setup

### Step 1: Install Dependencies

**Backend:**
```bash
# Already in root directory
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 2: Configure Environment Variables

**Backend (.env in root):**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/society-web
JWT_SECRET=your-secret-key-here
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
NODE_ENV=development
```

**Frontend (.env in frontend/):**
```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Society Web
```

### Step 3: Run the Application

**Terminal 1 - Backend:**
```bash
npm run dev
# Output: Server running on port http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Output: VITE v5.0.0 ready in 123 ms ➜ local: http://localhost:5173/
```

### Step 4: Open in Browser

Visit: `http://localhost:5173`

---

## 📱 What You'll See

### Home Page
- Beautiful landing page with features
- Call-to-action buttons
- Statistics overview
- Navigation to login/register

### Authentication
1. Click "Register" to create account
2. Enter name, email, password
3. Click "Sign In" to login
4. Enter email and password

### Dashboard
- View statistics (total, resolved, pending, open)
- Click "+ New Complaint" to file a complaint
- View all your complaints in a grid
- See complaint status with color badges

---

## 🎯 Key Features

✅ **Responsive Design** - Works on all devices
✅ **Beautiful UI** - Modern gradient design
✅ **User Authentication** - Secure login/register
✅ **Complaint Management** - File and track complaints
✅ **Dashboard** - View statistics and complaints
✅ **Mobile Optimized** - Touch-friendly interface

---

## 🔗 API Endpoints

### Users
- `POST /api/users/login` - Login
- `POST /api/users/register` - Register
- `POST /api/users/logout` - Logout
- `GET /api/users/profile` - Get profile

### Complaints
- `GET /api/complaints` - Get all complaints
- `POST /api/complaints` - Create complaint
- `PUT /api/complaints/:id` - Update complaint
- `DELETE /api/complaints/:id` - Delete complaint

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/complaints` - Get all complaints

---

## 📁 File Structure

```
SocietyWeb/
├── src/                     (Backend code)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── utils/
├── frontend/                (React app)
│   └── src/
│       ├── pages/          (Login, Register, Dashboard, Home)
│       ├── components/     (Navbar)
│       ├── services/       (API calls)
│       ├── store/          (State management)
│       └── styles/         (CSS)
└── uploads/                (File uploads)
```

---

## 🛠 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# For frontend port 5173
lsof -ti:5173 | xargs kill -9
```

### MongoDB Connection Failed
- Make sure MongoDB is running locally
- Check MONGODB_URI in .env
- Or use MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/dbname`

### API Not Responding
- Check backend is running: `http://localhost:5000`
- Check API endpoint in frontend vite.config.js proxy

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Frontend Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Landing page |
| Login | `/login` | User login |
| Register | `/register` | New user signup |
| Dashboard | `/dashboard` | Main dashboard (protected) |

---

## 🎨 Design Features

- **Gradient Backgrounds**: Beautiful blue-to-indigo gradients
- **Card Layout**: Clean, modern card components
- **Status Badges**: Color-coded complaint status
- **Responsive Grid**: Auto-adjusts columns based on screen size
- **Smooth Animations**: Hover effects and transitions
- **Professional Typography**: Inter font from Google Fonts

---

## 🔐 Security Features

- JWT token authentication
- Password hashing with bcryptjs
- HTTP-only cookies
- CORS protection
- Rate limiting on API
- Input validation
- Protected routes

---

## 💾 Build for Production

### Frontend
```bash
cd frontend
npm run build
# Creates dist/ folder
npm run preview  # Preview build
```

### Deploy Options
- **Vercel** (Recommended): `vercel deploy`
- **Netlify**: `netlify deploy --prod`
- **GitHub Pages**: Push to gh-pages branch
- **Traditional Hosting**: Copy dist/ contents to server

---

## 📊 Performance Features

- Lazy loading with React Router
- Code splitting with Vite
- Minified CSS with Tailwind
- Optimized images with Cloudinary
- Fast development with Vite's HMR

---

## ✨ Screenshots

### Home Page
- Hero section with gradient
- 6 feature cards
- Statistics section
- Footer with links

### Login/Register
- Centered card design
- Gradient backgrounds
- Form validation
- Error handling

### Dashboard
- Statistics cards at top
- Complaint filing form
- Grid of complaints
- Status badges

---

## 🎓 Learning Resources

- Frontend: https://react.dev
- Styling: https://tailwindcss.com
- Routing: https://reactrouter.com
- State: https://github.com/pmndrs/zustand
- Backend: https://expressjs.com

---

## 📞 Support

For issues or questions:
1. Check the error message carefully
2. Review the troubleshooting section
3. Check backend logs: `npm run dev`
4. Check browser console (F12 → Console)
5. Check network tab in DevTools

---

**You're all set! Happy coding! 🎉**
