import express from "express";
import { getShoppingCart } from "../models/shopping-cart-model.js";
import { getAllShoppingCartProducts } from "../models/shopping-cart-product-model.js";

/**
 * Add the shopping cart id to the response locals.
 *
 * This way it's available in templates.
 * @param {express.Request} req http request
 * @param {express.Response} res http response
 * @param {express.NextFunction} next next function
 */
const shoppingCart = async (req, res, next) => {
  let shoppingCartId = null;
  if (req.session.user) {
    const shoppingCartResult = await getShoppingCart(req.session.user.id);
    if (shoppingCartResult.error) {
      console.error("shoppingCart error", shoppingCartResult.error);
      const error = new Error(shoppingCartResult.error);
      error.status = shoppingCartResult.status;
      return next(error);
    }
    shoppingCartId = shoppingCartResult.shopping_cart_id;
  }
  res.locals.shoppingCartId = shoppingCartId;
  next();
};

/**
 * Add all shopping cart products to the response locals.
 *
 * This way they are available in templates.
 * @param {express.Request} req http request
 * @param {express.Response} res http response
 * @param {express.NextFunction} next next function
 */
const shoppingCartProducts = async (req, res, next) => {
  let shoppingCartProducts = [];
  if (res.locals.shoppingCartId) {
    const shoppingCartId = res.locals.shoppingCartId;
    const shoppingCartProductResult = await getAllShoppingCartProducts(
      shoppingCartId
    );
    if (shoppingCartProductResult.error) {
      console.error(
        "shoppingCartProducts error",
        shoppingCartProductResult.error
      );

      const error = new Error(shoppingCartProductResult.error);
      error.status = shoppingCartProductResult.status;
      return next(error);
    }
    shoppingCartProducts = shoppingCartProductResult;
  }
  res.locals.shoppingCartProducts = shoppingCartProducts;
  next();
};

export { shoppingCart, shoppingCartProducts };
