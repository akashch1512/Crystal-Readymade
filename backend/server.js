import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import addressRoutes from './routes/addressRoutes.js';  
import userRoutes from './routes/userRoutes.js';
import { adminProtect } from './middlewares/adminProtect.js';  // Import your adminProtect middleware

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/user', userRoutes);

// Example of protecting an admin-only route
app.use('/api/admin', adminProtect, (req, res) => {
  res.status(200).json({ message: 'Welcome Admin!' });
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
