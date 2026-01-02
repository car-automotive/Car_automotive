# 🚀 START THE APP - Step by Step

## IMPORTANT: Follow These Steps in Order

### Step 1: Install Dependencies (If Not Done)

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 2: Start Backend Server

Open **Terminal 1**:
```bash
cd backend
npm run dev
```

**Wait for this output:**
```
✅ Using in-memory database (no MongoDB required)
✅ Sample data initialized
✅ Default admin user created: admin@example.com / admin123
🚀 Server running on port 5000
```

**If you see errors, stop and fix them first!**

### Step 3: Test Backend

Open browser and go to: **http://localhost:5000/api/health**

You should see: `{"status":"OK","message":"Server is running"}`

**If this doesn't work, the backend isn't running properly!**

### Step 4: Start Frontend Server

Open **Terminal 2** (NEW TERMINAL):
```bash
cd frontend
npm run dev
```

**Wait for this output:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### Step 5: Open Browser

Go to: **http://localhost:5173**

### Step 6: If You See Blank Screen

1. **Press F12** to open DevTools
2. **Go to Console tab**
3. **Look for red errors**
4. **Share the error messages with me**

### Step 7: Check Network

1. **Press F12** → **Network tab**
2. **Refresh the page**
3. **Look for failed requests** (they'll be red)
4. **Check if `/api/cars/featured` is failing**

## Common Issues:

### "Cannot GET /"
- Backend is not running → Start it with `cd backend && npm run dev`

### "Failed to fetch"
- Backend is not running → Start it with `cd backend && npm run dev`
- Or backend is on wrong port → Check it's on port 5000

### "Module not found"
- Dependencies not installed → Run `npm install` in both directories

### Blank white screen
- Check browser console (F12) for errors
- Make sure both servers are running
- Try hard refresh: Ctrl+Shift+R

## Quick Test:

1. Backend running? → http://localhost:5000/api/health
2. Frontend running? → http://localhost:5173
3. Both working? → App should load!

