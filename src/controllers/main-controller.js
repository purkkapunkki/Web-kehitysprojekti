import express from "express";
// import { listAllMedia } from "../models/media-model.js";

/**
 * Show the main page.
 * @param {express.Request} req http request
 * @param {express.Response} res http response
 * @param {express.NextFunction} next next middleware function
 */
const mainPage = async (req, res, next) => {
  res.render("main");
};

export { mainPage };
