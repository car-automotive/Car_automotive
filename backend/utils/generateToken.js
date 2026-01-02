import jwt from 'jsonwebtoken';

// Use environment variables or fallback to default values for development
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-change-in-production-12345';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret-key-change-in-production-12345';

/**
 * Generate JWT Token
 */
export const generateToken = (id) => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is required');
  }
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

/**
 * Generate Refresh Token
 */
export const generateRefreshToken = (id) => {
  if (!JWT_REFRESH_SECRET) {
    throw new Error('JWT_REFRESH_SECRET is required');
  }
  return jwt.sign({ id }, JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d'
  });
};

