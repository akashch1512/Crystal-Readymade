import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const normalizedEmail = email.toLowerCase().trim(); // Normalize email

    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Assign role, default to 'user' if not specified
    const userRole = role === 'admin' ? 'admin' : 'user';

    const user = await User.create({ name, email: normalizedEmail, password, role: userRole });
    const token = generateToken(user);

    // Don't expose password in response
    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.status(201).json({ user: safeUser, token });
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ message: 'Server error during registration.' });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase().trim(); // Normalize email

    const user = await User.findOne({ email: normalizedEmail });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);

    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role || 'user',
    };

    res.status(200).json({ user: safeUser, token });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error during login.' });
  }
};
