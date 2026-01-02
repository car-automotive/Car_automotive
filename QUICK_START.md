# Quick Start Guide

Get your Car Automotive app running in 5 minutes! 🚀

## Step 1: MongoDB Atlas Setup (FREE - No Installation!)

1. **Sign up** at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) (free account)
2. **Create a cluster** (choose FREE M0 tier)
3. **Create database user** (Database Access → Add New User)
4. **Allow network access** (Network Access → Add IP Address → Allow from anywhere)
5. **Get connection string**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Add database name: `...mongodb.net/car-automotive?retryWrites=true&w=majority`

## Step 2: Cloudinary Setup (FREE tier available)

1. Sign up at [Cloudinary](https://cloudinary.com/users/register/free)
2. Get your credentials from the dashboard:
   - Cloud Name
   - API Key
   - API Secret

## Step 3: Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and add:
- Your MongoDB Atlas connection string
- Your Cloudinary credentials
- Generate random strings for JWT secrets

```bash
npm run dev
```

## Step 4: Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Step 5: Create Admin User

1. Open http://localhost:5173
2. Register a new account
3. Go to MongoDB Atlas → Browse Collections
4. Find your user in the `users` collection
5. Change `role` from `"USER"` to `"ADMIN"`

## You're Done! 🎉

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

For detailed instructions, see `SETUP.md`

