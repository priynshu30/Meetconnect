const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { findUserByEmail, addUser, findUserById } = require('../data/store');
const mongoose = require('mongoose');

const isDbConnected = () => mongoose.connection.readyState === 1;

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || 'meetconnect_secret', {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });

// @desc  Register user
// @route POST /api/auth/register
const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, contactNumber } = req.body;

  try {
    let user;
    if (isDbConnected()) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists with this email' });
      }
      user = await User.create({ name, email, password, contactNumber });
    } else {
      // In-memory fallback
      if (findUserByEmail(email)) {
        return res.status(400).json({ message: 'User already exists in session store' });
      }
      user = addUser({ name, email, password, contactNumber });
    }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      contactNumber: user.contactNumber,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Login user
// @route POST /api/auth/login
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user;
    if (isDbConnected()) {
      user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    } else {
      // In-memory fallback
      user = findUserByEmail(email);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials in session store' });
      }
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      contactNumber: user.contactNumber,
      dob: user.dob,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get current user
// @route GET /api/auth/me
const getMe = async (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    contactNumber: req.user.contactNumber,
    dob: req.user.dob,
    avatar: req.user.avatar,
  });
};

// @desc  Update user profile
// @route PUT /api/auth/update
const updateProfile = async (req, res) => {
  try {
    let user;
    if (isDbConnected()) {
      user = await User.findById(req.user._id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      user.name = req.body.name || user.name;
      user.contactNumber = req.body.contactNumber || user.contactNumber;
      user.dob = req.body.dob || user.dob;
      user = await user.save();
    } else {
      // In-memory update
      user = findUserById(req.user._id);
      if (!user) return res.status(404).json({ message: 'User session not found' });
      user.name = req.body.name || user.name;
      user.contactNumber = req.body.contactNumber || user.contactNumber;
      user.dob = req.body.dob || user.dob;
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      contactNumber: user.contactNumber,
      dob: user.dob,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Mock Google login
// @route POST /api/auth/google
const googleLogin = async (req, res) => {
  const { name, email, googleId } = req.body;
  try {
    let user;
    if (isDbConnected()) {
      user = await User.findOne({ email });
      if (!user) {
        user = await User.create({ name, email, password: googleId, contactNumber: '' });
      }
    } else {
      user = findUserByEmail(email);
      if (!user) {
        user = addUser({ name, email, password: googleId, contactNumber: '' });
      }
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, getMe, updateProfile, googleLogin };
