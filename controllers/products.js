const Product = require("../models/Product.js");
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
  addProduct: (req, res) => {
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
      price,
      category,
    } = req.body;
    const img = req.file ? req.file.path : image;
    const arrayIngredients = ingredients.split(',')
    const arrayExtraIngredients = extraIngredients.split(',')

    Product.create(
      {
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
