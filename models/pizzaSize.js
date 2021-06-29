const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    size: { type: String, required: true, unique: true }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PizzaSize", userSchema);