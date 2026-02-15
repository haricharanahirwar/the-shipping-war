import express from 'express';
import { authenticate } from '../Middleware/authenticate.middleware.js';
import { authorize } from '../Middleware/authorize.middleware.js';
import { USER_ROLES } from '../constants/roles.constants.js';
import * as SubCategoryController from '../controller/subcategory.controller.js';

const router = express.Router();

// Public route - fetch subcategories
router.get("/fetch", SubCategoryController.fetch);

// Protected routes - admin only
router.post("/save", 
  authenticate,
  authorize([USER_ROLES.ADMIN]),
  SubCategoryController.save
);

router.delete("/delete", 
  authenticate,
  authorize([USER_ROLES.ADMIN]),
  SubCategoryController.deleteSubCategory
);

router.patch("/update", 
  authenticate,
  authorize([USER_ROLES.ADMIN]),
  SubCategoryController.update
);

export default router;


