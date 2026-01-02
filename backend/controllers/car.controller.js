import { cars } from '../database/memoryDB.js';

/**
 * @route   GET /api/cars
 * @desc    Get all cars with filters
 */
export const getCars = async (req, res, next) => {
  try {
    const {
      brand,
      fuelType,
      transmission,
      bodyType,
      minPrice,
      maxPrice,
      featured,
      availability,
      page = 1,
      limit = 12,
      sort = 'newest'
    } = req.query;

    // Filter cars
    let filteredCars = [...cars];

    if (brand) {
      filteredCars = filteredCars.filter(c => 
        c.brand.toLowerCase().includes(brand.toLowerCase())
      );
    }
    if (fuelType) {
      filteredCars = filteredCars.filter(c => c.fuelType === fuelType);
    }
    if (transmission) {
      filteredCars = filteredCars.filter(c => c.transmission === transmission);
    }
    if (bodyType) {
      filteredCars = filteredCars.filter(c => c.specifications?.bodyType === bodyType);
    }
    if (featured !== undefined) {
      filteredCars = filteredCars.filter(c => c.featured === (featured === 'true'));
    }
    if (availability) {
      filteredCars = filteredCars.filter(c => c.availability === availability);
    }
    if (minPrice) {
      filteredCars = filteredCars.filter(c => c.price >= Number(minPrice));
    }
    if (maxPrice) {
      filteredCars = filteredCars.filter(c => c.price <= Number(maxPrice));
    }

    // Sort
    if (sort === 'price-low') {
      filteredCars.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      filteredCars.sort((a, b) => b.price - a.price);
    } else {
      filteredCars.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    const total = filteredCars.length;
    const paginatedCars = filteredCars.slice(skip, skip + limitNum);

    res.json({
      success: true,
      count: paginatedCars.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: paginatedCars
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/cars/featured
 * @desc    Get featured cars
 */
export const getFeaturedCars = async (req, res, next) => {
  try {
    const featured = cars
      .filter(c => c.featured && c.availability === 'In Stock')
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 8);

    res.json({
      success: true,
      count: featured.length,
      data: featured
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/cars/search
 * @desc    Search cars
 */
export const searchCars = async (req, res, next) => {
  try {
    const { q, page = 1, limit = 12 } = req.query;

    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const searchLower = q.toLowerCase();
    const filtered = cars.filter(c => 
      c.name.toLowerCase().includes(searchLower) ||
      c.brand.toLowerCase().includes(searchLower) ||
      (c.description && c.description.toLowerCase().includes(searchLower))
    );

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    const total = filtered.length;
    const paginated = filtered.slice(skip, skip + limitNum);

    res.json({
      success: true,
      count: paginated.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: paginated
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/cars/:id
 * @desc    Get car by ID
 */
export const getCarById = async (req, res, next) => {
  try {
    const car = cars.find(c => c._id === req.params.id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json({
      success: true,
      data: car
    });
  } catch (error) {
    next(error);
  }
};
