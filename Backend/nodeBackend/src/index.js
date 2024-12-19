import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { paths } from './config/paths.js';
import productRoutes from './routes/productRoutes.js';
import { mkdir } from 'fs/promises';
// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json('10mb'));


// Serve static files from uploads directory
app.use('/uploads', express.static(paths.uploads));

// Create uploads directory if it doesn't exist
try {
  await mkdir(paths.uploads, { recursive: true });
} catch (err) {
  if (err.code !== 'EEXIST') {
    console.error('Error creating uploads directory:', err);
  }
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});