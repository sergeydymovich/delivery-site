const Product = require("../models/Product.js");
const Ingredient = require("../models/Ingredient.js");
const ExtraIngredient = require("../models/ExtraIngredient.js");

module.exports = {
  getProducts: (req, res) => {
    const { limit, offset, filter_word, category } = req.query;
    const findObj = {};

    if (filter_word) {
       findObj.name = { $regex: filter_word, $options: "i" };
    }

    if (category) {
      findObj.category = category;
    }

    Product.count(findObj).then((count) =>
    Product.find(findObj)
      .limit(Number(limit))
      .skip(Number(offset))
      .populate("category", "name")
      .populate("ingredients", "name")
      .populate("extra_ingredients")
      .exec((err, products) => {
        if (err) {
          res.status(400).json({ message: err.message });
        } else {
          res.status(200).json({
             products,
             products_amount: count,
          });
        }
      }));
  },
  addProduct: async (req, res) => {
    const {
      name,
      image_src,
      category,
      ingredients,
      extra_ingredients,
      new_ingredients,
      new_extra_ingredients,
      pizza_sizes,
      ...rest
    } = req.body;
    const arrayPizzaSizes = pizza_sizes ? JSON.parse(pizza_sizes) : [];
    const arrayIngredients = ingredients ? ingredients.split(',') : [];
    const arrayExtraIngredients = extra_ingredients ? extra_ingredients.split(',') : [];
    const arrayNewIngredients = new_ingredients ? new_ingredients.split(',').map((ingredient) => ({ name: ingredient})) : undefined;
    const arrayNewExtraIngredients = new_extra_ingredients ? new_extra_ingredients.split(',').map((ingredient) => ({ name: ingredient})): undefined;
    
    const createdIngredients = arrayNewIngredients ? await Ingredient.create(arrayNewIngredients) : undefined;
    const createdExtraIngredients = arrayNewExtraIngredients ? await ExtraIngredient.create(arrayNewExtraIngredients) : undefined;


    if (createdIngredients) {
      const newIngredientsIds = createdIngredients.map((ingredient) => ingredient._id);
      arrayIngredients.push(newIngredientsIds);
    }

    if (createdExtraIngredients) {
      const newExtraIngredientsIds = createdExtraIngredients.map((ingredient) => ingredient._id);
      arrayExtraIngredients.push(newExtraIngredientsIds);
    }

    const createObj = {
      name,
      image_src: req.file ? req.file.path : image_src,
      category,
      ...rest,
    }

    if (ingredients) {
      createObj.ingredients = arrayIngredients;
    }

    if (extra_ingredients) {
      createObj.extra_ingredients = arrayExtraIngredients;
    }

    if (pizza_sizes) {
      createObj.pizza_sizes = arrayPizzaSizes;
    }
    
    Product.create(createObj,  (err, product) => {
        if (err) {
          res.status(400).json({ message: err.message });
        } else {
          res.status(201).json({ product });
        }
      }
    );
  },
  updateProduct: async (req, res) => {
    const {
      _id,
      name,
      image_src,
      category,
      ingredients,
      extra_ingredients,
      new_ingredients,
      new_extra_ingredients,
      pizza_sizes,
      ...rest
    } = req.body;
    const arrayPizzaSizes = pizza_sizes ? JSON.parse(pizza_sizes) : [];
    const arrayIngredients = ingredients ? ingredients.split(',') : [];
    const arrayExtraIngredients = extra_ingredients ? extra_ingredients.split(',') : [];
    const arrayNewIngredients = new_ingredients ? new_ingredients.split(',').map((ingredient) => ({ name: ingredient})) : undefined;
    const arrayNewExtraIngredients = new_extra_ingredients ? new_extra_ingredients.split(',').map((ingredient) => ({ name: ingredient})): undefined;
    
    const createdIngredients = arrayNewIngredients ? await Ingredient.create(arrayNewIngredients) : undefined;
    const createdExtraIngredients = arrayNewExtraIngredients ? await ExtraIngredient.create(arrayNewExtraIngredients) : undefined;


    if (createdIngredients) {
      const newIngredientsIds = createdIngredients.map((ingredient) => ingredient._id);
      arrayIngredients.push(newIngredientsIds);
    }

    if (createdExtraIngredients) {
      const newExtraIngredientsIds = createdExtraIngredients.map((ingredient) => ingredient._id);
      arrayExtraIngredients.push(newExtraIngredientsIds);
    }
 
    const updateObj = {
      name,
      image_src: req.file ? req.file.path : image_src,
      category,
      ...rest,
    }

    if (ingredients) {
      updateObj.ingredients = arrayIngredients;
    }

    if (extra_ingredients) {
      updateObj.extra_ingredients = arrayExtraIngredients;
    }

    if (pizza_sizes) {
      updateObj.pizza_sizes = arrayPizzaSizes;
    }
  
    Product.findOneAndUpdate(
      { _id },
      updateObj,
      (err, product) => {
        if (err) {
          res.status(400).json({ message: err.message });
        } else {
          res.status(201).json({ product });
        }
      }
    );
  },
};
