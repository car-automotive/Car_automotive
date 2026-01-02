# Debugging Blank Screen Issue

## Step-by-Step Debugging

### 1. Check Browser Console
Open DevTools (F12) → Console tab and look for:
- Red error messages
- Failed network requests
- Import errors

### 2. Check Network Tab
Open DevTools → Network tab:
- Look for failed requests (red)
- Check if `/api/cars/featured` is failing
- Check if backend is responding

### 3. Verify Backend is Running
```bash
cd backend
npm run dev
```

You should see:
```
✅ Using in-memory database (no MongoDB required)
✅ Sample data initialized
✅ Default admin user created: admin@example.com / admin123
🚀 Server running on port 5000
```

### 4. Test Backend Directly
Open browser and go to: `http://localhost:5000/api/health`

You should see: `{"status":"OK","message":"Server is running"}`

### 5. Test Frontend API
Open browser and go to: `http://localhost:5173/api/cars/featured`

If this fails, the proxy isn't working.

### 6. Check Frontend Terminal
Look for:
- Vite compilation errors
- Import errors
- Build warnings

### 7. Clear Everything and Restart
```bash
# Stop both servers (Ctrl+C)

# Clear browser cache
# Press Ctrl+Shift+Delete → Clear cache

# Clear localStorage
# Open DevTools → Application → Local Storage → Clear

# Restart backend
cd backend
npm run dev

# Restart frontend (new terminal)
cd frontend
npm run dev
```

### 8. Check if Basic HTML Renders
If you see a completely blank page (not even the HTML structure), check:
- Is the `<div id="root"></div>` in the HTML?
- Is the script tag loading?
- Are there any CORS errors?

### Common Issues:

**Issue: Backend not running**
- Solution: Start backend server

**Issue: CORS errors**
- Solution: Make sure backend has `FRONTEND_URL=http://localhost:5173` in `.env`

**Issue: Network errors**
- Solution: Check if backend is on port 5000 and frontend on 5173

**Issue: Import errors**
- Solution: Run `npm install` in both directories

**Issue: React rendering error**
- Solution: Check browser console for component errors

