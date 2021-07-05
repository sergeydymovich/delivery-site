const PizzaSize = require("../models/PizzaSize.js");

module.exports = {
  getPizzaSizes: (req, res) => {
    PizzaSize.find({}, (err, pizzaSizes) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        res.json({ pizzaSizes });
      }
    });
  },
  addPizzaSize: (req, res) => {
    const { name, size } = req.body;

    PizzaSize.create({ name, size }, (err, pizzaSize) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(201).json({ pizzaSize });
      }
    });
  },
  updatePizzaSize: (req, res) => {
    const { _id, size } = req.body;

    PizzaSize.findOneAndUpdate(
      { _id },
      { size },
      { new: true },
      (err, pizzaSize) => {
        if (err) {
          res.status(400).json({ message: err.message });
        } else {
          res.status(200).json({ pizzaSize });
        }
      }
    );
  },
};