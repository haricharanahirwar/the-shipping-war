import express from 'express';
import { authenticate } from '../Middleware/authenticate.middleware.js';
import { authorize, checkPermission } from '../Middleware/authorize.middleware.js';
import { USER_ROLES } from '../constants/roles.constants.js';
import * as ShipmentController from '../controller/shipment.controller.js';

const router = express.Router();

// Public route - fetch shipments
router.get("/fetch", ShipmentController.fetch);

// Protected route - save shipment (requires authentication)
router.post("/save", 
  authenticate,
  ShipmentController.save
);

// Protected route - delete shipment (admin only)
router.delete("/delete", 
  authenticate,
  authorize([USER_ROLES.ADMIN]),
  ShipmentController.deleteShipment
);

// Protected route - update shipment (user/admin)
router.patch("/update", 
  authenticate,
  ShipmentController.updateShipment
);

export default router;



// Order confirmation routes
router.post("/confirm-order",
  authenticate,
  ShipmentController.confirmOrder
);

router.get("/get-winner",
  authenticate,
  ShipmentController.getWinner
);

router.post("/complete-order",
  authenticate,
  ShipmentController.completeOrder
);
