/**
 * Spaced Repetition Service
 * Uses simplified SM-2 algorithm for scheduling revisions
 */

// XP rewards for different actions
const XP_REWARDS = {
  easy: 10,
  medium: 25,
  hard: 50,
  revision: 15,
  streak_bonus: 5,
  badge_bonus: 100
};

/**
 * Calculate next revision date based on confidence level
 * @param {number} confidence - User's confidence (1-5)
 * @param {number} revisionCount - How many times revised
 * @returns {Date} Next revision date
 */
const calculateNextRevision = (confidence, revisionCount = 0) => {
  const now = new Date();
  let daysToAdd;

  switch (confidence) {
    case 5: // Easy - got it perfectly
      daysToAdd = Math.max(14, 14 * Math.pow(1.5, revisionCount));
      break;
    case 4: // Good - understood with minor hesitation
      daysToAdd = Math.max(7, 7 * Math.pow(1.5, revisionCount));
      break;
    case 3: // Okay - solved but needed time
      daysToAdd = Math.max(3, 3 * Math.pow(1.3, revisionCount));
      break;
    case 2: // Hard - struggled
      daysToAdd = 1;
      break;
    case 1: // Couldn't solve
      daysToAdd = 1;
      break;
    default:
      daysToAdd = 7;
  }

  const nextRevision = new Date(now);
  nextRevision.setDate(nextRevision.getDate() + daysToAdd);
  nextRevision.setHours(0, 0, 0, 0);

  return nextRevision;
};

module.exports = { XP_REWARDS, calculateNextRevision };
