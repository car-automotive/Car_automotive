import { bookings, cars, generateBookingId } from '../database/memoryDB.js';
import { validationResult } from 'express-validator';

/**
 * @route   POST /api/bookings
 * @desc    Create a new booking
 */
export const createBooking = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { carId, date, location, notes } = req.body;

    // Check if car exists
    const car = cars.find(c => c._id === carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Check if car is available
    if (car.availability === 'Out of Stock') {
      return res.status(400).json({ message: 'Car is out of stock' });
    }

    // Create booking
    const booking = {
      _id: generateBookingId(),
      userId: req.user.id,
      carId,
      date: new Date(date),
      location,
      status: 'Pending',
      notes: notes || '',
      createdAt: new Date()
    };

    bookings.push(booking);

    // Populate car data
    const bookingWithCar = { ...booking, carId: car };

    res.status(201).json({
      success: true,
      data: bookingWithCar
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/bookings/my-bookings
 * @desc    Get user's bookings
 */
export const getMyBookings = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;
    const userBookings = bookings
      .filter(b => b.userId === userId)
      .map(booking => {
        const car = cars.find(c => c._id === booking.carId);
        return { ...booking, carId: car || null };
      })
      .filter(booking => booking.carId !== null) // Only return bookings with valid cars
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      success: true,
      count: userBookings.length,
      data: userBookings
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/bookings/:id
 * @desc    Get booking by ID
 */
export const getBookingById = async (req, res, next) => {
  try {
    const booking = bookings.find(b => b._id === req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user owns the booking or is admin
    if (booking.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const car = cars.find(c => c._id === booking.carId);
    const bookingWithCar = { ...booking, carId: car };

    res.json({
      success: true,
      data: bookingWithCar
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/bookings/:id/status
 * @desc    Update booking status (Admin only)
 */
export const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!['Pending', 'Confirmed', 'Completed', 'Cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const booking = bookings.find(b => b._id === req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status;
    const car = cars.find(c => c._id === booking.carId);
    const bookingWithCar = { ...booking, carId: car };

    res.json({
      success: true,
      data: bookingWithCar
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/bookings/:id/cancel
 * @desc    Cancel booking
 */
export const cancelBooking = async (req, res, next) => {
  try {
    const booking = bookings.find(b => b._id === req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user owns the booking
    if (booking.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (booking.status === 'Cancelled') {
      return res.status(400).json({ message: 'Booking is already cancelled' });
    }

    booking.status = 'Cancelled';

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
};
