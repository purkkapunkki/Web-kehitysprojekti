import promisePool from "../utils/database.js";

/* TODO: Tuotteen lisäys ostoskoriin -ominaisuus:
 * - Frontend:
 *   - Lisää event-kuuntelijat "Lisää ostoskoriin" -napeille
 *     - Kuuntelijan pitäisi kutsua reittiä, joka lisää valitun tuotteen ostoskoriin.
 *     - Jos pyyntö reittiin onnistuu, kuuntelijan pitäisi näyttää käyttäjälle viesti asiasta.
 *       - Olisi kiva jos ostoskorin yläpuolella näkyisi tuotteiden määrä. Tämä vaatinee
 *         ylimääräistä työtä, koska tuotteiden määrä pitää hakea kannasta.
 * - Backend:
 *   - Lisää reitti joka lisää valitun tuotteen ostoskoriin.
 *   - Lisää reitille controlleri
 *   - Kutsu controllerissa createShoppingCartProduct-funktiota
 *     - Jotta tämä onnistuu, pitää käyttäjän shopping cartin id myös hakea,
 *       jota varten pitää luoda oma model funktio shopping-cart-model.js:ään
 */
/**
 * Create a shopping cart product with the given parameters.
 * @param {Number} shoppingCartId
 * @param {Number} productId
 * @param {Number} quantity
 * @returns {Object} An object with a possible error.
 */
const createShoppingCartProduct = async (
  shoppingCartId,
  productId,
  quantity
) => {
  const sql = `
      INSERT INTO Shopping_cart_product (shopping_cart_id, product_id, quantity)
      VALUES (?, ?, ?)
    `;
  const params = [shoppingCartId, productId, quantity];
  try {
    const rows = await promisePool.execute(sql, params);
    return {};
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message, status: 500 };
  }
};

/**
 * Delete the given product from the given shopping cart.
 * @param {Number} productId
 * @param {Number} shoppingCartId
 * @returns {Object} An object containing a possible error.
 */
const deleteShoppingCartProduct = async (productId, shoppingCartId) => {
  const sql = `
      DELETE
      FROM shopping_cart_product
      WHERE shopping_cart_product.product_id = ? AND shopping_cart_product.shopping_cart_id = ?
    `;
  const params = [productId, shoppingCartId];
  try {
    const rows = await promisePool.execute(sql, params);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message, status: 500 };
  }
};

/**
 * Get all products from a shopping cart.
 * @param {Number} shoppingCartId
 * @returns {Object[]} An object with the userId key containing the new user's id.
 */
const getAllShoppingCartProducts = async (shoppingCartId) => {
  const sql = `
      SELECT product.product_id, product.name, product.image, product.price, shopping_cart_product.quantity
      FROM shopping_cart_product
      JOIN product ON product.product_id = shopping_cart_product.product_id
      WHERE shopping_cart_product.shopping_cart_id = ?
    `;
  const params = [shoppingCartId];
  try {
    const rows = await promisePool.execute(sql, params);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message, status: 500 };
  }
};

/**
 * Remove all products from a shopping cart.
 * @param {Number} shoppingCartId
 * @returns {Object} An object containing a possible error.
 */
const clearShoppingCart = async (shoppingCartId) => {
  const sql = `
      DELETE
      FROM shopping_cart_product
      WHERE shopping_cart_product.shopping_cart_id = ?
    `;
  const params = [shoppingCartId];
  try {
    const rows = await promisePool.execute(sql, params);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message, status: 500 };
  }
};

export {
  createShoppingCartProduct,
  deleteShoppingCartProduct,
  getAllShoppingCartProducts,
  clearShoppingCart,
};
