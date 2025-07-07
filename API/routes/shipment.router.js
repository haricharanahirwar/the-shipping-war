import express from 'express';

//to link controller
//import * as CategoryController from '../controller/category.controller.js';
import * as ShipmentController from '../controller/shipment.controller.js';

const router = express.Router();

router.post("/save",ShipmentController.save);

router.get("/fetch",ShipmentController.fetch);

/*router.delete("/delete",CategoryController.deleteCategory);

router.patch("/update",CategoryController.update);*/

export default router;


