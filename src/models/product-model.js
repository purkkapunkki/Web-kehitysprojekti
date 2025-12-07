import promisePool from "../utils/database.js";

/**
 * Create a product with the given parameters.
 * @param {String} name
 * @param {String} image
 * @param {Decimal} price
 * @param {String} description
 * @param {String} productClass
 * @returns {Object} An object with the userId key containing the new user's id.
 */
const createProduct = async (name, image, price, description, productClass) => {
  const sql = `
      INSERT INTO Product (name, image, price, description, productClass)
      VALUES (?, ?, ?, ?, ?)
    `;
  const params = [name, image, price, description, productClass];
  try {
    const rows = await promisePool.execute(sql, params);
    return { userId: rows[0].insertId };
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message, status: 500 };
  }
};

/**
 * Get all products from a product class.
 * @returns {Object[]} An object with the userId key containing the new user's id.
 */
const getAllProductsFromClass = async (product_class) => {
  const sql = `
      SELECT * FROM Product WHERE product_class = ?
    `;
  const params = [product_class];
  try {
    const rows = await promisePool.execute(sql, params);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message, status: 500 };
  }
};

/**
 * Get all allergens from the database.
 * @returns {Object[]} An array of allergens.
 */
const getAllergens = async () => {
  const sql = `
    SELECT allergen_id, name FROM Allergen
  `;
  try {
    const [rows] = await promisePool.execute(sql);
    return rows;
  } catch (e) {
    console.error("Error fetching allergens:", e.message);
    return { error: e.message, status: 500 };
  }
};

/**
 * Fetch all product-allergen associations from the database.
 * @returns {Object[]} An array of product-allergen associations.
 */
const getProductAllergens = async () => {
  const sql = `
    SELECT product_id, allergen_id FROM Product_allergen
  `;
  try {
    const [rows] = await promisePool.execute(sql);
    return rows;
  } catch (e) {
    console.error("Error fetching product allergens:", e.message);
    return { error: e.message, status: 500 };
  }
};

export {
  createProduct,
  getAllProductsFromClass,
  getAllergens,
  getProductAllergens,
};
