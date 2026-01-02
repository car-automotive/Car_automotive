# Troubleshooting Guide

## Blank White Page Issue

If you see a blank white page when opening `http://localhost:5173`, follow these steps:

### Step 1: Check Browser Console
1. Open Developer Tools (Press `F12` or `Right-click → Inspect`)
2. Go to the **Console** tab
3. Look for any red error messages
4. Copy the error message and check what it says

### Step 2: Verify Dev Server is Running
Make sure the frontend dev server is running:
```bash
cd frontend
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Step 3: Check Backend is Running
Make sure the backend server is also running:
```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB Connected
🚀 Server running on port 5000
```

### Step 4: Common Issues and Fixes

#### Issue: "Failed to resolve import"
**Fix:** Check that all import paths are correct. Files in `pages/admin/` need `../../` to go up two levels.

#### Issue: "Cannot find module"
**Fix:** Run `npm install` in both frontend and backend directories.

#### Issue: CORS errors
**Fix:** Make sure `FRONTEND_URL=http://localhost:5173` is set in `backend/.env`

#### Issue: MongoDB connection errors
**Fix:** 
- Verify your MongoDB Atlas connection string in `backend/.env`
- Make sure your IP is whitelisted in MongoDB Atlas Network Access
- Check that your cluster is not paused

#### Issue: Redux/Store errors
**Fix:** Make sure all Redux slices are properly exported and imported.

### Step 5: Clear Cache and Restart
1. Stop both servers (Ctrl+C)
2. Clear browser cache (Ctrl+Shift+Delete)
3. Clear localStorage:
   - Open DevTools → Application → Local Storage → Clear
4. Restart both servers:
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

### Step 6: Check Network Tab
1. Open DevTools → Network tab
2. Refresh the page
3. Look for failed requests (red entries)
4. Check if API calls are failing

### Step 7: Verify Environment Variables
Make sure `backend/.env` has all required variables:
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `FRONTEND_URL`

### Still Not Working?

1. **Check the terminal** where `npm run dev` is running for error messages
2. **Check browser console** for JavaScript errors
3. **Verify file structure** - all files should be in the correct locations
4. **Try a hard refresh**: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Quick Test
To test if React is working, temporarily replace `App.jsx` content with:
```jsx
function App() {
  return <div>Hello World - React is working!</div>
}
export default App
```

If this shows, React is working and the issue is in your components.

