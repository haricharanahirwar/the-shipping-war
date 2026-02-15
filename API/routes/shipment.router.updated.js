/**
 * Updated Shipment Router with RBAC
 * Demonstrates role-based access control implementation
 */

import express from 'express';

// Import middleware
import { authenticate } from '../Middleware/authenticate.middleware.js';
import { authorize, checkPermission, ownershipCheck } from '../Middleware/authorize.middleware.js';
import { 
  validateRequiredFields,
  sanitizeInputs 
} from '../Middleware/validate.middleware.js';
import { asyncHandler } from '../Middleware/errorHandler.middleware.js';
import { USER_ROLES } from '../constants/roles.constants.js';

// Import controller
import * as ShipmentController from '../controller/shipment.controller.js';

const router = express.Router();

// ============================================
// PUBLIC ROUTES
// ============================================

// Get all shipments (public view)
router.get("/", 
  asyncHandler(ShipmentController.getPublicShipments || ShipmentController.fetch)
);

// Get single shipment details
router.get("/:id", 
  asyncHandler(ShipmentController.getShipmentDetails)
);

// ============================================
// PROTECTED ROUTES (Authentication required)
// ============================================

// Create shipment (users need permission)
router.post("/", 
  authenticate,
  checkPermission('shipments', 'create'),
  sanitizeInputs(),
  validateRequiredFields(['title', 'description', 'pickupLocation', 'deliveryLocation']),
  asyncHandler(ShipmentController.createShipment)
);

// Get my shipments (users see only their own)
router.get("/my-shipments", 
  authenticate,
  asyncHandler(ShipmentController.getMyShipments)
);

// Update shipment (user or manager)
router.put("/:id", 
  authenticate,
  checkPermission('shipments', 'update'),
  sanitizeInputs(),
  asyncHandler(ShipmentController.updateShipment)
);

// ============================================
// ADMIN ONLY ROUTES
// ============================================

// Get all shipments for admin
router.get("/admin/all", 
  authenticate,
  authorize(USER_ROLES.ADMIN),
  asyncHandler(ShipmentController.getAllShipments)
);

// Delete shipment (admin only)
router.delete("/:id", 
  authenticate,
  checkPermission('shipments', 'delete'),
  asyncHandler(ShipmentController.deleteShipment)
);

// Update shipment status (admin/manager)
router.patch("/:id/status", 
  authenticate,
  authorize([USER_ROLES.ADMIN, USER_ROLES.MANAGER]),
  sanitizeInputs(),
  validateRequiredFields(['status']),
  asyncHandler(ShipmentController.updateShipmentStatus)
);

export default router;
