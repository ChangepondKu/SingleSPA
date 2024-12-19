import { verifyToken } from '../utils/tokenUtils.js';
import { AuthenticationError } from '../utils/errors.js';

export const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new AuthenticationError('Authorization header is required');
    }

    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.slice(7).trim()  // Remove "Bearer " and any surrounding whitespace
      : authHeader.trim();          // Trim the authHeader in case there's no "Bearer "

    if (!token) {
      throw new AuthenticationError('Access token is required');
    }

    // Remove any extra surrounding quotes from the token
    const cleanToken = token.replace(/^"|'|"$/g, '');

    const user = verifyToken(cleanToken);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
