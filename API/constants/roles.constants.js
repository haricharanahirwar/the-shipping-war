/**
 * Role-Based Access Control Constants
 * Defines all roles and their permissions in the application
 */

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user'
};

// Role Permissions Map
// Define what each role can do
export const ROLE_PERMISSIONS = {
  [USER_ROLES.ADMIN]: {
    users: ['create', 'read', 'update', 'delete'],
    categories: ['create', 'read', 'update', 'delete'],
    subcategories: ['create', 'read', 'update', 'delete'],
    shipments: ['create', 'read', 'update', 'delete'],
    bids: ['create', 'read', 'update', 'delete'],
    reports: ['read'],
    settings: ['read', 'update']
  },
  [USER_ROLES.MANAGER]: {
    users: ['read'],
    categories: ['read'],
    subcategories: ['read'],
    shipments: ['create', 'read', 'update'],
    bids: ['read'],
    reports: ['read']
  },
  [USER_ROLES.USER]: {
    users: ['read'], // Can read own profile
    categories: ['read'],
    subcategories: ['read'],
    shipments: ['create', 'read', 'update'],
    bids: ['create', 'read', 'update']
  }
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
};

// Error Messages
export const ERROR_MESSAGES = {
  NO_TOKEN: 'No authorization token provided',
  INVALID_TOKEN: 'Invalid or expired token',
  TOKEN_VERIFICATION_FAILED: 'Token verification failed',
  UNAUTHORIZED_ACCESS: 'User not authenticated',
  FORBIDDEN_ACCESS: 'Insufficient permissions',
  USER_NOT_FOUND: 'User not found',
  RESOURCE_NOT_FOUND: 'Resource not found',
  INTERNAL_ERROR: 'Internal server error',
  VALIDATION_ERROR: 'Validation error',
  INVALID_ROLE: 'Invalid user role'
};

// User Status
export const USER_STATUS = {
  ACTIVE: 1,
  INACTIVE: 0
};

// Resource Types
export const RESOURCE_TYPES = {
  USER: 'user',
  CATEGORY: 'category',
  SUBCATEGORY: 'subcategory',
  SHIPMENT: 'shipment',
  BID: 'bid'
};
