const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { required: true, unique: true, type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ingredient", userSchema);
