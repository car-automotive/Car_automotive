import jwt from 'jsonwebtoken';
import { users } from '../database/memoryDB.js';

/**
 * Protect routes - Verify JWT token
 */
export const protect = async (req, res, next) => {
  let token;

  // Check for token in cookies or Authorization header
  if (req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-change-in-production-12345';
    if (!JWT_SECRET) {
      return res.status(500).json({ message: 'Server configuration error' });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find(u => u._id === decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Remove password from user object
    const { password, ...userWithoutPassword } = user;
    req.user = {
      ...userWithoutPassword,
      id: user._id  // Ensure id is set for compatibility
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

/**
 * Authorize roles
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `User role '${req.user.role}' is not authorized to access this route` 
      });
    }
    next();
  };
};
