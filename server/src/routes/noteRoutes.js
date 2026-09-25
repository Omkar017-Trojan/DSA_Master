const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getNotes,
  getNoteByProblem,
  saveNote,
  deleteNote
} = require('../controllers/noteController');

router.use(protect);

router.get('/', getNotes);
router.get('/problem/:problemId', getNoteByProblem);
router.post('/', saveNote);
router.delete('/:id', deleteNote);

module.exports = router;
