const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ORDER_STATUSES = require("../constants/orderStatuses");

const userSchema = new Schema(
  {
    order_number: Number,
    customer: { type: Schema.Types.ObjectId, ref: "User" },
    address: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    products: { type: Array, required: true },
    total_cost: Number,
    status: {
      type: String,
      required: true,
      enum: [ORDER_STATUSES],
    },
    comment: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", userSchema);
