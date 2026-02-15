/**
 * Updated Bid Router with RBAC
 * Demonstrates role-based access for bidding functionality
 */

import express from 'express';

// Import middleware
import { authenticate } from '../Middleware/authenticate.middleware.js';
import { checkPermission } from '../Middleware/authorize.middleware.js';
import { 
  validateRequiredFields,
  sanitizeInputs 
} from '../Middleware/validate.middleware.js';
import { asyncHandler } from '../Middleware/errorHandler.middleware.js';

// Import controller
import * as BidController from '../controller/bid.controller.js';

const router = express.Router();

// ============================================
// PROTECTED ROUTES (Authentication required)
// ============================================

// Create bid (users with permission)
router.post("/", 
  authenticate,
  checkPermission('bids', 'create'),
  sanitizeInputs(),
  validateRequiredFields(['shipmentId', 'amount']),
  asyncHandler(BidController.createBid || BidController.save)
);

// Get my bids
router.get("/my-bids", 
  authenticate,
  asyncHandler(BidController.getMyBids)
);

// Get bids for a shipment
router.get("/shipment/:shipmentId", 
  authenticate,
  asyncHandler(BidController.getBidsForShipment)
);

// Get single bid
router.get("/:id", 
  authenticate,
  asyncHandler(BidController.getBidById || BidController.fetch)
);

// Update bid (user can update own bid)
router.put("/:id", 
  authenticate,
  checkPermission('bids', 'update'),
  sanitizeInputs(),
  asyncHandler(BidController.updateBid || BidController.update)
);

// Accept bid (shipment owner only)
router.patch("/:id/accept", 
  authenticate,
  asyncHandler(BidController.acceptBid)
);

// Reject bid (shipment owner only)
router.patch("/:id/reject", 
  authenticate,
  asyncHandler(BidController.rejectBid)
);

// Delete bid (user can delete own bid)
router.delete("/:id", 
  authenticate,
  checkPermission('bids', 'delete'),
  asyncHandler(BidController.deleteBid || BidController.delete)
);

export default router;
