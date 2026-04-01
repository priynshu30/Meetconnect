const Interview = require('../models/Interview');
const { resourceMap } = require('../data/resourceMap');
const { addInterview, findInterviewsByUserId } = require('../data/store');
const mongoose = require('mongoose');

const isDbConnected = () => mongoose.connection.readyState === 1;

// @desc  Schedule a new interview
// @route POST /api/interviews
const scheduleInterview = async (req, res) => {
  try {
    const { type, date, time, interviewer, interviewerImage } = req.body;

    if (!type || !date || !time || !interviewer) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const resources = resourceMap[type] || [];
    const interviewData = {
      userId: req.user._id,
      type,
      date,
      time,
      interviewer,
      interviewerImage: interviewerImage || '',
      status: 'upcoming',
      resources,
    };

    let interview;
    if (isDbConnected()) {
      interview = await Interview.create(interviewData);
    } else {
      interview = addInterview(interviewData);
    }

    res.status(201).json(interview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get interviews (upcoming or completed)
// @route GET /api/interviews?status=upcoming&type=Frontend
const getInterviews = async (req, res) => {
  try {
    const { status, type } = req.query;
    let interviews;

    if (isDbConnected()) {
      const filter = { userId: req.user._id };
      if (status) filter.status = status;
      if (type) filter.type = type;
      interviews = await Interview.find(filter).sort({ createdAt: -1 });
    } else {
      interviews = findInterviewsByUserId(req.user._id);
      if (status) interviews = interviews.filter(i => i.status === status);
      if (type) interviews = interviews.filter(i => i.type === type);
      interviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    res.json(interviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get single interview
// @route GET /api/interviews/:id
const getInterview = async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!interview) return res.status(404).json({ message: 'Interview not found' });
    res.json(interview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { scheduleInterview, getInterviews, getInterview };
