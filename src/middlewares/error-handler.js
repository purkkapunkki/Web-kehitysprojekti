import express from "express";

/**
 * Handler for 404 errors.
 * @param {express.Request} req http request
 * @param {express.Response} res http response
 * @param {express.NextFunction} next next function
 */
const notFoundHandler = (req, res, next) => {
  const error = new Error("Sivua ei löytynyt");
  error.status = 404;
  next(error); // forward error to error handler
};

/**
 * Custom default middleware for handling errors
 * @param {express.Request} req http request
 * @param {express.Response} res http response
 * @param {express.NextFunction} next next function
 */
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.render("error-page", { error: err.message });
};

export { notFoundHandler, errorHandler };
