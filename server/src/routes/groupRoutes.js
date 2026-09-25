const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getGroups,
  createGroup,
  joinGroup,
  getLeaderboard
} = require('../controllers/groupController');

router.use(protect);

router.get('/', getGroups);
router.post('/', createGroup);
router.post('/join/:code', joinGroup);
router.get('/:id/leaderboard', getLeaderboard);

module.exports = router;
