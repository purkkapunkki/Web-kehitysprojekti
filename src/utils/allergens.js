/**
 * Create a mapping of product IDs to their respective allergens.
 *
 * @param {Object[]} allergens - An array of allergen objects.
 * @param {Object[]} productAllergens - An array of product-allergen associations.
 * @returns {Object} A mapping of product IDs to allergen names.
 */
const createAllProductAllergensMapping = (allergens, productAllergens) => {
  const allProductAllergens = {};

  productAllergens.forEach((association) => {
    const { product_id, allergen_id } = association;
    if (!allProductAllergens[product_id]) {
      allProductAllergens[product_id] = [];
    }
    const allergen = allergens.find((a) => a.allergen_id === allergen_id);
    if (allergen) {
      allProductAllergens[product_id].push(allergen.name);
    }
  });

  return allProductAllergens;
};

/**
 * Add allergens to each product based on the allergen mapping.
 *
 * @param {Object[]} products - An array of product objects.
 * @param {Object} allProductAllergens - An object mapping product IDs to allergen names.
 * @returns {Object[]} The products array with allergens added.
 */
const addAllergens = (products, allProductAllergens) => {
  return products.map((product) => ({
    ...product,
    allergens: allProductAllergens[product.product_id] || [],
  }));
};

export { createAllProductAllergensMapping, addAllergens };
