import express from "express";

import { mainPage } from "../controllers/main-controller.js";

const mainRouter = express.Router();

mainRouter.route("/").get(mainPage);

export default mainRouter;
