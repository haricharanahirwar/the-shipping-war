/**
 * Updated Category Router with RBAC
 * Demonstrates public read access with admin modification
 */

import express from 'express';

// Import middleware
import { authenticate } from '../Middleware/authenticate.middleware.js';
import { authorize, checkPermission } from '../Middleware/authorize.middleware.js';
import { 
  validateRequiredFields,
  sanitizeInputs 
} from '../Middleware/validate.middleware.js';
import { asyncHandler } from '../Middleware/errorHandler.middleware.js';
import { USER_ROLES } from '../constants/roles.constants.js';

// Import controller
import * as CategoryController from '../controller/category.controller.js';

const router = express.Router();

// ============================================
// PUBLIC ROUTES (No authentication required)
// ============================================

// Get all categories (public)
router.get("/", 
  asyncHandler(CategoryController.getAllCategories || CategoryController.fetch)
);

// Get single category
router.get("/:id", 
  asyncHandler(CategoryController.getCategoryById)
);

// ============================================
// ADMIN ONLY ROUTES
// ============================================

// Create category (admin only)
router.post("/", 
  authenticate,
  checkPermission('categories', 'create'),
  sanitizeInputs(),
  validateRequiredFields(['name', 'description']),
  asyncHandler(CategoryController.createCategory || CategoryController.save)
);

// Update category (admin only)
router.put("/:id", 
  authenticate,
  checkPermission('categories', 'update'),
  sanitizeInputs(),
  asyncHandler(CategoryController.updateCategory || CategoryController.update)
);

// Delete category (admin only)
router.delete("/:id", 
  authenticate,
  checkPermission('categories', 'delete'),
  asyncHandler(CategoryController.deleteCategory || CategoryController.delete)
);

export default router;
