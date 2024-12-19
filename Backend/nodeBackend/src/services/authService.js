import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/constants.js';
import { AuthenticationError } from '../utils/errors.js';
import * as dbService from './dbService.js';

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const verifyPassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

export const registerUser = async (email, password, name) => {
  const existingUser = await dbService.findUserByEmail(email);
  if (existingUser) {
    throw new AuthenticationError('User already exists');
  }

  const hashedPassword = await hashPassword(password);
  const user = await dbService.createUser(email, hashedPassword, name);
  const token = generateToken(user);

  return { user, token };
};

export const loginUser = async (email, password) => {
  const user = await dbService.findUserByEmail(email);
  if (!user) {
    throw new AuthenticationError('Invalid credentials');
  }

  const isValidPassword = await verifyPassword(password, user.password);
  if (!isValidPassword) {
    throw new AuthenticationError('Invalid credentials');
  }

  const token = generateToken(user);
  return { user, token };
};