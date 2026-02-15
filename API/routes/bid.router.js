import express from 'express';
import { authenticate, authenticateOptional } from '../Middleware/authenticate.middleware.js';
import { authorize } from '../Middleware/authorize.middleware.js';
import { USER_ROLES } from '../constants/roles.constants.js';
import * as BidController from '../controller/bid.controller.js';

const router = express.Router();

// Protected routes - authentication required
// All authenticated users (USER, MANAGER, ADMIN) can place bids
router.post("/save", 
  authenticate,
  authorize([USER_ROLES.USER, USER_ROLES.MANAGER, USER_ROLES.ADMIN]),
  BidController.save
);

// Fetch bids - optional authentication (public can view bids)
router.get("/fetch", 
  authenticateOptional,
  BidController.fetch
);

export default router;