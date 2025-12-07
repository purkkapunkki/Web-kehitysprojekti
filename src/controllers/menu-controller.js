import express from "express";

import {
  getAllProductsFromClass,
  getAllergens,
  getProductAllergens,
} from "../models/product-model.js";
import {
  createAllProductAllergensMapping,
  addAllergens,
} from "../utils/allergens.js";

/**
 * Show the menu page.
 * @param {express.Request} req http request
 * @param {express.Response} res http response
 * @param {express.NextFunction} next next middleware function
 */
const showMenu = async (req, res, next) => {
  const allergens = await getAllergens();
  const productAllergens = await getProductAllergens();

  const foodProducts = await getAllProductsFromClass("ruoka");
  const drinkProducts = await getAllProductsFromClass("juoma");
  const dessertProducts = await getAllProductsFromClass("jälkiruoka");

  const allProductAllergens = createAllProductAllergensMapping(
    allergens,
    productAllergens
  );

  res.render("menu", {
    foodProducts: addAllergens(foodProducts, allProductAllergens),
    drinkProducts: addAllergens(drinkProducts, allProductAllergens),
    dessertProducts: addAllergens(dessertProducts, allProductAllergens),
  });
};

export { showMenu };
