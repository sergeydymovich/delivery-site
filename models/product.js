const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { required: true, uniq: true, type: String },
    category: { type: Schema.Types.ObjectId, required: true, ref: "Category" },
    is_available: { type: Boolean, default: true },
    image_src: String,
    ingredients: {
      type: [Schema.Types.ObjectId],
      ref: 'Ingredient',
      default: undefined,
    },
    extra_ingredients: {
      type: [Schema.Types.ObjectId],
      ref: 'ExtraIngredient',
      default: undefined,
    },
    pizza_sizes: {
      type: [{
        _id: false,
        name: String,
        size: Number,
        dough: [{
          name: String,
          is_active: Boolean,
          _id: false,
        }]
      }],
      default: undefined,
    }
  },
  {
    timestamps: true,
    strict: false,
  }
);

module.exports = mongoose.model("Product", userSchema);
