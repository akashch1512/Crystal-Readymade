import express from 'express'
import Address from '../models/Address.js'; // ⬅️ Also ensure this is imported at the top
import { protect } from '../middlewares/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const addresses = await Address.find({ userId: req.user._id });
    const { password, ...userData } = user.toObject();

    res.json({ user: { ...userData, addresses } });
  } catch (err) {
    console.error('Error in /me route:', err.message);
    res.status(500).json({ error: err.message });
  }
});



export default router;
