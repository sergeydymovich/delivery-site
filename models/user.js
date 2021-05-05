const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { required: true, type: String },
    lastName: { required: true, type: String },
    password: { required: true, type: String },
    role: {
      type: String,
      default: "CLIENT",
      enum: ["CLIENT", "ADMIN"],
    },
    phone: { required: true, unique: true, type: String },
    address: { required: true, type: String },
    email: String,
    birthdate: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
