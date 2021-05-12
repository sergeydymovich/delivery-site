const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cfg = require("./config.js");
const { admin } = require("./userRoles.js");
const morgan = require("morgan");
const cors = require("cors");
const roleMiddleware = require("./middlewares/roleMiddleware");
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
  .get(categoriesController.getCategories)
  .post(roleMiddleware([admin]), categoriesController.addCategory)
  .delete(roleMiddleware([admin]), categoriesController.deleteCategory)
  .put(roleMiddleware([admin]), categoriesController.changeCategory);

app
  .route("/products")
  .get(productsController.getProducts)
  .post(roleMiddleware([admin]), productsController.addProduct)
  .delete(roleMiddleware([admin]), productsController.deleteProduct);

app
  .route("/ingredients")
  .get(ingredientsController.getIngredients)
  .post(roleMiddleware([admin]), ingredientsController.addIngredient)
  .delete(roleMiddleware([admin]), ingredientsController.deleteIngredient)
  .put(roleMiddleware([admin]), ingredientsController.changeIngredient);

app.listen(cfg.port, () => {
  console.log(`Example app listening at http://localhost:${cfg.port}`);
});
