import { users, cars } from '../database/memoryDB.js';

/**
 * @route   GET /api/users/profile
 * @desc    Get user profile
 */
export const getProfile = async (req, res, next) => {
  try {
    const user = users.find(u => u._id === req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure wishlist exists and is an array
    if (!user.wishlist || !Array.isArray(user.wishlist)) {
      user.wishlist = [];
    }

    const wishlist = user.wishlist
      .map(carId => cars.find(c => c._id === carId))
      .filter(Boolean);

    res.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        wishlist,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/users/profile
 * @desc    Update user profile
 */
export const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = users.find(u => u._id === req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (email) {
      // Check if email is already taken by another user
      const emailExists = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u._id !== req.user.id);
      if (emailExists) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      user.email = email.toLowerCase();
    }

    const { password, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: userWithoutPassword
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/users/wishlist
 * @desc    Get user wishlist
 */
export const getWishlist = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;
    const user = users.find(u => u._id === userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure wishlist exists and is an array
    if (!user.wishlist || !Array.isArray(user.wishlist)) {
      user.wishlist = [];
    }

    const wishlist = user.wishlist
      .map(carId => cars.find(c => c._id === carId))
      .filter(Boolean);

    res.json({
      success: true,
      count: wishlist.length,
      data: wishlist
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/users/wishlist/:carId
 * @desc    Add car to wishlist
 */
export const addToWishlist = async (req, res, next) => {
  try {
    const { carId } = req.params;

    // Check if car exists
    const car = cars.find(c => c._id === carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    const user = users.find(u => u._id === req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure wishlist exists and is an array
    if (!user.wishlist || !Array.isArray(user.wishlist)) {
      user.wishlist = [];
    }

    // Check if already in wishlist
    if (user.wishlist.includes(carId)) {
      return res.status(400).json({ message: 'Car already in wishlist' });
    }

    user.wishlist.push(carId);
    const wishlist = user.wishlist.map(id => cars.find(c => c._id === id)).filter(Boolean);

    res.json({
      success: true,
      message: 'Car added to wishlist',
      data: wishlist
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/users/wishlist/:carId
 * @desc    Remove car from wishlist
 */
export const removeFromWishlist = async (req, res, next) => {
  try {
    const { carId } = req.params;

    const user = users.find(u => u._id === req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure wishlist exists and is an array
    if (!user.wishlist || !Array.isArray(user.wishlist)) {
      user.wishlist = [];
    }

    // Check if car is in wishlist
    if (!user.wishlist.includes(carId)) {
      return res.status(400).json({ message: 'Car not in wishlist' });
    }

    user.wishlist = user.wishlist.filter(id => id !== carId);
    const wishlist = user.wishlist.map(id => cars.find(c => c._id === id)).filter(Boolean);

    res.json({
      success: true,
      message: 'Car removed from wishlist',
      data: wishlist
    });
  } catch (error) {
    next(error);
  }
};
