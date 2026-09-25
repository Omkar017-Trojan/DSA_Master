const mongoose = require('mongoose');

const streakSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    problemsSolved: {
      type: Number,
      default: 0
    },
    problemsAttempted: {
      type: Number,
      default: 0
    },
    timeSpent: {
      type: Number,
      default: 0
    },
    isStreakDay: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// One record per user per day
streakSchema.index({ user: 1, date: 1 }, { unique: true });

const Streak = mongoose.model('Streak', streakSchema);

module.exports = Streak;
