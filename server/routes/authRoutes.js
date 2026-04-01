const express = require('express');
const { body } = require('express-validator');
const { register, login, getMe, updateProfile, googleLogin } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('contactNumber').optional().matches(/^[0-9]{10}$/).withMessage('Enter valid 10-digit number'),
], register);

router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
], login);

router.post('/google', googleLogin);

router.get('/me', protect, getMe);
router.put('/update', protect, updateProfile);

module.exports = router;
