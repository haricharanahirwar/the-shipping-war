import express from 'express';
import { authenticate } from '../Middleware/authenticate.middleware.js';
import { authorize } from '../Middleware/authorize.middleware.js';
import { USER_ROLES } from '../constants/roles.constants.js';
import * as CategoryController from '../controller/category.controller.js';

const router = express.Router();

// Public route - fetch categories
router.get("/fetch", CategoryController.fetch);

// Protected routes - admin only
router.post("/save", 
  authenticate,
  authorize([USER_ROLES.ADMIN]),
  CategoryController.save
);

router.delete("/delete", 
  authenticate,
  authorize([USER_ROLES.ADMIN]),
  CategoryController.deleteCategory
);

router.patch("/update", 
  authenticate,
  authorize([USER_ROLES.ADMIN]),
  CategoryController.update
);

export default router;


