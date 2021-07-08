const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {

    name: { type: String, required: true, unique: true },
    size: { type: Number, required: true, unique: true },
    dough: [
      {
        _id: false,
        name: { type: String, required: true },
      }
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PizzaSize", userSchema);