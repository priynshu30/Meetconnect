const express = require('express');
const { getQuestions, getBlogs } = require('../controllers/resourceController');

const router = express.Router();

router.get('/questions', getQuestions);
router.get('/blogs', getBlogs);

module.exports = router;
