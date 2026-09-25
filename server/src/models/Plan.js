const mongoose = require('mongoose');

const planSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: String,
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    isPublic: {
      type: Boolean,
      default: false
    },
    problems: [{
      problem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' },
      day: Number,
      order: Number
    }],
    totalDays: Number,
    copyCount: {
      type: Number,
      default: 0
    },
    tags: [String],
    source: { type: String },
    sourceUrl: { type: String },
    sourceColor: { type: String },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
    estimatedWeeks: { type: Number }
  },
  { timestamps: true }
);

const Plan = mongoose.model('Plan', planSchema);
module.exports = Plan;
