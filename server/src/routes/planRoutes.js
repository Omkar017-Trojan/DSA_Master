const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getPlans,
  getSavedPlans,
  savePlan,
  unsavePlan,
  copyPlan,
  createPlan
} = require('../controllers/planController');

router.use(protect);

router.get('/saved', getSavedPlans);
router.get('/', getPlans);
router.post('/', createPlan);
router.post('/:id/copy', copyPlan);
router.post('/:id/save', savePlan);
router.delete('/:id/save', unsavePlan);

module.exports = router;
