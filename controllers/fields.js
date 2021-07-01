const Field = require("../models/Field.js");

module.exports = {
  getFields: (req, res) => {
    Field.find({}, (err, fields) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(200).json({ fields });
      }
    });
  },
  addField: (req, res) => {
    const { name, label, description, is_default, unit, ui_type } = req.body;

    Field.create({ name, label, description, is_default, unit, ui_type }, (err, field) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(201).json({ field });
      }
    });
  },
};
