import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/constants.js';
import { AuthenticationError } from './errors.js';

export const generateToken = (user) => {
  try {
    return jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        name: user.name 
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
  } catch (error) {
    throw new AuthenticationError('Error generating token');
  }
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      throw new AuthenticationError('Invalid token');
    } else if (error.name === 'TokenExpiredError') {
      throw new AuthenticationError('Token has expired');
    }
    throw new AuthenticationError('Token verification failed');
  }
};