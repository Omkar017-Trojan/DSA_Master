const Streak = require('../models/Streak');
const User = require('../models/User');

/**
 * Update streak when user solves a problem
 */
const updateStreak = async (userId) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get or create today's streak record
  let streak = await Streak.findOne({ user: userId, date: today });

  if (!streak) {
    streak = await Streak.create({
      user: userId,
      date: today,
      problemsSolved: 1,
      isStreakDay: true
    });
  } else {
    streak.problemsSolved += 1;
    streak.isStreakDay = true;
    await streak.save();
  }

  // Calculate current streak
  const currentStreak = await calculateCurrentStreak(userId);

  // Update user's max streak
  const user = await User.findById(userId);
  if (currentStreak > user.maxStreak) {
    user.maxStreak = currentStreak;
    await user.save();
  }

  return { streak, currentStreak, maxStreak: user.maxStreak };
};

/**
 * Calculate current streak by counting consecutive days
 */
const calculateCurrentStreak = async (userId) => {
  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  while (true) {
    const dayRecord = await Streak.findOne({
      user: userId,
      date: currentDate,
      isStreakDay: true
    });

    if (!dayRecord) break;

    streak++;
    currentDate.setDate(currentDate.getDate() - 1);
  }

  return streak;
};

module.exports = { updateStreak, calculateCurrentStreak };
