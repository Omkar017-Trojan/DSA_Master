const mongoose = require('mongoose');

const groupMemberSchema = new mongoose.Schema(
  {
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    role: {
      type: String,
      enum: ['admin', 'member'],
      default: 'member'
    },
    weeklySolved: {
      type: Number,
      default: 0
    },
    totalSolved: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

// One membership per user per group
groupMemberSchema.index({ group: 1, user: 1 }, { unique: true });

const GroupMember = mongoose.model('GroupMember', groupMemberSchema);
module.exports = GroupMember;
