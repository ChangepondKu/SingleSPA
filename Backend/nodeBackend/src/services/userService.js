import { DatabaseError, AuthenticationError } from '../utils/errors.js';
import * as dbService from './dbService.js';

export const validateUserUpdate = async (userId, updateData) => {
  const user = await dbService.findUserById(userId);
  if (!user) {
    throw new AuthenticationError('User not found');
  }

  if (updateData.email) {
    const existingUser = await dbService.findUserByEmail(updateData.email);
    if (existingUser && existingUser.id !== userId) {
      throw new AuthenticationError('Email already in use');
    }
  }

  return user;
};

export const sanitizeUserData = (user) => {
  const { password, ...sanitizedUser } = user;
  return sanitizedUser;
};