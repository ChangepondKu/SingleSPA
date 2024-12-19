import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Ensure JWT_SECRET is provided
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is required in environment variables');
}

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = '24h';

