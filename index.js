const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cfg = require("./config.js");
const USER_ROLES = require("./constants/userRoles");
const morgan = require("morgan");
const cors = require("cors");
const upload = require("./middlewares/uploadImageMiddleware");
const roleMiddleware = require("./middlewares/roleMiddleware");
const authController = require("./controllers/auth");
const categoriesController = require("./controllers/categories");
const productsController = require("./controllers/products");
const ingredientsController = require("./controllers/ingredients");
const extraIngredientsController = require("./controllers/extraIngredients");
const ordersController = require("./controllers/orders");
const pizzaSizesController = require("./controllers/pizzaSizes");
const fieldsController = require("./controllers/fields");

const uri = `mongodb+srv://${cfg.dbUser}:${cfg.dbUserPassword}@stolle.3qrhz.mongodb.net/${cfg.dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .catch((err) => console.log(err.reason));

app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.route("/register").post(authController.register);
app.route("/login").post(authController.login);

app
  .route("/categories")
  .get(categoriesController.getCategories)
  .post(categoriesController.addCategory)
  .delete(
    roleMiddleware([USER_ROLES.ADMIN]),
    categoriesController.deleteCategory
  )
  .put(roleMiddleware([USER_ROLES.ADMIN]), categoriesController.updateCategory);

app
  .route("/products")
  // .get(productsController.getProducts)
  .post(upload.single("image"), productsController.addProduct)
  // .delete(roleMiddleware([USER_ROLES.ADMIN]), productsController.deleteProduct)
  // .put(
  //   roleMiddleware([USER_ROLES.ADMIN]),
  //   upload.single("image"),
  //   productsController.changeProduct
  // );

app
  .route("/ingredients")
  .get(ingredientsController.getIngredients)
  .post(roleMiddleware([USER_ROLES.ADMIN]), ingredientsController.addIngredient)
  .delete(
    roleMiddleware([USER_ROLES.ADMIN]),
    ingredientsController.deleteIngredient
  )
  .put(
    roleMiddleware([USER_ROLES.ADMIN]),
    ingredientsController.updateIngredient
  );

app
  .route("/extra-ingredients")
  .get(extraIngredientsController.getExtraIngredients)
  .post(
    roleMiddleware([USER_ROLES.ADMIN]),
    upload.single("image"),
    extraIngredientsController.addExtraIngredient
  )
  .delete(
    roleMiddleware([USER_ROLES.ADMIN]),
    extraIngredientsController.deleteExtraIngredient
  )
  .put(
    roleMiddleware([USER_ROLES.ADMIN]),
    upload.single("image"),
    extraIngredientsController.updateExtraIngredient
  );

app
  .route("/orders")
  .get(ordersController.getOrders)
  .post(ordersController.addOrder)
  .put(roleMiddleware([USER_ROLES.ADMIN]), ordersController.updateOrder);

app
  .route("/pizza-sizes")
  .get(pizzaSizesController.getPizzaSizes)
  .post(pizzaSizesController.addPizzaSize)
  .put(pizzaSizesController.updatePizzaSize)
  .delete(pizzaSizesController.deletePizzaSize);

app
  .route("/fields")
  .post(fieldsController.addField)
  .get(fieldsController.getFields)
  .put(fieldsController.updateField)
  .delete(fieldsController.deleteField)

app.listen(cfg.port, () => {
  console.log(`App listening at http://localhost:${cfg.port}`);
});
