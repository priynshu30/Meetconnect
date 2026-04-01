const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['Behavioral', 'Frontend', 'Backend', 'Full-Stack', 'DSA'],
      required: [true, 'Interview type is required'],
    },
    date: {
      type: String,
      required: [true, 'Interview date is required'],
    },
    time: {
      type: String,
      required: [true, 'Interview time is required'],
    },
    interviewer: {
      type: String,
      required: [true, 'Interviewer is required'],
    },
    interviewerImage: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['upcoming', 'completed'],
      default: 'upcoming',
    },
    feedback: {
      type: String,
      default: '',
    },
    score: {
      type: Number,
      min: 0,
      max: 10,
      default: null,
    },
    result: {
      type: String,
      enum: ['Pass', 'Fail', 'Pending', null],
      default: null,
    },
    resources: [
      {
        title: String,
        url: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Interview', interviewSchema);
