import promisePool from "../utils/database.js";

/**
 * Create a product with the given parameters.
 * @param {Number} orderId
 * @param {Object[]} products
 * @returns {Object} An object with the first products's id, or an error.
 */
const createRestaurantOrderProduct = async (orderId, products) => {
  const sql = `
      INSERT INTO Restaurant_order_product (restaurant_order_id, product_id, quantity)
      VALUES ?
    `;
  const params = products.map((product) => [
    orderId,
    product.product_id,
    product.quantity,
  ]);
  const query = promisePool.format(sql, [params]);
  try {
    const rows = await promisePool.query(query);
    return { orderProduct: rows[0].insertId };
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message, status: 500 };
  }
};

export { createRestaurantOrderProduct };
