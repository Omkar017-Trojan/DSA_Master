const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  updateProgress,
  getUserProgress,
  getRevisionDue
} = require('../controllers/progressController');

// All routes require authentication
router.use(protect);

router.get('/', getUserProgress);
router.get('/revision', getRevisionDue);
router.put('/:problemId', updateProgress);

module.exports = router;
