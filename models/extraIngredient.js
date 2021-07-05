const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { required: true, unique: true, type: String },
    price: {  type: String },
    image_src: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ExtraIngredient", userSchema);
