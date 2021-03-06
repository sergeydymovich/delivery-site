const Order = require("../models/Order.js");

module.exports = {
  getOrders: (req, res) => {
    const { startDate, endDate, limit, offset, filterWord } = req.query;
    const findObj = {};

    if (startDate) {
      findObj.createdAt = {"$gte": startDate }     
    }

    if (startDate && endDate) {
      findObj.createdAt = { "$lt": endDate, "$gte": startDate }
    }

    if (filterWord) {
      findObj.phone = { $regex: filterWord, $options: "i" };
   }
     
    Order.count(findObj).then((count) =>
    Order.find(findObj)
    .limit(Number(limit))
    .skip(Number(offset))
    .exec((err, orders) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        res.json({ 
          orders,
          orders_amount: count, 
        });
      }
    }))     

  },

  addOrder: (req, res) => {
    const { customer, name, address, phone, products, status, comment, total_cost } =
      req.body;

    Order.countDocuments().then((count) => {
      Order.create(
        {
          order_number: ++count,
          customer,
          name,
          address,
          phone,
          products,
          total_cost,
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
  updateOrder: (req, res) => {
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
