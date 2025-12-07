import promisePool from "../utils/database.js";

/**
 * Create an order with the given parameters.
 * @param {Number} userId
 * @param {String} restaurantOrderStatus
 * @returns {Object} An object with the new order's id, or an error.
 */
const createRestaurantOrder = async (userId, restaurantOrderStatus) => {
  const sql = `
      INSERT INTO Restaurant_order (user_id, restaurant_order_status)
      VALUES (?, ?)
    `;
  const params = [userId, restaurantOrderStatus];
  try {
    const rows = await promisePool.execute(sql, params);
    return { orderId: rows[0].insertId };
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message, status: 500 };
  }
};

/**
 * Get all orders for the given user.
 * @param {Number} shoppingCartId
 * @returns {Object[]} An object with the userId key containing the new user's id.
 */
const getAllOrders = async (userId) => {
  const sql = `
      SELECT *
      FROM Restaurant_order
      WHERE user_id = ?
    `;
  const params = [userId];
  try {
    const rows = await promisePool.execute(sql, params);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message, status: 500 };
  }
};

export { createRestaurantOrder, getAllOrders };
