import pool from '../config/database.js';
import { DatabaseError, ValidationError } from '../utils/errors.js';
import { broadcastUpdate } from '../websocket/wsServer.js';

export const createProduct = async (productData) => {
  const client = await pool.connect();
  try {
    const { name, description, price, stock, type, image_url } = productData;
    const result = await client.query(
      `INSERT INTO products (name, description, price, stock, type, image_url)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, description, price, stock, type, image_url]
    );
    const updatedProduct = result.rows[0];
    broadcastUpdate('product_created', updatedProduct);
    return result.rows[0];
  } catch (error) {
    throw new DatabaseError(`Error creating product: ${error.message}`);
  } finally {
    client.release();
  }
};

export const updateProduct = async (id, productData) => {
  const client = await pool.connect();
  try {
    const { name, description, price, stock, type, image_url } = productData;
    const result = await client.query(
      `UPDATE products 
       SET name = COALESCE($1, name),
           description = COALESCE($2, description),
           price = COALESCE($3, price),
           stock = COALESCE($4, stock),
           type = COALESCE($5, type),
           image_url = COALESCE($6, image_url),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING *`,
      [name, description, price, stock, type, image_url, id]
    );

    if (result.rows.length === 0) {
      throw new ValidationError('Product not found');
    }
    const updatedProduct = result.rows[0];
    broadcastUpdate('product_updated', updatedProduct);
    return result.rows[0];
  } catch (error) {
    throw new DatabaseError(`Error updating product: ${error.message}`);
  } finally {
    client.release();
  }
};

export const getProductById = async (id) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      throw new ValidationError('Product not found');
    }

    return result.rows[0];
  } catch (error) {
    throw new DatabaseError(`Error fetching product: ${error.message}`);
  } finally {
    client.release();
  }
};

export const listProducts = async (page, limit) => {
  const client = await pool.connect();
  try {
    const offset = (page - 1) * limit;

    const products = await client.query(
      `SELECT * FROM products
       ORDER BY created_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const totalResult = await client.query('SELECT COUNT(*) FROM products');
    const total = parseInt(totalResult.rows[0].count);

    return {
      products: products.rows,
      total
    };
  } catch (error) {
    throw new DatabaseError(`Error listing products: ${error.message}`);
  } finally {
    client.release();
  }
};

export const getDashboardSummary = async () => {
  const client = await pool.connect();
  try {
    const totalResult = await client.query('SELECT COUNT(*) FROM products');
    const typeBreakdown = await client.query(
      `SELECT type, COUNT(*) as count 
       FROM products 
       GROUP BY type`
    );

    return {
      totalProducts: parseInt(totalResult.rows[0].count),
      productsByType: typeBreakdown.rows
    };
  } catch (error) {
    throw new DatabaseError(`Error getting dashboard summary: ${error.message}`);
  } finally {
    client.release();
  }
};

export const deleteProduct = async (id) => {
  const client = await pool.connect();

  try {
    if (!id) {
      throw new Error('Product ID is required for deletion.');
    }

    const result = await client.query(
      'DELETE FROM products WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rowCount === 0) {
      throw new DatabaseError(`Product with ID ${id} does not exist.`);
    }

    if (result.rows[0]) {
      broadcastUpdate('product_deleted', result.rows[0]);
    }

    return {
      message: 'Product deleted successfully',
      deletedProduct: result.rows[0],
    };
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error(error.message);
    } else {
      console.error(`Unexpected error deleting product: ${error.message}`);
    }
    throw error; // Re-throw error for upstream handling
  } finally {
    client.release();
  }
};