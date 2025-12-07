import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
const { urlencoded } = bodyParser;
import session from "express-session";

import { errorHandler, notFoundHandler } from "./middlewares/error-handler.js";
import { activeUser } from "./middlewares/active-user.js";
import {
  shoppingCart,
  shoppingCartProducts,
} from "./middlewares/shopping-cart.js";
import mainRouter from "./routes/main-router.js";
import userRouter from "./routes/user-router.js";
import menuRouter from "./routes/menu-router.js";
import orderRouter from "./routes/order-router.js";
import shoppingCartProductRouter from "./routes/shopping-cart-product-router.js";

const hostname = "127.0.0.1";
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "src/views");

// needed for reading request body in JSON format
app.use(express.json());

// Adds form data to requests
app.use(urlencoded());

// Adds session support
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Include the active user, shopping cart id, and shopping cart
//  products in response locals.
app.use(activeUser);
app.use(shoppingCart);
app.use(shoppingCartProducts);

// Serve static files ('public' folder -> http server root)
app.use("/", express.static("public"));
app.use("/media", express.static("media"));

// api endpoints
app.use("/", mainRouter);
app.use("/user", userRouter);
app.use("/menu", menuRouter);
app.use("/order", orderRouter);
app.use("/shopping-cart-product", shoppingCartProductRouter);
/* TODO: HTML page routes (router):
 *  - main page (main)
 *  - user register (user)
 *  - user login (user)
 *  - user detail page (user)
 *  - order items page (order)
 *  - order info page (order)
 *  - order confirmation page (order)
 *  - order thank you page (order)
 *  - order status edit (order)
 *  - menu page (menu)
 *  - admin page (main/user)
 * AJAX routes:
 *  - add order item to cart
 *  - remove order item from cart
 *  - change order item quantity
 *  - dish add
 *  - dish edit
 *  - dish remove
 *  - discount add
 *  - discount add
 *  - discount edit
 *  - discount remove
 */

// Default for all routes not handled by routers above
app.use(notFoundHandler);
// Add error handler middleware as the last middleware in the chain
app.use(errorHandler);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
