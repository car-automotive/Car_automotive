import express from 'express';
import { body } from 'express-validator';
import {
  getDashboardStats,
  getAllCars,
  createCar,
  updateCar,
  deleteCar,
  getAllBookings,
  getAllUsers,
  updateUserRole,
  deleteUser
} from '../controllers/admin.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { upload } from '../config/cloudinary.config.js';

const router = express.Router();

// All routes require admin role
router.use(protect);
router.use(authorize('ADMIN'));

// Dashboard
router.get('/dashboard', getDashboardStats);

// Car management
router.get('/cars', getAllCars);
router.post('/cars', upload.array('images', 10), createCar);
router.put('/cars/:id', upload.array('images', 10), updateCar);
router.delete('/cars/:id', deleteCar);

// Booking management
router.get('/bookings', getAllBookings);

// User management
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

export default router;

