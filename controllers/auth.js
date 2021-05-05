const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const cfg = require("../config.js");
const { validationResult } = require("express-validator");

module.exports = {
  register: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      firstName,
      lastName,
      password,
      role,
      phone,
      address,
      birthdate,
      email,
    } = req.body;

    User.create(
      {
        firstName,
        lastName,
        password,
        role,
        phone,
        address,
        birthdate,
        email,
      },
      (err, user) => {
        if (err) {
          res.status(400).json({ errorMessage: err._message });
        } else {
          const token = jwt.sign({ userId: user._id }, cfg.jwtCode, {
            expiresIn: "365d",
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { phone, password } = req.body;

    const user = await User.findOne({ phone, password });

    if (user) {
      const token = jwt.sign({ userId: user._id }, cfg.jwtCode, {
        expiresIn: "365d",
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
