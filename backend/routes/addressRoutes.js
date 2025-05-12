  import express from 'express';
  import Address from '../models/Address.js';
  import { protect } from '../middlewares/authMiddleware.js';

  const router = express.Router();

  // GET - fetch all addresses for current user
  router.get('/', protect, async (req, res) => {
    try {
      const addresses = await Address.find({ userId: req.user._id });
      res.json(addresses);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST - Add a new address
  router.post('/', protect, async (req, res) => {
    try {
      const address = new Address({
        ...req.body,
        userId: req.user._id,
      });

      await address.save();

      const updatedAddresses = await Address.find({ userId: req.user._id });
      res.status(201).json(updatedAddresses);
    } catch (err) {
      res.status(500).json({ error: err.message });
      console.log(err);
    }
  });

  // PUT - update existing address by ID
  router.put('/:id', async (req, res) => {
    try {
      const updatedAddress = await Address.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!updatedAddress) {
        return res.status(404).json({ message: 'Address not found' });
      }

      res.json(updatedAddress);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  export default router;
