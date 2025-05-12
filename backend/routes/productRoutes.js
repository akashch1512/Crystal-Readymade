import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { adminProtect } from '../middlewares/adminProtect.js';  // Import adminProtect

const router = express.Router();

// Route to get all products - no admin protection needed
router.route('/')
  .get(getAllProducts)
  .post(protect, adminProtect, createProduct);  // Ensure user is authenticated and is an admin

// Route for a specific product by ID - allows GET, PUT, DELETE with admin access
router.route('/:id')
  .get(getProductById)
  .put(protect, adminProtect, updateProduct)  // Ensure user is authenticated and is an admin
  .delete(protect, adminProtect, deleteProduct);  // Ensure user is authenticated and is an admin

export default router;
