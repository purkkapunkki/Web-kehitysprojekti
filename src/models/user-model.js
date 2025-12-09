import promisePool from "../utils/database.js";

/**
 * Create a user with the given parameters.
 * @param {String} firstName
 * @param {String} lastName
 * @param {String} email
 * @param {String} password
 * @param {Boolean} isAdmin
 * @returns {Object} An object with the userId key containing the new user's id.
 */
const createUser = async (firstName, lastName, email, password, isAdmin) => {
  const sql = `
      INSERT INTO User (first_name, last_name, email, password, is_admin)
      VALUES (?, ?, ?, ?, ?)
    `;
  const params = [firstName, lastName, email, password, isAdmin];
  try {
    const rows = await promisePool.execute(sql, params);
    return { userId: rows[0].insertId };
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message, status: 500 };
  }
};

/**
 * Check if there's a user with the given credentials exists.
 * @param {String} email
 * @param {String} password
 * @returns {Object} An object containing the user, or an error message.
 */
const checkIfUserExists = async (email, password) => {
  const sql = `
      SELECT user_id, first_name, last_name, email, is_admin FROM User
      WHERE email = ? AND password = ?
    `;
  const params = [email, password];
  try {
    const [rows] = await promisePool.execute(sql, params);
    if (rows.length > 0) {
      return rows[0];
    } else {
      return { error: "Invalid credentials", status: 403 };
    }
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message, status: 500 };
  }
};

export { createUser, checkIfUserExists };
