const PizzaSize = require("../models/PizzaSize.js");

module.exports = {
  getPizzaSizes: (req, res) => {
    PizzaSize.find({}, (err, pizza_sizes) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        res.json({ pizza_sizes });
      }
    });
  },
  addPizzaSize: (req, res) => {
    const { name, size, dough } = req.body;

    PizzaSize.create({ name, size, dough }, (err, pizza_size) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(201).json({ pizza_size });
      }
    });
  },
  updatePizzaSize: (req, res) => {
    const { _id, size, name, dough } = req.body;

    PizzaSize.findOneAndUpdate(
      { _id },
      { size, name, dough },
      { new: true },
      (err, pizza_size) => {
        if (err) {
          res.status(400).json({ message: err.message });
        } else {
          res.status(200).json({ pizza_size });
        }
      }
    );
  },
  deletePizzaSize: (req, res) => {
    const { _id } = req.body;

    PizzaSize.deleteOne({ _id }, (err, pizza_size) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(200).json({ pizza_size });
      }
    });
  },
};