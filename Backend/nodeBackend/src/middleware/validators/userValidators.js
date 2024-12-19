import { body } from 'express-validator';
import { validateRequest } from '../validator.js';

export const registerValidation = [
  body('email').isEmail().normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password').isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('name').trim().notEmpty()
    .withMessage('Name is required'),
  validateRequest
];

export const loginValidation = [
  body('email').isEmail().normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password').notEmpty()
    .withMessage('Password is required'),
  validateRequest
];

export const updateValidation = [
  body('name').trim().optional()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  body('email').optional()
    .isEmail().normalizeEmail()
    .withMessage('Please provide a valid email address'),
  validateRequest
];