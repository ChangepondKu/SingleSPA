import express from 'express';
import { register, login, updateUser } from '../controllers/authController.js';
import { registerValidation, loginValidation, updateValidation } from '../middleware/validators/userValidators.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.put('/update', authenticateToken, updateValidation, updateUser);

export default router;