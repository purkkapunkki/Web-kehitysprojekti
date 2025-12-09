import promisePool from "../utils/database.js";

/**
 * Create an order with the given parameters.
 * @param {Number} userId
 * @param {String} status
 * @returns {Object} An object with the new order's id, or an error.
 */
const createRestaurantOrder = async (userId, status) => {
  const sql = `
      INSERT INTO Restaurant_order (user_id, restaurant_order_status)
      VALUES (?, ?)
    `;
  const params = [userId, status];
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
 * @param {Number} userId
 * @returns {Object[]} An object with the userId key containing the new user's id.
 */
const getAllOrdersForUser = async (userId) => {
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

/**
 * Get all orders.
 * @returns {Object[]|Object} A list of orders, or an object containing an error.
 */
const getAllOrders = async () => {
  const sql = `
      SELECT
        Restaurant_order.*,
        User.first_name AS user_first_name,
        User.last_name AS user_last_name,
        User.email AS user_email
      FROM Restaurant_order
      JOIN User ON User.user_id = Restaurant_order.user_id
    `;
  try {
    const rows = await promisePool.execute(sql);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message, status: 500 };
  }
};

/**
 * Set the given order to the given status.
 * @param {Number} orderId
 * @param {String} status
 * @returns {Object} An object with a possible error.
 */
const setOrderStatus = async (orderId, status) => {
  const sql = `
    UPDATE Restaurant_order
    SET restaurant_order_status = ? WHERE restaurant_order_id = ?
  `;
  const params = [status, orderId];
  try {
    const rows = await promisePool.execute(sql, params);
    if (rows[0].affectedRows === 1) {
      return {};
    } else {
      const errorMessage = "Order not found";
      console.error("error", errorMessage);
      return { error: errorMessage, status: 404 };
    }
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message, status: 500 };
  }
};

export {
  createRestaurantOrder,
  getAllOrders,
  getAllOrdersForUser,
  setOrderStatus,
};
