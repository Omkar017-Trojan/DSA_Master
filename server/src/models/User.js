const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Schema = Blueprint for your data
// Defines what fields a document can have and their types
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,  // No two users can have same email
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: function() {
        return !this.googleId; // Required only if not using Google OAuth
      },
      minlength: [6, 'Password must be at least 6 characters'],
      select: false  // Don't return password in queries by default
    },
    avatar: {
      type: String,
      default: ''
    },
    googleId: {
      type: String,
      default: null
    },
    xp: {
      type: Number,
      default: 0
    },
    level: {
      type: Number,
      default: 1
    },
    maxStreak: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }  // Adds createdAt and updatedAt automatically
);

// ==================== MIDDLEWARE ====================
// pre('save') runs BEFORE saving to database
// We use this to hash the password
userSchema.pre('save', async function() {
  // Only hash if password is new or modified
  if (!this.isModified('password')) {
    return;
  }

  // Hash password with bcrypt
  // 10 = salt rounds (how many times to hash, more = slower but more secure)
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// ==================== INSTANCE METHODS ====================
// Methods that every user document can call

// Compare entered password with hashed password
userSchema.methods.comparePassword = async function(candidatePassword) {
  // bcrypt.compare() handles comparing hashed passwords
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
