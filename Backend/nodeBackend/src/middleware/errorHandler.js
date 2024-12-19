import { DatabaseError, AuthenticationError, ValidationError } from '../utils/errors.js';

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof DatabaseError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err instanceof AuthenticationError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  res.status(500).json({ error: 'Something went wrong!' });
};