const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UI_TYPES = require("../constants/UITypes");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    label: { type: String, required: true },
    description: { type: String, required: true },
    unit: String,
    is_default: { type: Boolean, default: false },
    is_base: { type: Boolean, default: false },
    ui_type: {
      type: String,
      required: true,
      enum: [UI_TYPES],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Field", userSchema);
