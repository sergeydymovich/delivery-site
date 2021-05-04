const User = require("../models/User.js");

module.exports = {
  addUser: (req, res) => {
    const { name } = req.query;

    User.create(
      {
        name,
      },
      (err, user) => {
        if (err) {
          res.status(400).json({ errorMessage: err._message });
        } else {
          res.status(201).json({
            user,
          });
        }
      }
    );
  },
};
