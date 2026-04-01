const Resource = require('../models/Resource');
const { questionsData } = require('../data/questions');
const { blogsData } = require('../data/blogs');

// @desc  Get paginated questions by category
// @route GET /api/resources/questions?category=Frontend&page=1&limit=10
const getQuestions = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Try DB first, fall back to seed data
    let total, questions;
    try {
      const filter = category ? { category } : {};
      total = await Resource.countDocuments(filter);
      questions = await Resource.find(filter).skip(skip).limit(parseInt(limit));

      if (total === 0) throw new Error('No DB data');
    } catch {
      // Use seed data fallback
      const filtered = category
        ? questionsData.filter((q) => q.category === category)
        : questionsData;
      total = filtered.length;
      questions = filtered.slice(skip, skip + parseInt(limit));
    }

    res.json({
      questions,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get blog posts by category
// @route GET /api/resources/blogs?category=Frontend
const getBlogs = async (req, res) => {
  try {
    const { category } = req.query;
    const filtered = category
      ? blogsData.filter((b) => b.category === category || b.category === 'General')
      : blogsData;
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getQuestions, getBlogs };
