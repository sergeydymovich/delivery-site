const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { required: true, type: String },
    price: { required: true, type: String },
    imageSrc: { required: true, type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ExtraIngredient", userSchema);
