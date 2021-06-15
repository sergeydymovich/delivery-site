const Product = require("../models/Product.js");
const Ingredient = require("../models/Ingredient.js");
const ExtraIngredient = require("../models/ExtraIngredient.js");
const cfg = require("../config");

module.exports = {
  getProducts: (req, res) => {
    const { category } = req.body;
    const { limit, offset } = req.query;
    const findObj = category ? { category } : {};

    Product.count(findObj).then((count) =>
    Product.find(findObj)
      .limit(Number(limit))
      .skip(Number(offset))
      .populate("category", "name")
      .populate("ingredients", "name")
      .populate("extraIngredients")
      .exec((err, products) => {
        if (err) {
          res.status(400).json({ message: err.message });
        } else {
          const updateProducts = products.map((product) => ({
            ...product._doc,
            imageSrc: product.imageSrc ? `http://localhost:${cfg.port}/` + product.imageSrc : '',
          }));
          res.status(200).json({
             products: updateProducts,
             productsAmount: count,
          });
        }
      }));
  },
  addProduct: async (req, res) => {
    const {
      name,
      weight,
      volume,
      size,
      portionAmount,
      isAvailable,
      image,
      ingredients,
      extraIngredients,
      newIngredients,
      newExtraIngredients,
      price,
      category,
    } = req.body;
    const img = req.file ? req.file.path : image;
    const arrayIngredients = ingredients ? ingredients.split(',') : [];
    const arrayExtraIngredients = extraIngredients ? extraIngredients.split(',') : [];
    const arrayNewIngredients = newIngredients ? newIngredients.split(',').map((ingredient) => ({ name: ingredient})) : undefined;
    const arrayNewExtraIngredients = newExtraIngredients ? newExtraIngredients.split(',').map((ingredient) => ({ name: ingredient})): undefined;
    
    const createdIngredients = arrayNewIngredients ? await Ingredient.create(arrayNewIngredients) : undefined;
    const createdExtraIngredients = arrayNewExtraIngredients ? await ExtraIngredient.create(arrayNewExtraIngredients) : undefined;


    if (createdIngredients) {
      const newIngredientsIds = createdIngredients.map((ingredient) => ingredient._id);
      arrayIngredients.push(newIngredientsIds)
    }

    if (createdExtraIngredients) {
      const newExtraIngredientsIds = createdExtraIngredients.map((ingredient) => ingredient._id);
      arrayExtraIngredients.push(newExtraIngredientsIds)
    }

    const createObj = {
      name,
      weight,
      volume,
      size,
      portionAmount,
      isAvailable,
      imageSrc: img,
      ingredients: arrayIngredients,
      extraIngredients: arrayExtraIngredients,
      price,
      category,
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
  changeProduct: async (req, res) => {
    const {
      id,
      name,
      weight,
      volume,
      size,
      portionAmount,
      isAvailable,
      image,
      ingredients,
      extraIngredients,
      newIngredients,
      newExtraIngredients,
      price,
      category,
    } = req.body;
    const img = req.file ? req.file.path : image;
    const arrayIngredients = ingredients ? ingredients.split(',') : [];
    const arrayExtraIngredients = extraIngredients ? extraIngredients.split(',') : [];
    const arrayNewIngredients = newIngredients ? newIngredients.split(',').map((ingredient) => ({ name: ingredient})) : undefined;
    const arrayNewExtraIngredients = newExtraIngredients ? newExtraIngredients.split(',').map((ingredient) => ({ name: ingredient})): undefined;
    
    const createdIngredients = arrayNewIngredients ? await Ingredient.create(arrayNewIngredients) : undefined;
    const createdExtraIngredients = arrayNewExtraIngredients ? await ExtraIngredient.create(arrayNewExtraIngredients) : undefined;


    if (createdIngredients) {
      const newIngredientsIds = createdIngredients.map((ingredient) => ingredient._id);
      arrayIngredients.push(newIngredientsIds)
    }

    if (createdExtraIngredients) {
      const newExtraIngredientsIds = createdExtraIngredients.map((ingredient) => ingredient._id);
      arrayExtraIngredients.push(newExtraIngredientsIds)
    }


    const updateObj = {
      name,
      weight,
      volume,
      size,
      portionAmount,
      isAvailable,
      imageSrc: img,
      ingredients: arrayIngredients,
      extraIngredients: arrayExtraIngredients,
      price,
      category,
    }
    
    Product.findOneAndUpdate(
      { _id: id },
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
  deleteProduct: (req, res) => {
    const { _id } = req.body;

    Product.deleteOne({ _id }, (err, product) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(200).json({ product });
      }
    });
  },
};
