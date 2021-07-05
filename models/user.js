const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const USER_ROLES = require("../constants/userRoles");

const userSchema = new Schema(
  {
    first_name: { required: true, type: String },
    last_name: { required: true, type: String },
    password: { required: true, type: String },
    role: {
      type: String,
      default: USER_ROLES.CLIENT,
      enum: [USER_ROLES],
    },
    phone: { required: true, unique: true, type: String },
    address: { required: true, type: String },
    email: String,
    birthdate: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
