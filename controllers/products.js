const Product = require("../models/Product.js");

module.exports = {
  addProduct: async (req, res) => {
    const {
      name,
      is_available,
      image,
      price,
      category,
      ...rest
    } = req.body;
    const img = req.file ? req.file.path : image;
 
    const createObj = {
      name,
      is_available,
      image_src: img,
      price,
      category,
      ...rest,
    }
    
    Product.create(createObj,  (err, product) => {
        if (err) {
          res.status(400).json({ message: err.message });
        } else {
          res.status(201).json({ product });
        }
      }
    );
  },
};
