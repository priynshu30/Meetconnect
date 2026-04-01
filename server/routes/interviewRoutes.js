const express = require('express');
const { scheduleInterview, getInterviews, getInterview } = require('../controllers/interviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
  .post(scheduleInterview)
  .get(getInterviews);

router.get('/:id', getInterview);

module.exports = router;
