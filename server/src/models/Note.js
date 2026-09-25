const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Problem',
      required: true
    },
    content: {
      type: String,
      default: ''
    },
    tags: [String]
  },
  { timestamps: true }
);

// One note per user per problem
noteSchema.index({ user: 1, problem: 1 }, { unique: true });

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
