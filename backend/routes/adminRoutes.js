import express from 'express';
import { adminProtect } from '../middleware/adminProtect.js'; // Import the adminProtect middleware

const router = express.Router();

// Protect this route for admins only
router.get('/admin-dashboard', adminProtect, (req, res) => {
  res.status(200).json({ message: 'Welcome to the admin dashboard!' });
});

// You can add more admin-only routes below

export default router;
