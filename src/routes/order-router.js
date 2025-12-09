import express from "express";
import { body } from "express-validator";

import { requireAdmin, requireLogin } from "../middlewares/requireLogin.js";
import {
  showCartInfo,
  showCartItems,
  showOrderConfirmation,
  showOrderThankYou,
  sendOrder,
  updateOrderStatus,
} from "../controllers/order-controller.js";

const orderRouter = express.Router();

orderRouter.route("/cart-items").get(requireLogin, showCartItems);
orderRouter.route("/cart-info").get(requireLogin, showCartInfo);
orderRouter
  .route("/order-confirmation")
  .get(requireLogin, showOrderConfirmation);
orderRouter.route("/order-thank-you").get(requireLogin, showOrderThankYou);
orderRouter.route("/send-order").post(requireLogin, sendOrder);
orderRouter
  .route("/update-order-status")
  .post(
    requireAdmin,
    body("orderId").isInt(),
    body("status").notEmpty(),
    updateOrderStatus
  );

export default orderRouter;
