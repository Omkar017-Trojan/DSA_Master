const Note = require('../models/Note');

// @desc    Get all notes for user
// @route   GET /api/notes
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id })
      .populate('problem', 'title slug topic difficulty')
      .sort({ updatedAt: -1 });

    res.json({ success: true, data: notes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get note for specific problem
// @route   GET /api/notes/problem/:problemId
const getNoteByProblem = async (req, res) => {
  try {
    const note = await Note.findOne({
      user: req.user.id,
      problem: req.params.problemId
    });

    res.json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create or update note
// @route   POST /api/notes
const saveNote = async (req, res) => {
  try {
    const { problemId, content, tags } = req.body;

    let note = await Note.findOne({
      user: req.user.id,
      problem: problemId
    });

    if (note) {
      note.content = content;
      if (tags) note.tags = tags;
      await note.save();
    } else {
      note = await Note.create({
        user: req.user.id,
        problem: problemId,
        content,
        tags
      });
    }

    res.json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete note
// @route   DELETE /api/notes/:id
const deleteNote = async (req, res) => {
  try {
    await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getNotes, getNoteByProblem, saveNote, deleteNote };
