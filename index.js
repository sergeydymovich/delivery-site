const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cfg = require("./config.js");
const morgan = require("morgan");
const cors = require("cors");
const authController = require("./controllers/auth");
const categoriesController = require("./controllers/categories");
const productsController = require("./controllers/products");
const ingredientsController = require("./controllers/ingredients");

const uri = `mongodb+srv://${cfg.dbUser}:${cfg.dbUserPassword}@stolle.3qrhz.mongodb.net/${cfg.dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .catch((err) => console.log(err.reason));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.route("/register").post(authController.register);
app.route("/login").post(authController.login);

app
  .route("/categories")
  .post(categoriesController.addCategory)
  .get(categoriesController.getCategories)
  .delete(categoriesController.deleteCategory)
  .put(categoriesController.changeCategory);

app
  .route("/products")
  .post(productsController.addProduct)
  .get(productsController.getProducts)
  .delete(productsController.deleteProduct);

app
  .route("/ingredients")
  .post(ingredientsController.addIngredient)
  .get(ingredientsController.getIngredients)
  .delete(ingredientsController.deleteIngredient)
  .put(ingredientsController.changeIngredient);

app.listen(cfg.port, () => {
  console.log(`Example app listening at http://localhost:${cfg.port}`);
});
