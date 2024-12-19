import * as productService from '../services/productService.js';

export const createProduct = async (req, res, next) => {
  try {
    // const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    const productData = req.body;
    const product = await productService.createProduct(productData);
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const image_url = req.file ? `/uploads/${req.file.filename}` : undefined;
    const productData = req.body;
    const product = await productService.updateProduct(id, productData);
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const listProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { products, total } = await productService.listProducts(page, limit);
    res.json({
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    next(error);
  }
};

export const getDashboardSummary = async (req, res, next) => {
  try {
    const summary = await productService.getDashboardSummary();
    res.json(summary);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteProduct = await productService.deleteProduct(id);
    res.json(deleteProduct)
  } catch (error) {
    next(error)
  }
}