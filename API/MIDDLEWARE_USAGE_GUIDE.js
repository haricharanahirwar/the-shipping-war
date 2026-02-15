/**
 * Middleware Usage Examples
 * 
 * This file demonstrates how to use the RBAC middleware in routes
 * Copy these patterns to your route files for consistent authorization
 */

// ============================================
// EXAMPLE 1: Simple Role-Based Authorization
// ============================================

// In your route file (e.g., routes/admin.router.js)
import express from 'express';
import { authenticate } from '../Middleware/authenticate.middleware.js';
import { authorize } from '../Middleware/authorize.middleware.js';
import { USER_ROLES } from '../constants/roles.constants.js';
import * as AdminController from '../controller/admin.controller.js';

const router = express.Router();

// Only administrators can access this route
router.get('/dashboard', 
  authenticate, 
  authorize(USER_ROLES.ADMIN),
  AdminController.getDashboard
);

// Both admin and manager can create reports
router.post('/reports', 
  authenticate, 
  authorize([USER_ROLES.ADMIN, USER_ROLES.MANAGER]),
  AdminController.createReport
);

// ============================================
// EXAMPLE 2: Permission-Based Authorization
// ============================================

// Check specific resource and action permissions
import { checkPermission } from '../Middleware/authorize.middleware.js';

// Only users with 'admin' role can delete users
router.delete('/users/:id', 
  authenticate, 
  checkPermission('users', 'delete'),
  UserController.deleteUser
);

// Users with shipment update permission can update
router.put('/shipments/:id', 
  authenticate, 
  checkPermission('shipments', 'update'),
  ShipmentController.updateShipment
);

// ============================================
// EXAMPLE 3: Ownership Check
// ============================================

import { ownershipCheck } from '../Middleware/authorize.middleware.js';

// Users can only update their own profiles (admins can update anyone)
router.put('/users/:id', 
  authenticate, 
  ownershipCheck('id'),
  UserController.updateProfile
);

// ============================================
// EXAMPLE 4: Input Validation
// ============================================

import { 
  validateRequiredFields, 
  validateEmail, 
  validatePhoneNumber,
  validatePassword,
  sanitizeInputs 
} from '../Middleware/validate.middleware.js';

// Create user with validation
router.post('/users', 
  sanitizeInputs(),
  validateRequiredFields(['name', 'email', 'mobile', 'password']),
  validateEmail('email'),
  validatePhoneNumber('mobile'),
  validatePassword('password'),
  UserController.createUser
);

// ============================================
// EXAMPLE 5: Custom Authorization
// ============================================

import { customAuthorize } from '../Middleware/authorize.middleware.js';

// Custom logic: Only managers and admins can view high-value shipments
const checkHighValueAccess = async (req) => {
  const userRole = req.user.role;
  return [USER_ROLES.ADMIN, USER_ROLES.MANAGER].includes(userRole);
};

router.get('/shipments/high-value', 
  authenticate, 
  customAuthorize(checkHighValueAccess),
  ShipmentController.getHighValueShipments
);

// ============================================
// EXAMPLE 6: Multiple Middlewares in Sequence
// ============================================

// Create shipment with full validation and authorization
router.post('/shipments', 
  authenticate,                                    // Verify user is logged in
  checkPermission('shipments', 'create'),         // Check if user can create shipments
  sanitizeInputs(),                               // Sanitize inputs
  validateRequiredFields(['title', 'description']), // Validate required fields
  ShipmentController.createShipment
);

// ============================================
// EXAMPLE 7: Role-Based Controller Logic
// ============================================

// In your controller (e.g., controller/shipment.controller.js)
import { USER_ROLES } from '../constants/roles.constants.js';

export const getShipments = async (req, res) => {
  try {
    let query = {};
    
    // Users can only see their own shipments, managers and admins see all
    if (req.user.role === USER_ROLES.USER) {
      query.userId = req.user._id;
    }
    
    const shipments = await ShipmentModel.find(query);
    
    res.status(200).json({
      status: true,
      data: shipments,
      count: shipments.length
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message
    });
  }
};

// ============================================
// EXAMPLE 8: Error Handling with asyncHandler
// ============================================

import { asyncHandler } from '../Middleware/errorHandler.middleware.js';

// Use asyncHandler to catch promise rejections
router.get('/shipments', 
  authenticate,
  asyncHandler(ShipmentController.getShipments)
);

// ============================================
// COMPLETE EXAMPLE ROUTE FILE
// ============================================

// routes/user.router.js example with all best practices
/*
import express from 'express';
import { authenticate } from '../Middleware/authenticate.middleware.js';
import { authorize, checkPermission, ownershipCheck } from '../Middleware/authorize.middleware.js';
import { validateRequiredFields, validateEmail, validatePhoneNumber } from '../Middleware/validate.middleware.js';
import { asyncHandler } from '../Middleware/errorHandler.middleware.js';
import { USER_ROLES } from '../constants/roles.constants.js';
import * as UserController from '../controller/user.controller.js';

const router = express.Router();

// Public Routes
router.post('/register', asyncHandler(UserController.register));
router.post('/login', asyncHandler(UserController.login));

// Protected Routes
router.get('/profile', 
  authenticate,
  asyncHandler(UserController.getProfile)
);

router.put('/profile/:id',
  authenticate,
  ownershipCheck('id'),
  asyncHandler(UserController.updateProfile)
);

// Admin Only Routes
router.get('/all-users',
  authenticate,
  authorize(USER_ROLES.ADMIN),
  asyncHandler(UserController.getAllUsers)
);

router.delete('/users/:id',
  authenticate,
  checkPermission('users', 'delete'),
  asyncHandler(UserController.deleteUser)
);

export default router;
*/

// ============================================
// PERMISSION MATRIX REFERENCE
// ============================================

/*
ADMIN:
  ✓ Create, Read, Update, Delete Users, Categories, Subcategories
  ✓ Create, Read, Update, Delete Shipments and Bids
  ✓ Access Reports and Settings

MANAGER:
  ✓ Read Users (view only)
  ✓ Read Categories and Subcategories (view only)
  ✓ Create, Read, Update Shipments (not delete)
  ✓ Read Bids (view only)
  ✓ Access Reports

USER:
  ✓ Read own profile (ownership check applies)
  ✓ Read Categories and Subcategories (public)
  ✓ Create, Read, Update own Shipments (ownership check)
  ✓ Create, Read, Update own Bids (ownership check)
  ✗ Cannot delete anything
  ✗ Cannot access admin/settings

*/

export default router;
