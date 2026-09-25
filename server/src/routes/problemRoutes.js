const express = require('express');
const router = express.Router();
const { getProblems, getProblem, createProblem } = require('../controllers/problemController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getProblems);
router.get('/:slug', protect, getProblem);
router.post('/', protect, createProblem);

module.exports = router;
