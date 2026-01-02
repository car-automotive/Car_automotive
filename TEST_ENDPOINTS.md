# 🧪 Test Endpoints to Debug Wishlist & Bookings

## After Restarting Backend, Test These:

### 1. Login First (Get Token):
```bash
# Use Postman, curl, or browser
POST http://localhost:5000/api/auth/login
Body: {
  "email": "admin@example.com",
  "password": "admin123"
}
```

### 2. Test Wishlist (with token):
```bash
GET http://localhost:5000/api/users/wishlist
Headers: {
  "Authorization": "Bearer YOUR_TOKEN_HERE"
}
```

### 3. Test Bookings (with token):
```bash
GET http://localhost:5000/api/bookings/my-bookings
Headers: {
  "Authorization": "Bearer YOUR_TOKEN_HERE"
}
```

## Quick Browser Test:

1. **Login in browser:**
   - Go to: http://localhost:5173/login
   - Login with admin credentials
   - Check browser console (F12) for any errors

2. **Check Network Tab:**
   - F12 → Network tab
   - Go to Wishlist page
   - Look for `/api/users/wishlist` request
   - Check if it returns data

3. **Check Response:**
   - Click on the request
   - Go to "Response" tab
   - Should see JSON with cars array

## Common Issues:

1. **Not Logged In:**
   - Make sure you're logged in
   - Check if token exists in localStorage (F12 → Application → Local Storage)

2. **Token Expired:**
   - Logout and login again
   - Get a fresh token

3. **User ID Mismatch:**
   - The fix I just made should resolve this
   - Restart backend after the fix

