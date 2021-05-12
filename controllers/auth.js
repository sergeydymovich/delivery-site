const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const cfg = require("../config.js");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { body } = require("express-validator");

module.exports = {
  register: [
    body("phone", "Допустимы только цифры").isNumeric(),
    body("password", "Длина пароля не менее 6 символов").isLength({
      min: 6,
    }),
    async (req, res) => {
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

      const user = await User.findOne({ phone });

      if (user) {
        return res
          .status(400)
          .json({ errorMessage: "Такой пользователь уже существует" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      User.create(
        {
          firstName,
          lastName,
          password: hashedPassword,
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
            const token = jwt.sign(
              { userId: user._id, role: user.role },
              cfg.jwtCode,
              {
                expiresIn: "365d",
              }
            );
            res.status(201).json({
              user,
              token,
            });
          }
        }
      );
    },
  ],

  login: [
    body("phone", "Допустимы только цифры").isNumeric(),
    body("password", "Длина пароля не менее 6 символов").isLength({ min: 6 }),
    async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { phone, password } = req.body;
      const user = await User.findOne({ phone });

      if (!user) {
        return res
          .status(400)
          .json({ errorMessage: "Такого пользователя не существует" });
      }

      const isMatchPassword = await bcrypt.compare(password, user.password);

      if (isMatchPassword) {
        const token = jwt.sign(
          { userId: user._id, role: user.role },
          cfg.jwtCode,
          {
            expiresIn: "365d",
          }
        );
        res.status(200).json({
          user,
          token,
        });
      } else {
        res
          .status(400)
          .json({ errorMessage: "Неверный ввод, попробуйте еще раз" });
      }
    },
  ],
};
