import express from 'express';

// Import middleware
import { authenticate } from '../Middleware/authenticate.middleware.js';
import { authorize, checkPermission, ownershipCheck } from '../Middleware/authorize.middleware.js';
import { 
  validateRequiredFields, 
  validateEmail, 
  validatePhoneNumber,
  validatePassword,
  sanitizeInputs 
} from '../Middleware/validate.middleware.js';
import { asyncHandler } from '../Middleware/errorHandler.middleware.js';
import { USER_ROLES } from '../constants/roles.constants.js';

// Import controller
import * as UserController from '../controller/user.controller.js';

const router = express.Router();

// ============================================
// PUBLIC ROUTES (No authentication required)
// ============================================

// Register new user
router.post("/register", 
  sanitizeInputs(),
  validateRequiredFields(['name', 'email', 'mobile', 'address', 'city', 'gender']),
  validateEmail('email'),
  validatePhoneNumber('mobile'),
  asyncHandler(UserController.register || UserController.save)
);

// Login
router.post("/login", 
  sanitizeInputs(),
  validateRequiredFields(['email', 'password']),
  validateEmail('email'),
  asyncHandler(UserController.login)
);

// ============================================
// PROTECTED ROUTES (Authentication required)
// ============================================

// Get user profile (authenticated users)
router.get("/profile", 
  authenticate,
  asyncHandler(UserController.getProfile || UserController.fetch)
);

// Update own profile
router.patch("/profile", 
  authenticate,
  sanitizeInputs(),
  asyncHandler(UserController.updateProfile || UserController.update)
);

// Change own password
router.patch("/change-password",
  authenticate,
  sanitizeInputs(),
  asyncHandler(UserController.changePassword)
);

// ============================================
// ADMIN & MANAGER ROUTES
// ============================================

// Get all users (Admin & Manager)
router.get("/all", 
  authenticate,
  authorize([USER_ROLES.ADMIN, USER_ROLES.MANAGER]),
  asyncHandler(UserController.getAllUsers || UserController.fetch)
);

// Fetch users with filters (Admin & Manager)
router.get("/fetch", 
  authenticate,
  authorize([USER_ROLES.ADMIN, USER_ROLES.MANAGER]),
  asyncHandler(UserController.fetch)
);

// Delete user (Admin only)
router.delete("/delete", 
  authenticate,
  authorize([USER_ROLES.ADMIN]),
  asyncHandler(UserController.deleteUser)
);

// Update user (Admin & Manager - Manager can activate/deactivate users)
router.patch("/update", 
  authenticate,
  authorize([USER_ROLES.ADMIN, USER_ROLES.MANAGER]),
  sanitizeInputs(),
  asyncHandler(UserController.update)
);

export default router;