const Category = require("../models/Category.js");
const Product = require("../models/Product.js");

module.exports = {
  getProducts: (req, res) => {
    const { categoryID } = req.body;
    const findObj = categoryID ? { category: categoryID } : {};

    Product.find(findObj)
      .populate("category", "name")
      .exec((err, products) => {
        if (err) {
          res.status(400).json({ message: err.message });
        } else {
          res.json({ products });
        }
      });
  },
  addProduct: (req, res) => {
    const {
      name,
      weight,
      volume,
      isAvailable,
      image,
      composition,
      price,
      categoryID,
    } = req.body;

    Product.create(
      {
        name,
        weight,
        volume,
        isAvailable,
        image,
        composition,
        price,
        category: categoryID,
      },
      (err, product) => {
        if (err) {
          res.status(400).json({ message: err.message });
        } else {
          res.json({ product });
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
        res.json({ product });
      }
    });
  },
};
