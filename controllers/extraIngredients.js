const ExtraIngredient = require("../models/ExtraIngredient.js");
const Product = require("../models/Product.js");
const cfg = require("../config");

module.exports = {
  getExtraIngredients: (req, res) => {
    ExtraIngredient.find({}, (err, ingredients) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        const updateIngredients = ingredients.map((ingredient) => ({
          ...ingredient._doc,
          imageSrc: ingredient.imageSrc ? `http://localhost:${cfg.port}/` + ingredient.imageSrc : '',
        }));
        res.status(200).json({ ingredients: updateIngredients });
      }
    });
  },

  addExtraIngredient: (req, res) => {
    const { name, price, image } = req.body;
    const img = req.file ? req.file.path : image;

    ExtraIngredient.create(
      { name, price, imageSrc: img },
      (err, ingredient) => {
        if (err) {
          res.status(400).json({ message: err.message });
        } else {
          console.log(ingredient);
          res.status(201).json({ 
            ...ingredient._doc,
            imageSrc: ingredient.imageSrc ? `http://localhost:${cfg.port}/` + ingredient.imageSrc : '',
          });
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

  changeExtraIngredient: (req, res) => {
    const { _id, name, price, image } = req.body;
    console.log("bodyyyy", req.body);
    const img = req.file ? req.file.path : image;

    ExtraIngredient.findOneAndUpdate(
      { _id },
      { 
        name,
        price,
        imageSrc: img,
      },
      { new: true },
      (err, ingredient) => {
        if (err) {
          res.status(400).json({ message: err.message });
        } else {
          res.status(201).json({ 
            ...ingredient._doc,
            imageSrc: ingredient.imageSrc ? `http://localhost:${cfg.port}/` + ingredient.imageSrc : '',
          });
        }
      }
    );
  },
};
