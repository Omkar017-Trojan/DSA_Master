const Group = require('../models/Group');
const GroupMember = require('../models/GroupMember');

// @desc    Get user's groups
// @route   GET /api/groups
const getGroups = async (req, res) => {
  try {
    const memberships = await GroupMember.find({ user: req.user.id })
      .populate('group')
      .populate('group.creator', 'name avatar');

    const groups = memberships.map((m) => ({
      ...m.group.toObject(),
      role: m.role,
      weeklySolved: m.weeklySolved
    }));

    res.json({ success: true, data: groups });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a group
// @route   POST /api/groups
const createGroup = async (req, res) => {
  try {
    const { name, description, weeklyGoal } = req.body;

    const group = await Group.create({
      name,
      description,
      weeklyGoal,
      creator: req.user.id
    });

    // Add creator as admin
    await GroupMember.create({
      group: group._id,
      user: req.user.id,
      role: 'admin'
    });

    res.status(201).json({ success: true, data: group });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Join group by invite code
// @route   POST /api/groups/join/:code
const joinGroup = async (req, res) => {
  try {
    const group = await Group.findOne({ inviteCode: req.params.code });

    if (!group) {
      return res.status(404).json({ success: false, message: 'Invalid invite code' });
    }

    const existingMember = await GroupMember.findOne({
      group: group._id,
      user: req.user.id
    });

    if (existingMember) {
      return res.status(400).json({ success: false, message: 'Already a member' });
    }

    const memberCount = await GroupMember.countDocuments({ group: group._id });
    if (memberCount >= group.maxMembers) {
      return res.status(400).json({ success: false, message: 'Group is full' });
    }

    await GroupMember.create({
      group: group._id,
      user: req.user.id
    });

    res.json({ success: true, data: group });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get group leaderboard
// @route   GET /api/groups/:id/leaderboard
const getLeaderboard = async (req, res) => {
  try {
    const members = await GroupMember.find({ group: req.params.id })
      .populate('user', 'name avatar xp level')
      .sort({ weeklySolved: -1 });

    res.json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getGroups, createGroup, joinGroup, getLeaderboard };
