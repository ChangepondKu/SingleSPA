import { body, query } from 'express-validator';
import { validateRequest } from '../validator.js';

export const createProductValidation = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('description').trim().optional(),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
  body('type').trim().notEmpty().withMessage('Product type is required'),
  validateRequest
];

export const updateProductValidation = [
  body('name').trim().optional(),
  body('description').trim().optional(),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
  body('type').trim().optional(),
  validateRequest
];

export const listProductsValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  validateRequest
];