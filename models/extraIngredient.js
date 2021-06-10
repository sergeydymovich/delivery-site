const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { required: true, type: String },
    price: {  type: String },
    imageSrc: {  type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ExtraIngredient", userSchema);
