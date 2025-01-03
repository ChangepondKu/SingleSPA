import { registerUser, loginUser } from '../services/authService.js';
import { validateUserUpdate, sanitizeUserData } from '../services/userService.js';
import * as dbService from '../services/dbService.js';

export const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const { user, token } = await registerUser(email, password, name);

    res.status(201).json({
      message: 'User registered successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);

    res.json({
      message: 'Login successful',
      token,
      user: sanitizeUserData(user)
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const userId = req.body.id;
    const updateData = {
      name: req.body.name,
      email: req.body.email
    };

    // Validate user exists and email is unique
    await validateUserUpdate(userId, updateData);

    // Update user details
    const updatedUser = await dbService.updateUser(userId, updateData);

    res.json({
      message: 'User updated successfully',
      user: sanitizeUserData(updatedUser)
    });
  } catch (error) {
    next(error);
  }
};