/**
 * Error Handling Middleware
 * Centralized error handler for consistent error responses
 */

import { HTTP_STATUS, ERROR_MESSAGES } from '../constants/roles.constants.js';

/**
 * Global error handler
 * Should be added as the last middleware in app.js
 * @param {Error} error - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`, {
    timestamp: new Date().toISOString(),
    url: req.originalUrl,
    method: req.method,
    user: req.user ? req.user.email : 'unauthenticated',
    stack: err.stack
  });

  // MongoDB Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(HTTP_STATUS.CONFLICT).json({
      status: false,
      message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
      field
    });
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(err => err.message);
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: false,
      message: 'Validation error',
      errors: messages
    });
  }

  // MongoDB Cast Error
  if (err.name === 'CastError') {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: false,
      message: 'Invalid ID format'
    });
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      status: false,
      message: ERROR_MESSAGES.INVALID_TOKEN
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      status: false,
      message: 'Token has expired',
      code: 'TOKEN_EXPIRED'
    });
  }

  // Custom application errors
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      status: false,
      message: err.message,
      ...(err.details && { details: err.details })
    });
  }

  // Default error response
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    status: false,
    message: ERROR_MESSAGES.INTERNAL_ERROR,
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  });
};

/**
 * Not Found handler - should be added before error handler
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const notFoundHandler = (req, res, next) => {
  console.warn(`[NOT FOUND] ${req.method} ${req.originalUrl}`);

  res.status(HTTP_STATUS.NOT_FOUND).json({
    status: false,
    message: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
};

/**
 * Async error wrapper to catch errors in async route handlers
 * Usage: router.get('/route', asyncHandler(async (req, res) => { ... }))
 * @param {Function} fn - Async route handler function
 * @returns {Function} Express middleware
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default errorHandler;
