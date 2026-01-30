import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Protect routes - verify JWT token
export const protect = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. No token provided.' 
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from token
      const user = await User.findById(decoded.id).select('+password');
      
      if (!user) {
        return res.status(401).json({ 
          success: false, 
          message: 'User not found.' 
        });
      }

      if (!user.isActive) {
        return res.status(401).json({ 
          success: false, 
          message: 'Account is deactivated.' 
        });
      }

      req.user = user;
      next();
    } catch (jwtError) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token.' 
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error in authentication.' 
    });
  }
};

// Role-based access control
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. User not authenticated.' 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `Access denied. User role ${req.user.role} is not authorized.` 
      });
    }

    next();
  };
};

// Optional: Check if user owns the profile or is admin
export const authorizeOwnerOrAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access denied. User not authenticated.' 
    });
  }

  // Admin can access any profile
  if (req.user.role === 'admin') {
    return next();
  }

  // Students can only access their own profile
  const profileId = req.params.id;
  if (req.user._id.toString() === profileId) {
    return next();
  }

  return res.status(403).json({ 
    success: false, 
    message: 'Access denied. You can only access your own profile.' 
  });
};
