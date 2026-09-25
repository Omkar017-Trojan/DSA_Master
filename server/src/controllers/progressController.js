const UserProgress = require('../models/UserProgress');
const Problem = require('../models/Problem');
const { XP_REWARDS, calculateNextRevision } = require('../services/spacedRepetition');
const { updateStreak } = require('../services/streakService');
const User = require('../models/User');

// @desc    Update problem progress
// @route   PUT /api/progress/:problemId
const updateProgress = async (req, res) => {
  try {
    const { problemId } = req.params;
    const { status, timeTaken, confidence } = req.body;
    const userId = req.user.id;

    // Find or create progress record
    let progress = await UserProgress.findOne({
      user: userId,
      problem: problemId
    });

    if (progress) {
      progress.status = status;
      progress.attempts += 1;
      if (timeTaken) progress.timeTaken = timeTaken;
      if (confidence) progress.confidence = confidence;
      if (status === 'solved') {
        progress.lastSolvedAt = new Date();
      }
    } else {
      progress = await UserProgress.create({
        user: userId,
        problem: problemId,
        status,
        attempts: 1,
        timeTaken,
        confidence,
        lastSolvedAt: status === 'solved' ? new Date() : undefined
      });
    }

    await progress.save();

    // Calculate XP earned
    let xpEarned = 0;
    let streakData = null;

    if (status === 'solved') {
      // Get problem difficulty for XP calculation
      const problem = await Problem.findById(problemId);
      xpEarned = XP_REWARDS[problem.difficulty] || 10;

      // Update user XP and level
      const user = await User.findById(userId);
      user.xp += xpEarned;
      user.level = Math.floor(user.xp / 500) + 1;
      await user.save();

      // Update streak
      streakData = await updateStreak(userId);

      // Schedule revision if confidence is set
      if (confidence) {
        progress.nextRevision = calculateNextRevision(confidence, progress.revisionCount);
        progress.revisionCount += 1;
        progress.status = 'revision';
        await progress.save();
      }
    }

    res.json({
      success: true,
      data: progress,
      xpEarned,
      streak: streakData
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user's progress
// @route   GET /api/progress
const getUserProgress = async (req, res) => {
  try {
    const progress = await UserProgress.find({ user: req.user.id })
      .populate('problem', 'title difficulty topic slug');

    const stats = {
      total: progress.length,
      solved: progress.filter(p => p.status === 'solved').length,
      attempted: progress.filter(p => p.status === 'attempted').length,
      revision: progress.filter(p => p.status === 'revision').length,
      byDifficulty: {
        easy: progress.filter(p => p.problem?.difficulty === 'easy' && p.status === 'solved').length,
        medium: progress.filter(p => p.problem?.difficulty === 'medium' && p.status === 'solved').length,
        hard: progress.filter(p => p.problem?.difficulty === 'hard' && p.status === 'solved').length
      }
    };

    res.json({
      success: true,
      data: { progress, stats }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get problems due for revision
// @route   GET /api/progress/revision
const getRevisionDue = async (req, res) => {
  try {
    const revisionDue = await UserProgress.find({
      user: req.user.id,
      status: { $in: ['solved', 'revision'] },
      nextRevision: { $lte: new Date() }
    }).populate('problem', 'title difficulty topic slug');

    res.json({
      success: true,
      count: revisionDue.length,
      data: revisionDue
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { updateProgress, getUserProgress, getRevisionDue };
