const Ingredient = require("../models/Ingredient.js");
const Product = require("../models/Product.js");

module.exports = {
  getIngredients: (req, res) => {
    Ingredient.find({}, (err, ingredients) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(200).json({ ingredients });
      }
    });
  },
  addIngredient: (req, res) => {
    const { name } = req.body;

    Ingredient.create({ name }, (err, ingredient) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(201).json({ ingredient });
      }
    });
  },
  deleteIngredient: async (req, res) => {
    const { _id } = req.body;

    const deletedIngredient = await Ingredient.deleteOne({ _id });

    if (deletedIngredient.deletedCount) {
      Product.updateMany(
        { ingredients: { $in: [_id] } },
        { $pull: { ingredients: { $in: [_id] } } },
        (err, products) => {
          if (err) {
            res.status(400).json({ message: err.message });
          } else {
            res.status(200).json({ products });
          }
        }
      );
    } else {
      res.status(400).json({ message: "ингредиент не удален" });
    }
  },
  changeIngredient: (req, res) => {
    const { _id, name } = req.body;

    Ingredient.findOneAndUpdate(
      { _id },
      { name },
      { new: true },
      (err, ingredient) => {
        if (err) {
          res.status(400).json({ message: err.message });
        } else {
          res.status(200).json({ ingredient });
        }
      }
    );
  },
};
