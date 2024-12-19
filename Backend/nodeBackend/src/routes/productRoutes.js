import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import {
  createProductValidation,
  updateProductValidation,
  listProductsValidation
} from '../middleware/validators/productValidators.js';
import {
  createProduct,
  updateProduct,
  getProduct,
  listProducts,
  getDashboardSummary,
  deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

// Protect all routes with authentication
router.use(authenticateToken);

router.post('/', upload.single('image'), createProductValidation, createProduct);
router.put('/update/:id', upload.single('image'), updateProductValidation, updateProduct);
router.get('/getproduct/:id', getProduct);
router.get('/getproduct', listProductsValidation, listProducts);
router.get('/dashboard/summary', getDashboardSummary);
router.delete('/delete/:id', deleteProduct);

export default router;