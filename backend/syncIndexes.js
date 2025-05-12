import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config(); // to load MONGO_URI

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await User.syncIndexes();
    console.log('✅ Indexes synced!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to sync indexes:', err);
    process.exit(1);
  }
})();
