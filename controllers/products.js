const Product = require("../models/Product.js");
const { createProductObj } = require('../utils/createProductObj');

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
    const createObj = await createProductObj(req.body, req.file);
    
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
    const { _id } = req.body;
    const updateObj = await createProductObj(req.body, req.file);
    
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
