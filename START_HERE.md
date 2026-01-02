# 🚀 START HERE - Get Your App Running!

## Quick Fix for Blank Page Issue

The blank page is likely because:
1. Backend server isn't running, OR
2. MongoDB isn't connected

## Step 1: Start Backend Server

Open a terminal and run:
```bash
cd backend
npm install
npm run dev
```

**Expected output:**
```
✅ MongoDB Connected (if MongoDB is set up)
🚀 Server running on port 5000
```

**If you see MongoDB error:** That's OK! The server will still run. You just need to set up MongoDB.

## Step 2: Start Frontend Server

Open a **NEW terminal** and run:
```bash
cd frontend
npm install
npm run dev
```

**Expected output:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

## Step 3: Open Browser

Go to: **http://localhost:5173**

You should now see the app! (Even if MongoDB isn't connected, the UI should load)

## Step 4: Set Up MongoDB (5 minutes - FREE!)

**You have 2 options:**

### Option A: MongoDB Atlas (Recommended - No Installation!)
- **FREE** cloud database
- Takes 5 minutes to set up
- No installation needed
- See `QUICK_MONGODB_SETUP.md` for step-by-step instructions

### Option B: Install MongoDB Locally
- Download from: https://www.mongodb.com/try/download/community
- Install and start MongoDB service
- Use connection string: `mongodb://localhost:27017/car-automotive`

## Step 5: Create .env File

Create `backend/.env` file with:

```env
PORT=5000
NODE_ENV=development

# MongoDB Atlas connection string (get from QUICK_MONGODB_SETUP.md)
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/car-automotive?retryWrites=true&w=majority

# Or for local MongoDB:
# MONGODB_URI=mongodb://localhost:27017/car-automotive

# JWT Secrets (use any random strings for development)
JWT_SECRET=dev-secret-key-12345
JWT_REFRESH_SECRET=dev-refresh-secret-12345
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d

# Cloudinary (optional for now - you can add images later)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

## Step 6: Restart Backend

After creating `.env` file:
```bash
# Stop the server (Ctrl+C) and restart:
cd backend
npm run dev
```

You should now see: `✅ MongoDB Connected`

## Still See Blank Page?

1. **Check browser console** (F12 → Console tab) for errors
2. **Check backend terminal** for error messages
3. **Check frontend terminal** for error messages
4. **Try hard refresh**: Ctrl+Shift+R
5. **Make sure both servers are running** (backend on port 5000, frontend on port 5173)

## Need Help?

- See `TROUBLESHOOTING.md` for detailed troubleshooting
- See `QUICK_MONGODB_SETUP.md` for MongoDB Atlas setup
- See `SETUP.md` for full setup instructions

## What You Should See

Once everything is working:
- ✅ Homepage with hero section
- ✅ Navigation bar at top
- ✅ Footer at bottom
- ✅ "Featured Cars" section (empty until you add cars via admin)

The app will work even without MongoDB, but you need MongoDB to:
- Register/Login users
- Add/view cars
- Make bookings
- Use admin features

