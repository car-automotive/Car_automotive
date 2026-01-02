import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middleware/errorHandler.js';
import { initializeSampleData } from './database/memoryDB.js';
import authRoutes from './routes/auth.routes.js';
import carRoutes from './routes/car.routes.js';
import bookingRoutes from './routes/booking.routes.js';
import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin.routes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Initialize database
console.log('✅ Using in-memory database (no MongoDB required)');
initializeSampleData().then(() => {
  console.log('✅ Sample data initialized');
}).catch(err => {
  console.error('❌ Error initializing sample data:', err);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Debug endpoint to check data (remove in production)
app.get('/api/debug/data', async (req, res) => {
  const { users, cars, bookings } = await import('./database/memoryDB.js');
  const admin = users.find(u => u.email === 'admin@example.com');
  res.json({
    users: users.length,
    cars: cars.length,
    bookings: bookings.length,
    adminExists: !!admin,
    adminWishlist: admin?.wishlist?.length || 0,
    adminBookings: bookings.filter(b => admin && b.userId === admin._id).length,
    carBrands: cars.map(c => c.brand)
  });
});

// Error Handler
app.use(errorHandler);

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

