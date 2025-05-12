import { protect } from './authMiddleware.js';

export const adminProtect = async (req, res, next) => {
  // First, run the existing protect middleware
  await protect(req, res, async () => {
    // Check if the user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
  });
};
