const Product = require("../models/Product.js");

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
          res.status(200).json({ products });
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
      imageSrc,
      ingredients,
      extraIngredients,
      price,
      category,
    } = req.body;

    Product.create(
      {
        name,
        weight,
        volume,
        size,
        portionAmount,
        isAvailable,
        imageSrc,
        ingredients,
        extraIngredients,
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
