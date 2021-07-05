const ExtraIngredient = require("../models/ExtraIngredient.js");
const Product = require("../models/Product.js");
const cfg = require("../config");

module.exports = {
  getExtraIngredients: (req, res) => {
    ExtraIngredient.find({}, (err, ingredientsRow) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        const ingredients = ingredientsRow.map((ingredient) => ({
          ...ingredient._doc,
          image_src: ingredient.image_src ? `http://localhost:${cfg.port}/` + ingredient.image_src : '',
        }));
        res.status(200).json({ ingredients });
      }
    });
  },

  addExtraIngredient: (req, res) => {
    const { name, price, image } = req.body;
    const img = req.file ? req.file.path : image;

    ExtraIngredient.create(
      { name, price, image_src: img },
      (err, ingredient) => {
        if (err) {
          res.status(400).json({ message: err.message });
        } else {
          console.log(ingredient);
          res.status(201).json({ 
            ...ingredient._doc,
            image_src: ingredient.image_src ? `http://localhost:${cfg.port}/` + ingredient.image_src : '',
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

  updateExtraIngredient: (req, res) => {
    const { _id, name, price, image } = req.body;
    const updatedObj = {
      name,
      price,
    }

    if (req.file) {
      updatedObj.image_src = req.file.path
    }

    if (typeof image === 'string' && !image.length) {
      updatedObj.image_src = '';
    }
    
    ExtraIngredient.findOneAndUpdate(
      { _id },
      updatedObj,
      { new: true },
      (err, ingredient) => {
        if (err) {
          res.status(400).json({ message: err.message });
        } else {
          res.status(201).json({ 
            ...ingredient._doc,
            image_src: ingredient.image_src ? `http://localhost:${cfg.port}/` + ingredient.image_src : '',
          });
        }
      }
    );
  },
};
