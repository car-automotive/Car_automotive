import express from 'express';
import {
  getProfile,
  updateProfile,
  addToWishlist,
  removeFromWishlist,
  getWishlist
} from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/wishlist', getWishlist);
router.post('/wishlist/:carId', addToWishlist);
router.delete('/wishlist/:carId', removeFromWishlist);

export default router;

