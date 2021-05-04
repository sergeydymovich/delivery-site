const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const cfg = require("../config.js");

module.exports = {
  register: (req, res) => {
    const { name, email, birthdate, phone, adress, role } = req.query;

    User.create(
      {
        name,
        email,
        birthdate,
        phone,
        adress,
        role,
      },
      (err, user) => {
        if (err) {
          res.status(400).json({ errorMessage: err._message });
        } else {
          const token = jwt.sign({ userId: user._id }, cfg.jwtCode, {
            expiresIn: "1h",
          });
          res.status(201).json({
            user,
            token,
          });
        }
      }
    );
  },
  login: async (req, res) => {
    const { email, phone } = req.query;

    const user = await User.findOne({ $or: [{ email }, { phone }] });

    if (user) {
      const token = jwt.sign({ userId: user._id }, cfg.jwtCode, {
        expiresIn: "1h",
      });
      res.status(201).json({
        user,
        token,
      });
    } else {
      res
        .status(400)
        .json({ errorMessage: "Неверный ввод, попробуйте еще раз" });
    }
  },
};
