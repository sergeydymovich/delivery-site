const Order = require("../models/Order.js");
const { calculateOrderSum } = require("../utils/array.utils");

module.exports = {
  getOrders: (req, res) => {
    const { status } = req.query;
    const findObj = {};
    if (status) findObj.status = status;

    Order.find(findObj, (err, orders) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        res.json({ orders });
      }
    });
  },

  addOrder: (req, res) => {
    const { customer, name, address, phone, products, status, comment } =
      req.body;

    Order.countDocuments().then((count) => {
      Order.create(
        {
          orderNumber: ++count,
          customer,
          name,
          address,
          phone,
          products,
          totalCost: calculateOrderSum(products, "price"),
          status,
          comment,
        },
        (err, order) => {
          if (err) {
            res.status(400).json({ message: err.message });
          } else {
            res.status(201).json({ order });
          }
        }
      );
    });
  },
  changeOrder: (req, res) => {
    const { _id, status } = req.body;

    Order.findOneAndUpdate(
      { _id },
      { status },
      { new: true, runValidators: true },
      (err, order) => {
        if (err) {
          res.status(400).json({ message: err.message });
        } else {
          res.status(201).json({ order });
        }
      }
    );
  },
};
