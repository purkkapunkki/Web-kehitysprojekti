import express from "express";

/**
 * Verify that the user has logged in.
 * @param {express.Request} req http request
 * @param {express.Response} res http response
 * @param {express.NextFunction} next next function
 */
const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    const error = new Error("Ole hyvä ja kirjaudu sisään");
    error.status = 403;
    next(error); // forward error to error handler
  }
  next();
};

/**
 * Verify that the user is an admin user.
 * @param {express.Request} req http request
 * @param {express.Response} res http response
 * @param {express.NextFunction} next next function
 */
const requireAdmin = (req, res, next) => {
  if (!req.session.user) {
    const error = new Error("Ole hyvä ja kirjaudu sisään");
    error.status = 403;
    return next(error); // forward error to error handler
  }
  if (!req.session.user.isAdmin) {
    const error = new Error("Et ole ylläpitäjä");
    error.status = 403;
    return next(error); // forward error to error handler
  }
  next();
};

export { requireLogin, requireAdmin };
