# 🚨 QUICK FIX FOR BLANK SCREEN

## Step 1: Test if React is Working

Temporarily replace `frontend/src/App.jsx` content with this SIMPLE version:

```jsx
function App() {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1 style={{ color: 'green', fontSize: '48px' }}>✅ React Works!</h1>
      <p style={{ fontSize: '24px' }}>If you see this, React is rendering.</p>
      <p>Now we know the issue is in the components, not React itself.</p>
    </div>
  )
}

export default App
```

**If you see "React Works!" → React is fine, issue is in components**
**If you still see blank → React isn't loading at all**

## Step 2: Check Browser Console

Press F12 → Console tab → Look for:
- Red errors
- Failed imports
- Network errors

## Step 3: Verify Servers

**Backend:**
```bash
cd backend
npm run dev
```
Should show: `🚀 Server running on port 5000`

**Frontend:**
```bash
cd frontend  
npm run dev
```
Should show: `Local: http://localhost:5173/`

## Step 4: Test Backend

Open: http://localhost:5000/api/health
Should see: `{"status":"OK","message":"Server is running"}`

## Step 5: Check Network

F12 → Network tab → Refresh page
- Look for failed requests (red)
- Check if `/api/cars/featured` is failing

