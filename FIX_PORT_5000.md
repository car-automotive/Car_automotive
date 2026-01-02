# Fix Port 5000 Already in Use Error

## Quick Fix:

**Option 1: Kill the process using port 5000**
```powershell
# Find the process
Get-NetTCPConnection -LocalPort 5000 | Select-Object OwningProcess

# Kill it (replace PID with the number you found)
Stop-Process -Id <PID> -Force
```

**Option 2: Change backend port**

Edit `backend/server.js` and change:
```javascript
const PORT = process.env.PORT || 5001;  // Changed from 5000 to 5001
```

Then update `frontend/vite.config.js`:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5001',  // Changed from 5000 to 5001
    changeOrigin: true
  }
}
```

## Why This Happens:

- You might have another backend server running
- Previous server didn't close properly
- Another application is using port 5000

## Prevention:

Always stop servers with `Ctrl+C` before starting new ones!

