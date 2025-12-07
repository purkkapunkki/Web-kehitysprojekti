import promisePool from "../utils/database.js";

/**
 * Create a shopping cart with the given parameters.
 * @param {Number} userId
 * @returns {Object} An object with the userId key containing the new user's id.
 */

const createShoppingCart = async (userId) => {
  const sql = `
      INSERT INTO Shopping_cart (user_id)
      VALUES (?)
    `;
  const params = [userId];
  try {
    const rows = await promisePool.execute(sql, params);
    return { shoppingCartId: rows[0].insertId };
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message, status: 500 };
  }
};

/**
 * Get the shopping cart for the given user.
 * @param {Number} userId
 * @returns {Object[]} An object containing the shopping cart's details, or an error.
 */
const getShoppingCart = async (userId) => {
  const sql = `
      SELECT * FROM Shopping_cart WHERE user_id = ?
    `;
  const params = [userId];
  try {
    const [rows] = await promisePool.execute(sql, params);
    if (rows.length > 0) {
      return rows[0];
    } else {
      return { error: "Shopping cart not found", status: 404 };
    }
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message, status: 500 };
  }
};

export { createShoppingCart, getShoppingCart };
