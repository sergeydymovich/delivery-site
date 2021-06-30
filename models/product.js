const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { required: true, type: String },
    category: { type: Schema.Types.ObjectId, required: true, ref: "Category" },
    is_available: { type: Boolean, default: true },
    price: { type: String, required: true },
    image_src: String,
  },
  {
    timestamps: true,
    strict: false,
  }
);

module.exports = mongoose.model("Product", userSchema);
