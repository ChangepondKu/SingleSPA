import pool from '../config/database.js';
import { DatabaseError } from '../utils/errors.js';

// User queries
const queries = {
  findByEmail: 'SELECT * FROM users WHERE email = $1',
  findById: 'SELECT * FROM users WHERE id = $1',
  create: 'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name',
  update: `
    UPDATE users 
    SET name = COALESCE($1, name),
        email = COALESCE($2, email),
        updated_at = CURRENT_TIMESTAMP 
    WHERE id = $3 
    RETURNING id, email, name
  `
};

// Helper function to execute database queries
const executeQuery = async (queryText, params = []) => {
  const client = await pool.connect();
  try {
    const result = await client.query(queryText, params);
    return result.rows;
  } catch (error) {
    throw new DatabaseError(`Database error: ${error.message}`);
  } finally {
    client.release();
  }
};

// User operations
export const findUserByEmail = async (email) => {
  const rows = await executeQuery(queries.findByEmail, [email]);
  return rows[0];
};

export const findUserById = async (userId) => {
  const rows = await executeQuery(queries.findById, [userId]);
  return rows[0];
};

export const createUser = async (email, hashedPassword, name) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const rows = await client.query(queries.create, [email, hashedPassword, name]);
    await client.query('COMMIT');
    return rows.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw new DatabaseError(`Error creating user: ${error.message}`);
  } finally {
    client.release();
  }
};

export const updateUser = async (userId, updateData) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    const values = [
      updateData.name || null,
      updateData.email || null,
      userId
    ];

    const result = await client.query(queries.update, values);
    await client.query('COMMIT');
    
    if (result.rows.length === 0) {
      throw new DatabaseError('User not found');
    }
    
    return result.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw new DatabaseError(`Error updating user: ${error.message}`);
  } finally {
    client.release();
  }
};