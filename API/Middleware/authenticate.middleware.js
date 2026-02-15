/**
 * Authentication Middleware
 * Verifies JWT tokens and authenticates users
 * Follows JWT Bearer token standard
 */

import jwt from 'jsonwebtoken';
import UserSchemaModel from '../models/user.model.js';
import {
  HTTP_STATUS,
  ERROR_MESSAGES,
  USER_STATUS
} from '../constants/roles.constants.js';

/**
 * Verify JWT Token and authenticate user
 * Token must be in Authorization header as: "Bearer <token>"
 */
export const authenticate = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        status: false,
        message: ERROR_MESSAGES.NO_TOKEN
      });
    }

    // Parse Bearer token
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : authHeader;

    if (!token) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        status: false,
        message: ERROR_MESSAGES.NO_TOKEN
      });
    }

    try {
      // Verify token signature and expiration
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mysecretkey');

      // Find user in database
      const user = await UserSchemaModel.findOne({
        email: decoded.email,
        status: USER_STATUS.ACTIVE
      }).select('-password');

      if (!user) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: false,
          message: ERROR_MESSAGES.USER_NOT_FOUND
        });
      }

      // Attach user to request object for use in route handlers
      req.user = {
        _id: user._id,
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        mobile: user.mobile,
        address: user.address,
        city: user.city,
        status: user.status
      };

      req.token = token;

      console.log(`[AUTH] User authenticated: ${user.email} (${user.role})`);
      next();

    } catch (verifyError) {
      console.error(`[AUTH ERROR] Token verification failed:`, verifyError.message);

      if (verifyError.name === 'TokenExpiredError') {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: false,
          message: 'Token has expired',
          code: 'TOKEN_EXPIRED'
        });
      }

      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        status: false,
        message: ERROR_MESSAGES.INVALID_TOKEN
      });
    }

  } catch (error) {
    console.error(`[AUTH ERROR] Middleware error:`, error.message);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      status: false,
      message: ERROR_MESSAGES.INTERNAL_ERROR
    });
  }
};

/**
 * Optional authentication - doesn't fail if token is missing
 * Useful for public routes that can be enhanced with user data if available
 */
export const authenticateOptional = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.startsWith('Bearer ')
        ? authHeader.slice(7)
        : authHeader;

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mysecretkey');
        const user = await UserSchemaModel.findOne({
          email: decoded.email,
          status: USER_STATUS.ACTIVE
        }).select('-password');

        if (user) {
          req.user = {
            _id: user._id,
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
            mobile: user.mobile,
            status: user.status
          };
          req.token = token;
        }
      } catch (error) {
        // Token is invalid but we don't fail, just proceed without user
        console.log('[AUTH] Optional auth - invalid token, proceeding without user');
      }
    }

    next();

  } catch (error) {
    console.error(`[AUTH ERROR] Optional authentication error:`, error.message);
    next(); // Don't fail for optional auth
  }
};

export default authenticate;
