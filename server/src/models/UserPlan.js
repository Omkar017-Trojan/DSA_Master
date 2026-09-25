const mongoose = require('mongoose');

const userPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plan',
      required: true
    },
    currentDay: {
      type: Number,
      default: 1
    },
    completedProblems: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Problem'
    }],
    startDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['active', 'paused', 'completed'],
      default: 'active'
    }
  },
  { timestamps: true }
);

const UserPlan = mongoose.model('UserPlan', userPlanSchema);
module.exports = UserPlan;
