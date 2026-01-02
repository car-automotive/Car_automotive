import express from 'express';
import {
  getCars,
  getCarById,
  getFeaturedCars,
  searchCars
} from '../controllers/car.controller.js';

const router = express.Router();

// Public routes
router.get('/', getCars);
router.get('/featured', getFeaturedCars);
router.get('/search', searchCars);
router.get('/:id', getCarById);

export default router;

