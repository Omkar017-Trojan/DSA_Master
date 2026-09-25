const mongoose = require('mongoose');

const savedPlanSchema = new mongoose.Schema(
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
    }
  },
  { timestamps: true }
);

savedPlanSchema.index({ user: 1, plan: 1 }, { unique: true });

const SavedPlan = mongoose.model('SavedPlan', savedPlanSchema);
module.exports = SavedPlan;
