const Product = require("../models/Product.js");
const Ingredient = require("../models/Ingredient.js");
const ExtraIngredient = require("../models/ExtraIngredient.js");
const cfg = require("../config");

module.exports = {
  getProducts: (req, res) => {
    const { limit, offset, filterWord, category } = req.query;
    const findObj = {};

    if (filterWord) {
       findObj.name = { $regex: filterWord, $options: "i" };
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
          const updatedProducts = products.map((product) => ({
            ...product._doc,
            image_src: product.image_src ? `http://localhost:${cfg.port}/` + product.image_src : '',
          }));
          res.status(200).json({
             products: updatedProducts,
             products_amount: count,
          });
        }
      }));
  },
  addProduct: async (req, res) => {
    const {
      name,
      image,
      category,
      ingredients,
      extra_ingredients,
      new_ingredients,
      new_extra_ingredients,
      pizza_sizes,
      ...rest
    } = req.body;
    const img = req.file ? req.file.path : image;
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
      image_src: img,
      category,
      ingredients: arrayIngredients,
      extra_ingredients: arrayExtraIngredients,
      pizza_sizes:  arrayPizzaSizes,
      ...rest,
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
      image,
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
      category,
      ingredients: arrayIngredients,
      extra_ingredients: arrayExtraIngredients,
      pizza_sizes:  arrayPizzaSizes,
      ...rest,
    }

    if (req.file) {
      updateObj.image_src = req.file.path
    }

    if (typeof image_src === 'string' && !image_src.length) {
      updateObj.image_src = '';
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
