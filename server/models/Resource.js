const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ['Frontend', 'Backend', 'Full-Stack', 'Behavioral'],
      required: true,
    },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },
    tags: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Resource', resourceSchema);
