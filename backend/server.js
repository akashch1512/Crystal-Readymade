const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const { flipkartData, amazonData, myntraData, meeshoData } = require('./mockData');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1); // Exit if the database connection fails
  });


// User Schema and Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Comparison Log Schema and Model
const comparisonLogSchema = new mongoose.Schema({
  username: { type: String, required: true },
  category: { type: String, required: true },
  search: { type: String, required: true },
  platforms: { type: [String], required: true },
  timestamp: { type: Date, default: Date.now },
});

const ComparisonLog = mongoose.model('ComparisonLog', comparisonLogSchema);

// Registration Endpoint
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username: username.toLowerCase(), password: hashedPassword });

    await newUser.save();
    console.log('User registered successfully:', username);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error.message);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful', username });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Product Comparison Endpoint
app.get('/api/products', async (req, res) => {
  const { username, category, search, platforms } = req.query;

  if (!username || !category || !search || !platforms) {
    return res.status(400).json({ message: 'Username, category, search term, and platforms are required' });
  }

  const selectedPlatforms = platforms.split(',');
  const platformData = {
    flipkart: flipkartData,
    amazon: amazonData,
    myntra: myntraData,
    meesho: meeshoData,
  };

  const filteredResults = selectedPlatforms.map((platform) => {
    const data = platformData[platform]?.[category] || [];
    return data.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  const maxLength = Math.max(...filteredResults.map((result) => result.length));

  const combinedResults = Array.from({ length: maxLength }, (_, index) => {
    let result = {};
    selectedPlatforms.forEach((platform, idx) => {
      result[platform] = filteredResults[idx][index] || null;
    });
    return result;
  });

  // Log comparison activity
  try {
    const log = new ComparisonLog({
      username: username.toLowerCase(),
      category,
      search,
      platforms: selectedPlatforms,
    });
    await log.save();
  } catch (error) {
    console.error('Failed to log comparison activity:', error.message);
  }

  res.json(combinedResults);
});

// Contact Form Schema and Model
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Contact = mongoose.model('Contact', contactSchema);

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: 'Message received successfully. Thank you!' });
  } catch (error) {
    console.error('Error saving contact message:', error.message);
    res.status(500).json({ message: 'Failed to save the message. Please try again later.' });
  }
});

// Fetch Comparison History for a user
app.get('/api/comparison-history', async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  try {
    const comparisonHistory = await ComparisonLog.find({ username: username.toLowerCase() })
      .sort({ timestamp: -1 }); // Sort by timestamp in descending order
    res.json(comparisonHistory);
  } catch (error) {
    console.error('Error fetching comparison history:', error.message);
    res.status(500).json({ message: 'Failed to fetch comparison history. Please try again.' });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
 