const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: String,
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    inviteCode: {
      type: String,
      unique: true
    },
    maxMembers: {
      type: Number,
      default: 10
    },
    weeklyGoal: {
      type: Number,
      default: 10
    }
  },
  { timestamps: true }
);

// Generate invite code before saving
groupSchema.pre('save', function() {
  if (!this.inviteCode) {
    this.inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  }
});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;
