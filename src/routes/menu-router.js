import express from "express";

import { showMenu } from "../controllers/menu-controller.js";

const menuRouter = express.Router();

menuRouter.route("/menu").get(showMenu);

export default menuRouter;
