import { cars, bookings, users, generateCarId } from '../database/memoryDB.js';

/**
 * @route   GET /api/admin/dashboard
 * @desc    Get dashboard statistics
 */
export const getDashboardStats = async (req, res, next) => {
  try {
    const totalCars = cars.length;
    const totalUsers = users.length;
    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
    const inStockCars = cars.filter(c => c.availability === 'In Stock').length;
    const featuredCars = cars.filter(c => c.featured).length;

    // Recent bookings
    const recentBookings = bookings
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map(booking => {
        const user = users.find(u => u._id === booking.userId);
        const car = cars.find(c => c._id === booking.carId);
        return {
          ...booking,
          userId: user ? { name: user.name, email: user.email } : null,
          carId: car ? { name: car.name, brand: car.brand, price: car.price } : null
        };
      });

    // Popular brands
    const brandCounts = {};
    cars.forEach(car => {
      brandCounts[car.brand] = (brandCounts[car.brand] || 0) + 1;
    });
    const popularBrands = Object.entries(brandCounts)
      .map(([_id, count]) => ({ _id, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    res.json({
      success: true,
      data: {
        stats: {
          totalCars,
          totalUsers,
          totalBookings,
          pendingBookings,
          inStockCars,
          featuredCars
        },
        recentBookings,
        popularBrands
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/admin/cars
 * @desc    Get all cars (admin view)
 */
export const getAllCars = async (req, res, next) => {
  try {
    const sortedCars = [...cars].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({
      success: true,
      count: sortedCars.length,
      data: sortedCars
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/admin/cars
 * @desc    Create a new car
 */
export const createCar = async (req, res, next) => {
  try {
    const {
      name,
      brand,
      price,
      fuelType,
      transmission,
      mileage,
      engine,
      features,
      bodyType,
      seatingCapacity,
      safetyFeatures,
      color,
      availability,
      featured,
      description
    } = req.body;

    // Handle images (for now, use placeholder or empty array)
    const images = [];
    // TODO: Add Cloudinary upload support later if needed

    const car = {
      _id: generateCarId(),
      name,
      brand,
      price: Number(price),
      images,
      fuelType,
      transmission,
      mileage: Number(mileage),
      engine,
      features: features ? (Array.isArray(features) ? features : features.split(',').map(f => f.trim())) : [],
      specifications: {
        bodyType,
        seatingCapacity: seatingCapacity ? Number(seatingCapacity) : 5,
        safetyFeatures: safetyFeatures ? (Array.isArray(safetyFeatures) ? safetyFeatures : safetyFeatures.split(',').map(f => f.trim())) : [],
        color
      },
      availability: availability || 'In Stock',
      featured: featured === 'true' || featured === true,
      description: description || '',
      createdAt: new Date()
    };

    cars.push(car);

    res.status(201).json({
      success: true,
      data: car
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/admin/cars/:id
 * @desc    Update a car
 */
export const updateCar = async (req, res, next) => {
  try {
    const carIndex = cars.findIndex(c => c._id === req.params.id);
    if (carIndex === -1) {
      return res.status(404).json({ message: 'Car not found' });
    }

    const car = cars[carIndex];
    const updateData = req.body;

    // Update fields
    if (updateData.name) car.name = updateData.name;
    if (updateData.brand) car.brand = updateData.brand;
    if (updateData.price) car.price = Number(updateData.price);
    if (updateData.fuelType) car.fuelType = updateData.fuelType;
    if (updateData.transmission) car.transmission = updateData.transmission;
    if (updateData.mileage) car.mileage = Number(updateData.mileage);
    if (updateData.engine) car.engine = updateData.engine;
    if (updateData.features) car.features = Array.isArray(updateData.features) ? updateData.features : updateData.features.split(',').map(f => f.trim());
    if (updateData.bodyType) car.specifications.bodyType = updateData.bodyType;
    if (updateData.seatingCapacity) car.specifications.seatingCapacity = Number(updateData.seatingCapacity);
    if (updateData.safetyFeatures) car.specifications.safetyFeatures = Array.isArray(updateData.safetyFeatures) ? updateData.safetyFeatures : updateData.safetyFeatures.split(',').map(f => f.trim());
    if (updateData.color) car.specifications.color = updateData.color;
    if (updateData.availability) car.availability = updateData.availability;
    if (updateData.featured !== undefined) car.featured = updateData.featured === 'true' || updateData.featured === true;
    if (updateData.description !== undefined) car.description = updateData.description;

    res.json({
      success: true,
      data: car
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/admin/cars/:id
 * @desc    Delete a car
 */
export const deleteCar = async (req, res, next) => {
  try {
    const carIndex = cars.findIndex(c => c._id === req.params.id);
    if (carIndex === -1) {
      return res.status(404).json({ message: 'Car not found' });
    }

    cars.splice(carIndex, 1);

    res.json({
      success: true,
      message: 'Car deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/admin/bookings
 * @desc    Get all bookings
 */
export const getAllBookings = async (req, res, next) => {
  try {
    const allBookings = bookings.map(booking => {
      const user = users.find(u => u._id === booking.userId);
      const car = cars.find(c => c._id === booking.carId);
      return {
        ...booking,
        userId: user ? { name: user.name, email: user.email } : null,
        carId: car ? { name: car.name, brand: car.brand, price: car.price, images: car.images } : null
      };
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      success: true,
      count: allBookings.length,
      data: allBookings
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/admin/users
 * @desc    Get all users
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const usersWithoutPassword = users.map(({ password, ...user }) => user)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({
      success: true,
      count: usersWithoutPassword.length,
      data: usersWithoutPassword
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/admin/users/:id/role
 * @desc    Update user role
 */
export const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    if (!['USER', 'ADMIN'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = users.find(u => u._id === req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = role;
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
 * @route   DELETE /api/admin/users/:id
 * @desc    Delete a user
 */
export const deleteUser = async (req, res, next) => {
  try {
    const userIndex = users.findIndex(u => u._id === req.params.id);
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Don't allow deleting yourself
    if (users[userIndex]._id === req.user.id) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    users.splice(userIndex, 1);

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
