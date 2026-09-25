const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Problem',
      required: true
    },
    status: {
      type: String,
      enum: ['unsolved', 'attempted', 'solved', 'revision'],
      default: 'unsolved'
    },
    attempts: {
      type: Number,
      default: 0
    },
    timeTaken: Number,  // in minutes
    confidence: {
      type: Number,
      min: 1,
      max: 5
    },
    nextRevision: Date,
    revisionCount: {
      type: Number,
      default: 0
    },
    lastSolvedAt: Date
  },
  { timestamps: true }
);

// One progress record per user per problem
userProgressSchema.index({ user: 1, problem: 1 }, { unique: true });

const UserProgress = mongoose.model('UserProgress', userProgressSchema);

module.exports = UserProgress;
