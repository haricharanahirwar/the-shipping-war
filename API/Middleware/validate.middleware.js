/**
 * Validation Middleware
 * Validates request data, parameters, and middleware requirements
 */

import { HTTP_STATUS, ERROR_MESSAGES } from '../constants/roles.constants.js';

/**
 * Validate required fields in request body
 * @param {string[]} requiredFields - Array of required field names
 * @returns {Function} Middleware function
 */
export const validateRequiredFields = (requiredFields = []) => {
  return (req, res, next) => {
    try {
      const { body } = req;
      const missingFields = [];

      requiredFields.forEach(field => {
        if (!body[field] || (typeof body[field] === 'string' && body[field].trim() === '')) {
          missingFields.push(field);
        }
      });

      if (missingFields.length > 0) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          status: false,
          message: ERROR_MESSAGES.VALIDATION_ERROR,
          missingFields
        });
      }

      next();

    } catch (error) {
      console.error(`[VALIDATION ERROR] Required fields validation error:`, error.message);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR
      });
    }
  };
};

/**
 * Validate email format
 * @param {string} fieldName - Field name to validate in request body
 * @returns {Function} Middleware function
 */
export const validateEmail = (fieldName = 'email') => {
  return (req, res, next) => {
    try {
      const email = req.body[fieldName];

      if (!email) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          status: false,
          message: `${fieldName} is required`,
          field: fieldName
        });
      }

      // Simple email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          status: false,
          message: `Invalid ${fieldName} format`,
          field: fieldName
        });
      }

      next();

    } catch (error) {
      console.error(`[VALIDATION ERROR] Email validation error:`, error.message);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR
      });
    }
  };
};

/**
 * Validate phone number format (10 digits for India)
 * @param {string} fieldName - Field name to validate in request body
 * @returns {Function} Middleware function
 */
export const validatePhoneNumber = (fieldName = 'mobile') => {
  return (req, res, next) => {
    try {
      const phone = req.body[fieldName];

      if (!phone) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          status: false,
          message: `${fieldName} is required`,
          field: fieldName
        });
      }

      // Phone validation for 10 digit numbers
      const phoneRegex = /^[0-9]{10}$/;

      if (!phoneRegex.test(phone.toString())) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          status: false,
          message: `Invalid ${fieldName} format. Must be 10 digits`,
          field: fieldName
        });
      }

      next();

    } catch (error) {
      console.error(`[VALIDATION ERROR] Phone validation error:`, error.message);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR
      });
    }
  };
};

/**
 * Validate password strength
 * @param {string} fieldName - Field name to validate in request body
 * @returns {Function} Middleware function
 */
export const validatePassword = (fieldName = 'password') => {
  return (req, res, next) => {
    try {
      const password = req.body[fieldName];

      if (!password) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          status: false,
          message: `${fieldName} is required`,
          field: fieldName
        });
      }

      // Password must be at least 8 characters, contain letters, numbers, and special characters
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!passwordRegex.test(password)) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          status: false,
          message: `Password must be at least 8 characters with uppercase, lowercase, number and special character`,
          field: fieldName
        });
      }

      next();

    } catch (error) {
      console.error(`[VALIDATION ERROR] Password validation error:`, error.message);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR
      });
    }
  };
};

/**
 * Sanitize request inputs to prevent injection attacks
 * @returns {Function} Middleware function
 */
export const sanitizeInputs = () => {
  return (req, res, next) => {
    try {
      // Sanitize body
      if (req.body && typeof req.body === 'object') {
        Object.keys(req.body).forEach(key => {
          if (typeof req.body[key] === 'string') {
            // Remove dangerous characters
            req.body[key] = req.body[key]
              .trim()
              .replace(/[<>\"']/g, ''); // Remove potential XSS characters
          }
        });
      }

      // Sanitize query params
      if (req.query && typeof req.query === 'object') {
        Object.keys(req.query).forEach(key => {
          if (typeof req.query[key] === 'string') {
            req.query[key] = req.query[key]
              .trim()
              .replace(/[<>\"']/g, '');
          }
        });
      }

      next();

    } catch (error) {
      console.error(`[VALIDATION ERROR] Sanitization error:`, error.message);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR
      });
    }
  };
};

export default validateRequiredFields;
