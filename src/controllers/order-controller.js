import express from "express";
import {
  clearShoppingCart,
  getAllShoppingCartProducts,
} from "../models/shopping-cart-product-model.js";
import { createRestaurantOrder } from "../models/restaurant-order-model.js";
import { createRestaurantOrderProduct } from "../models/restaurant-order-product-model.js";

/**
 * Show the shopping cart info page.
 * @param {express.Request} req http request
 * @param {express.Response} res http response
 * @param {express.NextFunction} next next middleware function
 */
const showCartInfo = async (req, res, next) => {
  res.render("order-shopping-cart-info");
};

/**
 * Show the shopping cart items page.
 * @param {express.Request} req http request
 * @param {express.Response} res http response
 * @param {express.NextFunction} next next middleware function
 */
const showCartItems = async (req, res, next) => {
  const shoppingCartProducts = res.locals.shoppingCartProducts;
  const cartTotalPrice = shoppingCartProducts
    .reduce((total, product) => total + Number(product.price), 0)
    .toFixed(2);

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
  res.render("order-shopping-cart-confirmation");
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

export {
  showCartInfo,
  showCartItems,
  showOrderConfirmation,
  showOrderThankYou,
  sendOrder,
};
