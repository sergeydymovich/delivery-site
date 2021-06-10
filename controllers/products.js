const Product = require("../models/Product.js");
const Ingredient = require("../models/Ingredient.js");
const ExtraIngredient = require("../models/ExtraIngredient.js");
const cfg = require("../config");

module.exports = {
  getProducts: (req, res) => {
    const { category } = req.body;
    const findObj = category ? { category } : {};

    Product.find(findObj)
      .populate("category", "name")
      .populate("ingredients", "name")
      .populate("extraIngredients")
      .exec((err, products) => {
        if (err) {
          res.status(400).json({ message: err.message });
        } else {
          const updateProducts = products.map((product) => ({
            ...product._doc,
            imageSrc: `http://localhost:${cfg.port}/` + product.imageSrc,
          }));
          res.status(200).json({ products: updateProducts });
        }
      });
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
    const arrayReqIngredients = ingredients.split(',')
    const arrayReqExtraIngredients = extraIngredients.split(',')
    const arrayReqNewIngredients = newIngredients.split(',').map((ingredient) => ({ name: ingredient}))
    const arrayReqNewExtraIngredients = newExtraIngredients.split(',').map((ingredient) => ({ name: ingredient}))

     const createdIngredients = arrayReqNewIngredients.length ? await Ingredient.create(arrayReqNewIngredients) : [];
     const createdExtraIngredients = arrayReqNewExtraIngredients.length ? await ExtraIngredient.create(arrayReqNewExtraIngredients) : [];

     const ultimateIngredients = [...arrayReqIngredients, createdIngredients.map((ingredient) => ingredient._id)]
     const ultimateExtraIngredients = [...arrayReqExtraIngredients, createdExtraIngredients.map((ingredient) => ingredient._id)]
    
    Product.create(
      {
        name,
        weight,
        volume,
        size,
        portionAmount,
        isAvailable,
        imageSrc: img,
        ingredients: ultimateIngredients,
        extraIngredients: ultimateExtraIngredients,
        price,
        category,
      },
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
