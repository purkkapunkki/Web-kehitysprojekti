import express from "express";

import { body } from "express-validator";
import { requireLogin } from "../middlewares/requireLogin.js";
import {
  addProductToShoppingCart,
  deleteProductFromShoppingCart,
} from "../controllers/shopping-cart-product-controller.js";

const shoppingCartProductRouter = express.Router();

shoppingCartProductRouter
  .route("/add-product-to-shopping-cart")
  .post(requireLogin, body("productId").isInt(), addProductToShoppingCart);
shoppingCartProductRouter
  .route("/remove-shopping-cart-product")
  .post(requireLogin, body("productId").isInt(), deleteProductFromShoppingCart);

export default shoppingCartProductRouter;
