# Setup Guide

## Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 3. MongoDB Setup (Recommended: MongoDB Atlas - No Installation Required!)

**MongoDB Atlas is FREE and requires no local installation!**

#### Step-by-Step MongoDB Atlas Setup:

1. **Create a Free Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
   - Sign up with your email (it's free!)

2. **Create a Cluster**
   - After signing up, click "Build a Database"
   - Choose the **FREE** tier (M0 Sandbox)
   - Select a cloud provider and region (choose closest to you)
   - Click "Create Cluster" (takes 1-3 minutes)

3. **Create Database User**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Enter a username and password (save these!)
   - Set privileges to "Atlas admin" or "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development) or add your IP
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)
   - Replace `<password>` with your database user password
   - Add your database name at the end: `...mongodb.net/car-automotive?retryWrites=true&w=majority`

6. **Update .env File**
   - Open `backend/.env`
   - Replace `MONGODB_URI` with your connection string:
   ```env
   MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/car-automotive?retryWrites=true&w=majority
   ```

**Example:**
```env
MONGODB_URI=mongodb+srv://myuser:mypassword123@cluster0.abc123.mongodb.net/car-automotive?retryWrites=true&w=majority
```

#### Alternative: Local MongoDB (If you want to install it)
- Download MongoDB from [mongodb.com/download](https://www.mongodb.com/try/download/community)
- Install and start MongoDB service
- Update `MONGODB_URI` in `.env` to `mongodb://localhost:27017/car-automotive`

### 4. Cloudinary Setup

1. Create account at [Cloudinary](https://cloudinary.com)
2. Get your credentials from dashboard:
   - Cloud Name
   - API Key
   - API Secret
3. Update `.env` with Cloudinary credentials

### 5. Create Admin User

After starting the backend and registering a user, you can create an admin user by:

**Option 1: Using MongoDB Atlas Web Interface (Easiest)**
1. Register a regular user through the frontend
2. Go to MongoDB Atlas dashboard
3. Click "Browse Collections" on your cluster
4. Find the `users` collection in the `car-automotive` database
5. Find your user document and edit it
6. Change `"role": "USER"` to `"role": "ADMIN"`
7. Save the changes

**Option 2: Using MongoDB Compass (Desktop App)**
1. Download [MongoDB Compass](https://www.mongodb.com/products/compass) (free)
2. Connect using your Atlas connection string
3. Navigate to `car-automotive` database → `users` collection
4. Find your user and update the role field to "ADMIN"

**Option 3: Using API (if you have admin access)**
```bash
PUT /api/admin/users/:id/role
```

## Environment Variables

### Backend (.env)

```env
PORT=5000
NODE_ENV=development
# Use MongoDB Atlas connection string (recommended) or local MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/car-automotive?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_REFRESH_SECRET=your-super-secret-refresh-jwt-key-change-this
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
FRONTEND_URL=http://localhost:5173
```

## Troubleshooting

### MongoDB Connection Issues
- **For Atlas**: Ensure your IP address is whitelisted in Network Access
- Check connection string format (should start with `mongodb+srv://`)
- Verify username and password are correct (URL encoded if special characters)
- Make sure database name is included in connection string: `...mongodb.net/car-automotive?...`
- Check that your cluster is running (not paused) in Atlas dashboard

### Cloudinary Upload Issues
- Verify API credentials
- Check file size limits (5MB default)
- Ensure file format is supported (jpg, png, webp)

### CORS Issues
- Verify `FRONTEND_URL` in backend `.env`
- Check browser console for CORS errors
- Ensure frontend is running on the correct port

### JWT Token Issues
- Clear browser localStorage
- Check token expiration settings
- Verify JWT secrets are set

## Production Deployment

1. Set `NODE_ENV=production`
2. Use secure JWT secrets
3. Enable HTTPS
4. Configure proper CORS origins
5. Use environment-specific MongoDB URI
6. Set up proper error logging
7. Configure rate limiting
8. Use secure cookie settings

## Local Development

For local development, simply run both backend and frontend servers:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

