import express from "express";
import { validationResult } from "express-validator";

import { createUser, checkIfUserExists } from "../models/user-model.js";
import { createShoppingCart } from "../models/shopping-cart-model.js";
import { getAllOrders } from "../models/restaurant-order-model.js";

/**
 * Show the user register page.
 * @param {express.Request} req http request
 * @param {express.Response} res http response
 * @param {express.NextFunction} next next middleware function
 */
const showRegisterPage = async (req, res, next) => {
  res.render("user-register");
};

/**
 * Register a new user.
 * @param {express.Request} req http request
 * @param {express.Response} res http response
 * @param {express.NextFunction} next next middleware function
 */
const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((error) => `${error.path}: ${error.msg}`);
    return res.render("user-register", { errors: errorMessages });
  }

  const firstName = req.body["first-name"];
  const lastName = req.body["last-name"];
  const email = req.body["email"];
  const password = req.body["password"];
  const isAdmin = false;
  const result = await createUser(
    firstName,
    lastName,
    email,
    password,
    isAdmin
  );
  if (!result.error) {
    // TODO:
    // - Maybe hash and salt the user's password?
    // - Login the user by adding the user to the session.
    // - Create a shopping cart for the user (either here,
    //   or when the first product is added to the cart).
    //   Create a model function e.g. named createShoppingCart,
    //   which takes a user id, and create the shopping cart
    //   for the user.
    // - Create a logout endpoint (add route and a controller).
    //   The controller should redirect the user to the front page,
    //   i.e. `res.redirect("/");`
    // TODO for LATER:
    // - Show the number of products in user's shopping cart.
    //   Maybe add a middleware which adds the user to the request,
    //   and maybe also adds the user to the template context
    // - Show the user's orders in the profile page.
    // - Show all orders on the admin page, and allow the admin
    //   to change the statuses of the orders
    const shoppingCartResult = await createShoppingCart(result.userId);
    if (shoppingCartResult.error) {
      const error = new Error(shoppingCartResult.error);
      error.status = shoppingCartResult.status;
      return next(error);
    }
    req.session.user = { id: result.userId, firstName: firstName };
    res.redirect("/");
  } else {
    res.status(result.status);
    res.render("user-register", { errors: [result.error] });
  }
};

/**
 * Show the user login page.
 * @param {express.Request} req http request
 * @param {express.Response} res http response
 * @param {express.NextFunction} next next middleware function
 */
const showLoginPage = async (req, res, next) => {
  res.render("user-login");
};

/**
 * Login the user with the given credentials.
 * @param {express.Request} req http request
 * @param {express.Response} res http response
 * @param {express.NextFunction} next next middleware function
 */
const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((error) => `${error.path}: ${error.msg}`);
    res.status(400);
    return res.render("user-login", { errors: errorMessages });
  }

  const email = req.body["email"];
  const password = req.body["password"];
  const result = await checkIfUserExists(email, password);
  if (!result.error) {
    req.session.user = { id: result.user_id, firstName: result.first_name };
    res.redirect("/");
  } else {
    res.status(result.status);
    res.render("user-login", { errors: [result.error] });
  }
};

/**
 * Show the user detail page.
 * @param {express.Request} req http request
 * @param {express.Response} res http response
 * @param {express.NextFunction} next next middleware function
 */
const userProfile = async (req, res, next) => {
  const result = await getAllOrders(req.session.user.id);
  if (result.error) {
    const error = new Error(result.error);
    error.status = result.status;
    return next(error);
  }
  res.render("user-profile", { orders: result });
};

/**
 * Show the user-admin detail page.
 * @param {express.Request} req http request
 * @param {express.Response} res http response
 * @param {express.NextFunction} next next middleware function
 */
const userAdminProfile = async (req, res, next) => {
  res.render("user-admin-profile");
};

/**
 * Log out user.
 * @param {express.Request} req http request
 * @param {express.Response} res http response
 * @param {express.NextFunction} next next middleware function
 */
const userLogout = async (req, res, next) => {
  req.session.destroy((error) => {
    if (!error) {
      res.redirect("/");
    } else {
      // TODO: show the error to the user
      res.redirect("/user/logout");
    }
  });
};

export {
  showLoginPage,
  showRegisterPage,
  registerUser,
  loginUser,
  userProfile,
  userAdminProfile,
  userLogout,
};
