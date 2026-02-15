/**
 * Authorization/RBAC Middleware
 * Implements Role-Based Access Control
 * Validates user permissions based on roles
 */

import {
  USER_ROLES,
  ROLE_PERMISSIONS,
  HTTP_STATUS,
  ERROR_MESSAGES
} from '../constants/roles.constants.js';

/**
 * Check if user has required role
 * @param {string|string[]} requiredRoles - Single role or array of allowed roles
 * @returns {Function} Middleware function
 */
export const authorize = (requiredRoles) => {
  return (req, res, next) => {
    try {
      // Check if user is authenticated
      if (!req.user) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: false,
          message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS
        });
      }

      // Normalize requiredRoles to array
      const roles = Array.isArray(requiredRoles)
        ? requiredRoles
        : [requiredRoles];

      // Check if user's role is in allowed roles
      if (!roles.includes(req.user.role)) {
        console.warn(
          `[AUTHZ] Access denied for ${req.user.email} (${req.user.role}) to resource requiring ${roles.join(', ')}`
        );

        return res.status(HTTP_STATUS.FORBIDDEN).json({
          status: false,
          message: ERROR_MESSAGES.FORBIDDEN_ACCESS,
          requiredRoles: roles,
          userRole: req.user.role
        });
      }

      console.log(`[AUTHZ] Access granted for ${req.user.email} (${req.user.role})`);
      next();

    } catch (error) {
      console.error(`[AUTHZ ERROR] Authorization middleware error:`, error.message);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR
      });
    }
  };
};

/**
 * Check if user has permission for specific resource and action
 * @param {string} resource - Resource type (e.g., 'users', 'shipments')
 * @param {string} action - Action type (e.g., 'read', 'create', 'update', 'delete')
 * @returns {Function} Middleware function
 */
export const checkPermission = (resource, action) => {
  return (req, res, next) => {
    try {
      // Check if user is authenticated
      if (!req.user) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: false,
          message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS
        });
      }

      const userRole = req.user.role;
      const permissions = ROLE_PERMISSIONS[userRole];

      // Validate role exists
      if (!permissions) {
        console.error(`[AUTHZ ERROR] Invalid role: ${userRole}`);
        return res.status(HTTP_STATUS.FORBIDDEN).json({
          status: false,
          message: ERROR_MESSAGES.INVALID_ROLE
        });
      }

      // Check if user has permission for this resource and action
      const resourcePermissions = permissions[resource];

      if (!resourcePermissions || !resourcePermissions.includes(action)) {
        console.warn(
          `[AUTHZ] Permission denied for ${req.user.email} (${userRole}) - ${action} on ${resource}`
        );

        return res.status(HTTP_STATUS.FORBIDDEN).json({
          status: false,
          message: ERROR_MESSAGES.FORBIDDEN_ACCESS,
          resource,
          action,
          userRole
        });
      }

      console.log(
        `[AUTHZ] Permission granted for ${req.user.email} (${userRole}) - ${action} on ${resource}`
      );
      next();

    } catch (error) {
      console.error(`[AUTHZ ERROR] Permission check middleware error:`, error.message);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR
      });
    }
  };
};

/**
 * Verify user can only access/modify their own resources
 * unless they are admin
 * @param {string} idParam - URL parameter name containing the user ID
 * @returns {Function} Middleware function
 */
export const ownershipCheck = (idParam = 'id') => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: false,
          message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS
        });
      }

      // Allow admins to access any resource
      if (req.user.role === USER_ROLES.ADMIN) {
        return next();
      }

      // For non-admins, verify ownership
      const resourceId = req.params[idParam] || req.body[idParam];
      const userId = req.user._id || req.user.id;

      // Convert both to strings for comparison if they're different types
      if (String(resourceId) !== String(userId)) {
        console.warn(
          `[AUTHZ] Ownership check failed for ${req.user.email} - trying to access resource ${resourceId}`
        );

        return res.status(HTTP_STATUS.FORBIDDEN).json({
          status: false,
          message: 'You can only access your own resources'
        });
      }

      next();

    } catch (error) {
      console.error(`[AUTHZ ERROR] Ownership check middleware error:`, error.message);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR
      });
    }
  };
};

/**
 * Restrict action to specific roles with custom handler
 * More flexible for complex authorization scenarios
 * @param {Function} authorizer - Async function that returns true if authorized
 * @returns {Function} Middleware function
 */
export const customAuthorize = (authorizer) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: false,
          message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS
        });
      }

      const isAuthorized = await authorizer(req);

      if (!isAuthorized) {
        return res.status(HTTP_STATUS.FORBIDDEN).json({
          status: false,
          message: ERROR_MESSAGES.FORBIDDEN_ACCESS
        });
      }

      next();

    } catch (error) {
      console.error(`[AUTHZ ERROR] Custom authorization error:`, error.message);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR
      });
    }
  };
};

export default authorize;
