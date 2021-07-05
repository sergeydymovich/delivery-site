const Category = require("../models/Category.js");

module.exports = {
  getCategories: (req, res) => {
    Category.find({})
      .populate('fields')
      .exec((err, categories) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        res.json({ categories });
      }
    });
  },

  addCategory: (req, res) => {
    const { name, fields } = req.body;

    Category.create({ name, fields }, (err, category) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(201).json({ category });
      }
    });
  },

  deleteCategory: (req, res) => {
    const { _id } = req.body;

    Category.deleteOne({ _id }, (err, category) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(200).json({ category });
      }
    });
  },

  updateCategory: (req, res) => {
    const { _id, name, fields } = req.body;

    Category.findOneAndUpdate(
      { _id },
      { name, fields },
      { new: true },
      (err, category) => {
        if (err) {
          res.status(400).json({ message: err.message });
        } else {
          res.status(200).json({ category });
        }
      }
    );
  },
};
