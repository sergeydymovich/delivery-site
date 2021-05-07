const Category = require("../models/Category.js");

module.exports = {
  getCategories: (req, res) => {
    Category.find({}, (err, categories) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        res.json({ categories });
      }
    });
  },

  addCategory: (req, res) => {
    const { name } = req.body;

    Category.create({ name }, (err, category) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        res.json({ category });
      }
    });
  },

  deleteCategory: (req, res) => {
    const { _id } = req.body;

    Category.deleteOne({ _id }, (err, category) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        res.json({ category });
      }
    });
  },

  changeCategory: (req, res) => {
    const { _id, name } = req.body;

    Category.findOneAndUpdate(
      { _id },
      { name },
      { new: true },
      (err, category) => {
        if (err) {
          res.status(400).json({ message: err.message });
        } else {
          res.json({ category });
        }
      }
    );
  },
};
