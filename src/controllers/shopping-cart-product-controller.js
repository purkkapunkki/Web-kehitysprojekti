import express from "express";
import { validationResult } from "express-validator";

import {
  createShoppingCartProduct,
  deleteShoppingCartProduct,
} from "../models/shopping-cart-product-model.js";

/**
 * Add a product to the active user's shipping cart.
 * @param {express.Request} req http request
 * @param {express.Response} res http response
 * @param {express.NextFunction} next next middleware function
 */
const addProductToShoppingCart = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((error) => `${error.path}: ${error.msg}`);
    return res.status(400).json({ errors: errorMessages });
  }

  const productId = req.body["productId"];
  const quantity = 1;
  const shoppingCartId = res.locals.shoppingCartId;
  const result = await createShoppingCartProduct(
    shoppingCartId,
    productId,
    quantity
  );
  if (!result.error) {
    res.status(200).json({});
  } else {
    const error = new Error(result.error);
    error.status = result.status;
    return next(error);
  }
};

/**
 * Delete the given product from the active user's shopping cart.
 * @param {express.Request} req http request
 * @param {express.Response} res http response
 * @param {express.NextFunction} next next middleware function
 */
const deleteProductFromShoppingCart = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((error) => `${error.path}: ${error.msg}`);
    return res.status(400).json({ errors: errorMessages });
  }

  const productId = req.body["productId"];
  const shoppingCartId = res.locals.shoppingCartId;
  const result = await deleteShoppingCartProduct(productId, shoppingCartId);
  if (!result.error) {
    res.status(200).json({});
  } else {
    const error = new Error(result.error);
    error.status = result.status;
    return next(error);
  }
};

export { addProductToShoppingCart, deleteProductFromShoppingCart };
