const Field = require("../models/Field.js");
const Category = require("../models/Category.js");

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
  updateField: (req, res) => {
    const { _id, name, label, description, is_default, unit, ui_type } = req.body;

    Field.findOneAndUpdate(
      { _id },
      { name, label, description, is_default, unit, ui_type },
      { new: true },
      (err, field) => {
        if (err) {
          res.status(400).json({ message: err.message });
        } else {
          res.status(200).json({ field });
        }
      }
    );
  },
  deleteField: async (req, res) => {
    const { _id } = req.body;

    const deletedField = await Field.deleteOne({ _id });

    if (deletedField.deletedCount) {
      Category.updateMany(
        { fields: { $in: [_id] } },
        { $pull: { fields: { $in: [_id] } } },
        (err, categories) => {
          if (err) {
            res.status(400).json({ message: err.message });
          } else {
            res.status(200).json({ categories });
          }
        }
      );
    } else {
      res.status(400).json({ message: "поле не удалено" });
    }
  },
};
