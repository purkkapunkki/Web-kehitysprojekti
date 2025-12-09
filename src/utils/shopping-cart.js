/**
 * Return the total price of the given products.
 * @param {Object[]} shoppingCartProducts
 * @returns {Number} The total price of the given products.
 */
function getCartTotalPrice(shoppingCartProducts) {
  return shoppingCartProducts
    .reduce((total, product) => total + Number(product.price), 0)
    .toFixed(2);
}

export { getCartTotalPrice };
