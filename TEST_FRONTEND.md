# Quick Frontend Test

To test if the frontend is working, try this:

## Test 1: Check if React is Rendering

1. Open browser console (F12)
2. Type: `document.getElementById('root')`
3. You should see the root div element

## Test 2: Check if Backend is Running

1. Open: http://localhost:5000/api/health
2. Should see: `{"status":"OK","message":"Server is running"}`

## Test 3: Check if API Proxy Works

1. Open: http://localhost:5173/api/health
2. Should see the same response as Test 2

## Test 4: Check Browser Console

Look for these errors:
- `Failed to fetch` → Backend not running
- `Cannot read property` → Component error
- `Module not found` → Import error
- `Unexpected token` → Syntax error

## Test 5: Minimal Render Test

If you see a blank screen, the issue might be:
1. **Backend not running** - Start it with `cd backend && npm run dev`
2. **Frontend build error** - Check terminal where `npm run dev` is running
3. **JavaScript error** - Check browser console (F12)
4. **CSS not loading** - Check if Tailwind is compiling

## Quick Fix Checklist

- [ ] Backend running on port 5000?
- [ ] Frontend running on port 5173?
- [ ] No errors in backend terminal?
- [ ] No errors in frontend terminal?
- [ ] No errors in browser console?
- [ ] Can access http://localhost:5000/api/health?
- [ ] Can access http://localhost:5173?

