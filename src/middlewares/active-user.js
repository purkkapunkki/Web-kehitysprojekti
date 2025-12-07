import express from "express";

/**
 * Add active user to the response locals.
 *
 * This way the active user is available in templates.
 * @param {express.Request} req http request
 * @param {express.Response} res http response
 * @param {express.NextFunction} next next function
 */
const activeUser = (req, res, next) => {
  res.locals.user = req.session.user;
  next();
};

export { activeUser };
