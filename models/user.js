const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { required: true, type: String },
    email: { required: true, unique: true, type: String },
    birthdate: { required: true, type: String },
    phone: { required: true, unique: true, type: String },
    adress: { required: true, type: String },
    role: { required: true, type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
