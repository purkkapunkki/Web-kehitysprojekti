import express from "express";
import { validationResult } from "express-validator";

import {
  clearShoppingCart,
  getAllShoppingCartProducts,
} from "../models/shopping-cart-product-model.js";
import {
  createRestaurantOrder,
  setOrderStatus,
} from "../models/restaurant-order-model.js";
import { createRestaurantOrderProduct } from "../models/restaurant-order-product-model.js";
import { getCartTotalPrice } from "../utils/shopping-cart.js";

/**
 * Show the shopping cart info page.
 * @param {express.Request} req http request
 * @param {express.Response} res http response
 * @param {express.NextFunction} next next middleware function
 */
const showCartInfo = async (req, res, next) => {
  const shoppingCartProducts = res.locals.shoppingCartProducts;
  const cartTotalPrice = getCartTotalPrice(shoppingCartProducts);
  res.render("order-shopping-cart-info", {
    cartTotalPrice,
  });
};

/**
 * Show the shopping cart items page.
 * @param {express.Request} req http request
 * @param {express.Response} res http response
 * @param {express.NextFunction} next next middleware function
 */
const showCartItems = async (req, res, next) => {
  const shoppingCartProducts = res.locals.shoppingCartProducts;
  const cartTotalPrice = getCartTotalPrice(shoppingCartProducts);
  res.render("order-shopping-cart-items", {
    cartTotalPrice,
  });
};

/**
 * Show the shopping cart order confirmation page.
 * @param {express.Request} req http request
 * @param {express.Response} res http response
 * @param {express.NextFunction} next next middleware function
 */
const showOrderConfirmation = async (req, res, next) => {
  const shoppingCartProducts = res.locals.shoppingCartProducts;
  const cartTotalPrice = getCartTotalPrice(shoppingCartProducts);
  res.render("order-shopping-cart-confirmation", {
    cartTotalPrice,
  });
};

/**
 * Show the shopping cart order thank you page.
 * @param {express.Request} req http request
 * @param {express.Response} res http response
 * @param {express.NextFunction} next next middleware function
 */
const showOrderThankYou = async (req, res, next) => {
  res.render("order-thank-you-for-ordering");
};

/**
 * Send order.
 * @param {express.Request} req http request
 * @param {express.Response} res http response
 * @param {express.NextFunction} next next middleware function
 */
const sendOrder = async (req, res, next) => {
  const orderCreateResult = await createRestaurantOrder(
    req.session.user.id,
    "pending"
  );
  if (orderCreateResult.error) {
    const error = new Error(orderCreateResult.error);
    error.status = orderCreateResult.status;
    return next(error);
  }

  const shoppingCartId = res.locals.shoppingCartId;
  const shoppingCartProductResult = await getAllShoppingCartProducts(
    shoppingCartId
  );
  if (shoppingCartProductResult.error) {
    const error = new Error(shoppingCartProductResult.error);
    error.status = shoppingCartProductResult.status;
    return next(error);
  }

  const restaurantOrderProductResult = await createRestaurantOrderProduct(
    orderCreateResult.orderId,
    shoppingCartProductResult
  );
  if (restaurantOrderProductResult.error) {
    const error = new Error(restaurantOrderProductResult.error);
    error.status = restaurantOrderProductResult.status;
    return next(error);
  }

  const clearShoppingCartResult = await clearShoppingCart(shoppingCartId);
  if (clearShoppingCartResult.error) {
    const error = new Error(clearShoppingCartResult.error);
    error.status = clearShoppingCartResult.status;
    return next(error);
  } else {
    res.status(201).json({ orderId: orderCreateResult.orderId });
  }
};

/**
 * Update the given order to the given status.
 * @param {express.Request} req http request
 * @param {express.Response} res http response
 * @param {express.NextFunction} next next middleware function
 */
const updateOrderStatus = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((error) => `${error.path}: ${error.msg}`);
    return res.status(400).json({ errors: errorMessages });
  }

  const productId = req.body["orderId"];
  const status = req.body["status"];
  const result = await setOrderStatus(productId, status);
  if (!result.error) {
    res.status(200).json({});
  } else {
    const error = new Error(result.error);
    error.status = result.status;
    return next(error);
  }
};

export {
  showCartInfo,
  showCartItems,
  showOrderConfirmation,
  showOrderThankYou,
  sendOrder,
  updateOrderStatus,
};
