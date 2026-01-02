/**
 * In-Memory Database
 * Simple data storage using JavaScript objects/arrays
 * Data persists only while server is running
 */

import bcrypt from 'bcryptjs';

// In-memory data stores
export const users = [];
export const cars = [];
export const bookings = [];

// Helper to generate IDs
let userIdCounter = 1;
let carIdCounter = 1;
let bookingIdCounter = 1;

export const generateUserId = () => `user_${userIdCounter++}`;
export const generateCarId = () => `car_${carIdCounter++}`;
export const generateBookingId = () => `booking_${bookingIdCounter++}`;

// Initialize with sample data
export const initializeSampleData = async () => {
  // Sample cars
  if (cars.length === 0) {
    cars.push(
      {
        _id: generateCarId(),
        name: 'Toyota Camry 2024',
        brand: 'Toyota',
        price: 28000,
        images: [
          { url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800', publicId: 'sample1' }
        ],
        fuelType: 'Hybrid',
        transmission: 'Automatic',
        mileage: 0,
        engine: '2.5L 4-Cylinder Hybrid',
        features: ['Apple CarPlay', 'Android Auto', 'Blind Spot Monitor', 'Lane Departure Warning'],
        specifications: {
          seatingCapacity: 5,
          bodyType: 'Sedan',
          safetyFeatures: ['ABS', 'Airbags', 'Backup Camera', 'Emergency Braking'],
          color: 'Pearl White'
        },
        availability: 'In Stock',
        featured: true,
        description: 'The 2024 Toyota Camry offers exceptional fuel economy and a comfortable ride.',
        createdAt: new Date()
      },
      {
        _id: generateCarId(),
        name: 'Honda CR-V 2024',
        brand: 'Honda',
        price: 32000,
        images: [
          { url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800', publicId: 'sample2' }
        ],
        fuelType: 'Petrol',
        transmission: 'Automatic',
        mileage: 0,
        engine: '1.5L Turbo 4-Cylinder',
        features: ['Honda Sensing', 'Power Tailgate', 'Wireless Charging', 'Sunroof'],
        specifications: {
          seatingCapacity: 5,
          bodyType: 'SUV',
          safetyFeatures: ['Collision Mitigation', 'Road Departure Mitigation', 'Adaptive Cruise Control'],
          color: 'Metallic Blue'
        },
        availability: 'In Stock',
        featured: true,
        description: 'Spacious and reliable SUV perfect for families.',
        createdAt: new Date()
      },
      {
        _id: generateCarId(),
        name: 'Tesla Model 3',
        brand: 'Tesla',
        price: 45000,
        images: [
          { url: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800', publicId: 'sample3' }
        ],
        fuelType: 'Electric',
        transmission: 'Automatic',
        mileage: 0,
        engine: 'Electric Motor',
        features: ['Autopilot', 'Supercharging', 'Premium Sound', 'Glass Roof'],
        specifications: {
          seatingCapacity: 5,
          bodyType: 'Sedan',
          safetyFeatures: ['Automatic Emergency Braking', 'Collision Warning', 'Lane Keeping Assist'],
          color: 'Midnight Silver'
        },
        availability: 'In Stock',
        featured: true,
        description: 'Fully electric vehicle with cutting-edge technology.',
        createdAt: new Date()
      },
      {
        _id: generateCarId(),
        name: 'BMW 3 Series',
        brand: 'BMW',
        price: 42000,
        images: [
          { url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800', publicId: 'sample4' }
        ],
        fuelType: 'Petrol',
        transmission: 'Automatic',
        mileage: 5000,
        engine: '2.0L Turbo 4-Cylinder',
        features: ['BMW iDrive', 'Leather Seats', 'Navigation', 'Parking Assist'],
        specifications: {
          seatingCapacity: 5,
          bodyType: 'Sedan',
          safetyFeatures: ['Active Protection', 'Parking Assistant', 'Surround View'],
          color: 'Alpine White'
        },
        availability: 'In Stock',
        featured: false,
        description: 'Luxury sedan with sporty performance.',
        createdAt: new Date()
      },
      // Supercars - Luxury Collection
      {
        _id: generateCarId(),
        name: 'Porsche 911 Turbo S',
        brand: 'Porsche',
        price: 245000,
        images: [
          { url: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800', publicId: 'porsche1' },
          { url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800', publicId: 'porsche2' }
        ],
        fuelType: 'Petrol',
        transmission: 'Automatic',
        mileage: 0,
        engine: '3.8L Twin-Turbo Flat-6',
        features: ['Porsche Active Suspension', 'Sport Chrono Package', 'Premium Sound System', 'Carbon Fiber Trim', 'Racing Seats'],
        specifications: {
          seatingCapacity: 4,
          bodyType: 'Coupe',
          safetyFeatures: ['Porsche Stability Management', 'Adaptive Cruise Control', 'Night Vision', 'Lane Change Assist'],
          color: 'Racing Yellow'
        },
        availability: 'In Stock',
        featured: true,
        description: 'The ultimate sports car with 640 horsepower and breathtaking performance. Experience pure driving exhilaration.',
        createdAt: new Date()
      },
      {
        _id: generateCarId(),
        name: 'Ferrari F8 Tributo',
        brand: 'Ferrari',
        price: 320000,
        images: [
          { url: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800', publicId: 'ferrari1' },
          { url: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800', publicId: 'ferrari2' }
        ],
        fuelType: 'Petrol',
        transmission: 'Automatic',
        mileage: 0,
        engine: '3.9L Twin-Turbo V8',
        features: ['Ferrari Dynamic Enhancer', 'E-Diff3', 'F1-Trac', 'Manettino Dial', 'Carbon Fiber Interior'],
        specifications: {
          seatingCapacity: 2,
          bodyType: 'Coupe',
          safetyFeatures: ['Side Slip Control', 'Electronic Stability Control', 'ABS with EBD', 'Traction Control'],
          color: 'Rosso Corsa'
        },
        availability: 'In Stock',
        featured: true,
        description: 'A masterpiece of Italian engineering. 710 horsepower of pure Ferrari passion and performance.',
        createdAt: new Date()
      },
      {
        _id: generateCarId(),
        name: 'Lamborghini Huracán EVO',
        brand: 'Lamborghini',
        price: 280000,
        images: [
          { url: 'https://images.unsplash.com/photo-1544636339-e2684cd7a325?w=800', publicId: 'lambo1' },
          { url: 'https://images.unsplash.com/photo-1544829099-b9a0c53000a3?w=800', publicId: 'lambo2' }
        ],
        fuelType: 'Petrol',
        transmission: 'Automatic',
        mileage: 0,
        engine: '5.2L V10',
        features: ['Lamborghini Infotainment System', 'Anima Selector', 'LDS Dynamic Steering', 'Carbon Ceramic Brakes'],
        specifications: {
          seatingCapacity: 2,
          bodyType: 'Coupe',
          safetyFeatures: ['Electronic Stability Control', 'Traction Control', 'ABS', 'Airbags'],
          color: 'Arancio Borealis'
        },
        availability: 'In Stock',
        featured: true,
        description: 'The perfect fusion of technology and design. Experience the raw power of a naturally aspirated V10 engine.',
        createdAt: new Date()
      },
      {
        _id: generateCarId(),
        name: 'Chevrolet Camaro ZL1',
        brand: 'Chevrolet',
        price: 75000,
        images: [
          { url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800', publicId: 'camaro1' },
          { url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800', publicId: 'camaro2' }
        ],
        fuelType: 'Petrol',
        transmission: 'Manual',
        mileage: 0,
        engine: '6.2L Supercharged V8',
        features: ['Performance Data Recorder', 'Bose Premium Audio', 'Heated Seats', 'Head-Up Display'],
        specifications: {
          seatingCapacity: 4,
          bodyType: 'Coupe',
          safetyFeatures: ['StabiliTrak', 'Traction Control', 'ABS', 'Airbags'],
          color: 'Rally Green'
        },
        availability: 'In Stock',
        featured: true,
        description: 'American muscle at its finest. 650 horsepower of pure adrenaline and performance.',
        createdAt: new Date()
      },
      {
        _id: generateCarId(),
        name: 'McLaren 720S',
        brand: 'McLaren',
        price: 315000,
        images: [
          { url: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800', publicId: 'mclaren1' },
          { url: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800', publicId: 'mclaren2' }
        ],
        fuelType: 'Petrol',
        transmission: 'Automatic',
        mileage: 0,
        engine: '4.0L Twin-Turbo V8',
        features: ['McLaren Track Telemetry', 'Variable Drift Control', 'Active Dynamics Panel', 'Carbon Fiber Monocage'],
        specifications: {
          seatingCapacity: 2,
          bodyType: 'Coupe',
          safetyFeatures: ['Electronic Stability Control', 'Traction Control', 'ABS', 'Airbags'],
          color: 'Volcano Orange'
        },
        availability: 'In Stock',
        featured: true,
        description: 'A supercar that redefines performance. 710 horsepower with revolutionary aerodynamics.',
        createdAt: new Date()
      },
      {
        _id: generateCarId(),
        name: 'Audi R8 V10 Performance',
        brand: 'Audi',
        price: 195000,
        images: [
          { url: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800', publicId: 'audi1' },
          { url: 'https://images.unsplash.com/photo-1544636339-e2684cd7a325?w=800', publicId: 'audi2' }
        ],
        fuelType: 'Petrol',
        transmission: 'Automatic',
        mileage: 0,
        engine: '5.2L V10',
        features: ['Virtual Cockpit', 'Bang & Olufsen Sound', 'Carbon Fiber Package', 'Audi Drive Select'],
        specifications: {
          seatingCapacity: 2,
          bodyType: 'Coupe',
          safetyFeatures: ['Audi Pre Sense', 'Electronic Stability Control', 'ABS', 'Airbags'],
          color: 'Daytona Gray'
        },
        availability: 'In Stock',
        featured: false,
        description: 'German engineering meets Italian passion. A supercar that delivers on every level.',
        createdAt: new Date()
      },
      {
        _id: generateCarId(),
        name: 'Mercedes-AMG GT 63 S',
        brand: 'Mercedes-Benz',
        price: 165000,
        images: [
          { url: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800', publicId: 'mercedes1' },
          { url: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800', publicId: 'mercedes2' }
        ],
        fuelType: 'Petrol',
        transmission: 'Automatic',
        mileage: 0,
        engine: '4.0L Twin-Turbo V8',
        features: ['MBUX Infotainment', 'Burmester Sound', 'AMG Performance Seats', 'AMG Track Pace'],
        specifications: {
          seatingCapacity: 4,
          bodyType: 'Coupe',
          safetyFeatures: ['Active Brake Assist', 'Blind Spot Assist', 'Lane Keeping Assist', 'PRE-SAFE'],
          color: 'Selenite Silver'
        },
        availability: 'In Stock',
        featured: false,
        description: 'Luxury and performance in perfect harmony. The ultimate grand tourer.',
        createdAt: new Date()
      },
      {
        _id: generateCarId(),
        name: 'Lexus LC 500',
        brand: 'Lexus',
        price: 95000,
        images: [
          { url: 'https://images.unsplash.com/photo-1544829099-b9a0c53000a3?w=800', publicId: 'lexus1' },
          { url: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800', publicId: 'lexus2' }
        ],
        fuelType: 'Petrol',
        transmission: 'Automatic',
        mileage: 0,
        engine: '5.0L V8',
        features: ['Mark Levinson Audio', 'Lexus Safety System+', 'Adaptive Variable Suspension', 'Carbon Fiber Roof'],
        specifications: {
          seatingCapacity: 4,
          bodyType: 'Coupe',
          safetyFeatures: ['Pre-Collision System', 'Lane Departure Alert', 'Dynamic Radar Cruise Control', 'Blind Spot Monitor'],
          color: 'Structural Blue'
        },
        availability: 'In Stock',
        featured: false,
        description: 'Japanese luxury meets stunning design. A grand tourer that turns heads.',
        createdAt: new Date()
      }
    );
  }

  // Create a default admin user with wishlist and bookings
  if (users.length === 0) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminId = generateUserId();
    
    // Get car IDs for wishlist (Porsche, Ferrari, Lamborghini, McLaren)
    const porscheCar = cars.find(c => c.brand === 'Porsche');
    const ferrariCar = cars.find(c => c.brand === 'Ferrari');
    const lamborghiniCar = cars.find(c => c.brand === 'Lamborghini');
    const mclarenCar = cars.find(c => c.brand === 'McLaren');
    
    const adminWishlist = [];
    if (porscheCar) adminWishlist.push(porscheCar._id);
    if (ferrariCar) adminWishlist.push(ferrariCar._id);
    if (lamborghiniCar) adminWishlist.push(lamborghiniCar._id);
    if (mclarenCar) adminWishlist.push(mclarenCar._id);
    
    users.push({
      _id: adminId,
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'ADMIN',
      wishlist: adminWishlist,
      createdAt: new Date()
    });
    console.log('✅ Default admin user created: admin@example.com / admin123');
    if (adminWishlist.length > 0) {
      console.log(`✅ Admin wishlist initialized with ${adminWishlist.length} supercars`);
    }
    
    // Create sample bookings for admin user
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    
    // Booking 1: Porsche test drive
    if (porscheCar) {
      bookings.push({
        _id: generateBookingId(),
        userId: adminId,
        carId: porscheCar._id,
        date: tomorrow,
        location: 'Downtown Showroom - 123 Main Street',
        status: 'Confirmed',
        notes: 'Interested in track performance package',
        createdAt: new Date()
      });
    }
    
    // Booking 2: Ferrari test drive
    if (ferrariCar) {
      bookings.push({
        _id: generateBookingId(),
        userId: adminId,
        carId: ferrariCar._id,
        date: nextWeek,
        location: 'Luxury Car Center - 456 Premium Avenue',
        status: 'Pending',
        notes: 'Weekend test drive requested',
        createdAt: new Date()
      });
    }
    
    // Booking 3: Lamborghini test drive
    if (lamborghiniCar) {
      bookings.push({
        _id: generateBookingId(),
        userId: adminId,
        carId: lamborghiniCar._id,
        date: nextMonth,
        location: 'Exotic Car Gallery - 789 Elite Boulevard',
        status: 'Pending',
        notes: 'Special event booking',
        createdAt: new Date()
      });
    }
    
    if (bookings.length > 0) {
      console.log(`✅ Created ${bookings.length} sample bookings for admin user`);
    }
  }
};

// Note: Initialization is called from server.js to ensure it happens after server starts
