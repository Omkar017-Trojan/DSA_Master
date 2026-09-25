const Problem = require('../models/Problem');

// @desc    Get all problems
// @route   GET /api/problems
const getProblems = async (req, res) => {
  try {
    const { difficulty, topic, search } = req.query;

    // Build filter object
    const filter = {};

    if (difficulty) filter.difficulty = difficulty;
    if (topic) filter.topic = topic;
    if (search) {
      filter.title = { $regex: search, $options: 'i' }; // case-insensitive
    }

    const problems = await Problem.find(filter)
      .select('-testCases')  // Don't send test cases in list view
      .sort({ frequency: -1 });

    res.json({
      success: true,
      count: problems.length,
      data: problems
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get problem by slug
// @route   GET /api/problems/:slug
const getProblem = async (req, res) => {
  try {
    const problem = await Problem.findOne({ slug: req.params.slug });

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }

    res.json({ success: true, data: problem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a problem
// @route   POST /api/problems
const createProblem = async (req, res) => {
  try {
    const { title, description, difficulty, topic, tags, leetcodeUrl, companies, testCases } = req.body;

    const existing = await Problem.findOne({ title });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Problem already exists' });
    }

    const problem = await Problem.create({
      title, description, difficulty, topic, tags, leetcodeUrl, companies, testCases
    });

    res.status(201).json({ success: true, data: problem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getProblems, getProblem, createProblem };
