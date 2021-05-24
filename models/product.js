const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { required: true, type: String },
    category: { type: Schema.Types.ObjectId, required: true, ref: "Category" },
    isAvailable: { type: Boolean, default: true },
    price: { type: String, required: true },
    size: String,
    portionAmount: String,
    volume: String,
    weight: String,
    imageSrc: String,
    ingredients: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }],
    extraIngredients: [{ type: Schema.Types.ObjectId, ref: "ExtraIngredient" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", userSchema);
