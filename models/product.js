const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { required: true, type: String },
    category: { type: Schema.Types.ObjectId, required: true, ref: "Category" },
    isAvailable: { type: Boolean, default: true },
    price: { type: String, required: true },
    volume: String,
    weight: String,
    image: String,
    composition: Array,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", userSchema);
