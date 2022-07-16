import { Router } from "express";
import {
  createOrder,
  captureOrder,
  cancelOrder,
} from "../controllers/payment.controller";

import { createOrder2 } from "../controllers/payment.mouse";

import { createOrder3 } from "../controllers/payment.keyboard";

const router = Router();

router.post("/create-order", createOrder);

router.post("/create-order2", createOrder2);

router.post("/create-order3", createOrder3);

router.get("/capture-order", captureOrder);

router.get("/cancel-order", cancelOrder);

router.get("/");
export default router;
