import express from "express";

import { requireLogin } from "../middlewares/requireLogin.js";
import {
  showCartInfo,
  showCartItems,
  showOrderConfirmation,
  showOrderThankYou,
  sendOrder,
} from "../controllers/order-controller.js";

const orderRouter = express.Router();

orderRouter.route("/cart-items").get(requireLogin, showCartItems);
orderRouter.route("/cart-info").get(requireLogin, showCartInfo);
orderRouter
  .route("/order-confirmation")
  .get(requireLogin, showOrderConfirmation);
orderRouter.route("/order-thank-you").get(requireLogin, showOrderThankYou);
orderRouter.route("/send-order").post(requireLogin, sendOrder);

export default orderRouter;
