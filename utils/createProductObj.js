const Ingredient = require("../models/Ingredient.js");
const ExtraIngredient = require("../models/ExtraIngredient.js");
const { createNewDocuments } = require('../utils/createNewDocuments');

module.exports = {
  createProductObj: async (reqBody, reqFile) => {
    const {
      _id,
      image_src,
      ingredients,
      extra_ingredients,
      new_ingredients,
      new_extra_ingredients,
      pizza_sizes,
      ...rest
    } = reqBody;

    const productObj = {
      image_src: reqFile ? reqFile.path : image_src,
      ...rest,
    }

    if ('ingredients' in reqBody || 'new_ingredients' in reqBody) {
      const arrayIngredients = await createNewDocuments(Ingredient, ingredients, new_ingredients);
      productObj.ingredients = arrayIngredients;
    }

    if ('extra_ingredients' in reqBody || 'new_extra_ingredients' in reqBody) {
      const arrayExtraIngredients = await createNewDocuments(ExtraIngredient, extra_ingredients, new_extra_ingredients);
      productObj.extra_ingredients = arrayExtraIngredients;
    }

    if (pizza_sizes) {
      productObj.pizza_sizes = JSON.parse(pizza_sizes);
    }

    return productObj;
  }
};