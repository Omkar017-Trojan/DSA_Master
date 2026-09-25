const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Streak = require('../models/Streak');
const { calculateCurrentStreak } = require('../services/streakService');

// All routes require authentication
router.use(protect);

// @desc    Get current streak
// @route   GET /api/streaks/current
router.get('/current', async (req, res) => {
  try {
    const currentStreak = await calculateCurrentStreak(req.user.id);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStreak = await Streak.findOne({ user: req.user.id, date: today });

    const user = req.user;

    res.json({
      success: true,
      data: {
        currentStreak,
        maxStreak: user.maxStreak,
        todaySolved: todayStreak?.problemsSolved || 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get streak calendar data
// @route   GET /api/streaks/calendar
router.get('/calendar', async (req, res) => {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 365);

    const streaks = await Streak.find({
      user: req.user.id,
      date: { $gte: startDate, $lte: endDate }
    }).sort({ date: 1 });

    res.json({ success: true, data: streaks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
