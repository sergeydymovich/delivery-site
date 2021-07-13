const ExtraIngredient = require("../models/ExtraIngredient.js");
const Product = require("../models/Product.js");

module.exports = {
  getExtraIngredients: (req, res) => {
    ExtraIngredient.find({}, (err, ingredients) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(200).json({ ingredients });
      }
    });
  },

  addExtraIngredient: (req, res) => {
    const { name, price, image_src } = req.body;

    ExtraIngredient.create(
      { name, price, image_src: req.file ? req.file.path : image_src ?? '' },
      (err, ingredient) => {
        if (err) {
          res.status(400).json({ message: err.message });
        } else {
          res.status(201).json({ ingredient });
        }
      }
    );
  },

  deleteExtraIngredient: async (req, res) => {
    const { _id } = req.body;

    const deletedIngredient = await ExtraIngredient.deleteOne({ _id });

    if (deletedIngredient.deletedCount) {
      Product.updateMany(
        { extraIngredients: { $in: [_id] } },
        { $pull: { extraIngredients: { $in: [_id] } } },
        (err, products) => {
          if (err) {
            res.status(400).json({ message: err.message });
          } else {
            res.status(200).json({ products });
          }
        }
      );
    } else {
      res.status(400).json({ message: "доп ингредиент не удален" });
    }
  },

  updateExtraIngredient: (req, res) => {
    const { _id, name, price, image_src } = req.body;
    const updatedObj = {
      name,
      price,
      image_src: req.file ? req.file.path : image_src
    }
 
    ExtraIngredient.findOneAndUpdate(
      { _id },
      updatedObj,
      { new: true },
      (err, ingredient) => {
        if (err) {
          res.status(400).json({ message: err.message });
        } else {
          res.status(201).json({ ingredient });
        }
      }
    );
  },
};
