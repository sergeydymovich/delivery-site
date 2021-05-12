const jwt = require("jsonwebtoken");
const { jwtCode } = require("../config.js");

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Пользователь не авторизован" });
      }
      const { role } = jwt.verify(token, jwtCode);

      if (roles.includes(role)) {
        next();
      } else {
        return res.status(403).json({ message: "У вас нет доступа" });
      }
    } catch (e) {
      return res.status(401).json({ message: "Пользователь не авторизован" });
    }
  };
};
