const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware = function that runs between request and route handler
// "protect" = require authentication before accessing route

const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  // Format: "Bearer eyJhbGciOiJIUzI1NiIs..."
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Extract token from "Bearer TOKEN"
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized - no token'
    });
  }

  try {
    // Verify token is valid and not expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID from token
    // Attach user to request object so routes can access it
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized - user not found'
      });
    }

    // Call next() to continue to the route handler
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized - invalid token'
    });
  }
};

module.exports = { protect };
