const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    fields: [{ type: Schema.Types.ObjectId, ref: "Field" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", userSchema);
