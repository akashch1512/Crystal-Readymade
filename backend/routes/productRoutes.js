import express from 'express';
import Product from '../models/Product.js';
import Category from '../models/Category.js'; // Import Category model
import Brand from '../models/Brand.js'; // Import Brand model
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

// Get all categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);  // ✅ Just return the array directly
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all brands
router.get("/brands", async (req, res) => {
  try {
    const brands = await Product.distinct("brand");
    res.json(brands);  // ✅ Just return the array directly
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get all products
router.route('/')
  .get(getAllProducts)
  .post(protect, adminProtect, createProduct);

// Route for a specific product by ID
router.route('/:id')
  .get(getProductById)
  .put(protect, adminProtect, updateProduct)
  .delete(protect, adminProtect, deleteProduct);

  export default router;
