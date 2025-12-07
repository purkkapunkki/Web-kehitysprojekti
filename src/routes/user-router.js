import express from "express";
import { body } from "express-validator";

import { requireAdmin, requireLogin } from "../middlewares/requireLogin.js";
import {
  registerUser,
  showLoginPage,
  showRegisterPage,
  loginUser,
  userProfile,
  userAdminProfile,
  userLogout,
} from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter
  .route("/register")
  .get(showRegisterPage)
  .post(
    body("first-name").trim().isLength({ min: 3, max: 20 }).isAlphanumeric(),
    body("last-name").trim().isLength({ min: 3, max: 20 }).isAlphanumeric(),
    body("email").trim().isEmail(),
    body("password").trim().isLength({ min: 8 }),
    registerUser
  );
userRouter
  .route("/login")
  .get(showLoginPage)
  .post(body("email").trim().isEmail(), loginUser);
userRouter.route("/logout").get(userLogout);
userRouter.route("/profile").get(requireLogin, userProfile);
userRouter.route("/admin-profile").get(requireAdmin, userAdminProfile);

export default userRouter;
