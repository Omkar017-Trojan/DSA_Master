const Plan = require('../models/Plan');
const UserPlan = require('../models/UserPlan');
const SavedPlan = require('../models/SavedPlan');

// @desc    Get all public plans + user's plans (with isSaved flag)
// @route   GET /api/plans
const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find({ isPublic: true })
      .populate('creator', 'name avatar')
      .sort({ copyCount: -1 });

    const userPlans = await UserPlan.find({ user: req.user.id })
      .populate('plan');

    const savedPlanDocs = await SavedPlan.find({ user: req.user.id });
    const savedPlanIds = new Set(savedPlanDocs.map(sp => sp.plan.toString()));

    const plansWithSaved = plans.map(plan => ({
      ...plan.toObject(),
      isSaved: savedPlanIds.has(plan._id.toString())
    }));

    res.json({ success: true, data: { publicPlans: plansWithSaved, userPlans } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get saved plans
// @route   GET /api/plans/saved
const getSavedPlans = async (req, res) => {
  try {
    const savedDocs = await SavedPlan.find({ user: req.user.id })
      .populate({
        path: 'plan',
        populate: { path: 'creator', select: 'name avatar' }
      });

    const plans = savedDocs.map(sp => sp.plan).filter(Boolean);

    res.json({ success: true, data: plans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Save a plan for later
// @route   POST /api/plans/:id/save
const savePlan = async (req, res) => {
  try {
    const existing = await SavedPlan.findOne({ user: req.user.id, plan: req.params.id });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Already saved' });
    }

    await SavedPlan.create({ user: req.user.id, plan: req.params.id });
    res.status(201).json({ success: true, message: 'Plan saved' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Unsave a plan
// @route   DELETE /api/plans/:id/save
const unsavePlan = async (req, res) => {
  try {
    await SavedPlan.findOneAndDelete({ user: req.user.id, plan: req.params.id });
    res.json({ success: true, message: 'Plan unsaved' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Copy a plan (start it)
// @route   POST /api/plans/:id/copy
const copyPlan = async (req, res) => {
  try {
    const originalPlan = await Plan.findById(req.params.id);

    if (!originalPlan) {
      return res.status(404).json({ success: false, message: 'Plan not found' });
    }

    const existingUserPlan = await UserPlan.findOne({ user: req.user.id, plan: originalPlan._id });
    if (existingUserPlan) {
      return res.status(400).json({ success: false, message: 'Already started this plan' });
    }

    const userPlan = await UserPlan.create({
      user: req.user.id,
      plan: originalPlan._id,
      currentDay: 1
    });

    originalPlan.copyCount += 1;
    await originalPlan.save();

    res.status(201).json({ success: true, data: userPlan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a custom plan
// @route   POST /api/plans
const createPlan = async (req, res) => {
  try {
    const { title, description, problems, totalDays, tags, isPublic } = req.body;

    const plan = await Plan.create({
      title,
      description,
      creator: req.user.id,
      problems: problems || [],
      totalDays: totalDays || 30,
      tags: tags || [],
      isPublic: isPublic || false
    });

    await UserPlan.create({
      user: req.user.id,
      plan: plan._id,
      currentDay: 1
    });

    res.status(201).json({ success: true, data: plan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getPlans, getSavedPlans, savePlan, unsavePlan, copyPlan, createPlan };
