const mongoose = require('mongoose');

// Test case schema - embedded document within Problem
const testCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  output: { type: String, required: true },
  explanation: { type: String }
});

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      unique: true,
      trim: true
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: true
    },
    topic: {
      type: String,
      required: true,
      enum: [
        'arrays', 'strings', 'hashmaps', 'two-pointers',
        'linked-lists', 'stacks-queues', 'trees', 'graphs',
        'dynamic-programming', 'greedy', 'backtracking',
        'binary-search', 'sorting', 'math', 'bit-manipulation',
        'sliding-window', 'heap', 'trie', 'design', 'other'
      ]
    },
    tags: [String],
    leetcodeUrl: String,
    companies: [String],
    frequency: {
      type: Number,
      min: 1,
      max: 100,
      default: 50
    },
    testCases: [testCaseSchema]
  },
  { timestamps: true }
);

// Auto-generate slug from title before saving
problemSchema.pre('save', function() {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
});

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;
