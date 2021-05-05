const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cfg = require("./config.js");
const morgan = require("morgan");
const cors = require("cors");
const { body } = require("express-validator");
const authController = require("./controllers/auth");

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

app.route("/register").post(
  [
    body("phone", "Допустимы только цифры").isNumeric(),
    body("password", "Пароль должен содержать не менее 6 символов").isLength({
      min: 6,
    }),
    body("birthdate", "Недопустимая дата").isDate({ format: "DD/MM/YYYY" }),
  ],
  authController.register
);

app
  .route("/login")
  .post(
    [body("phone", "Допустимы только цифры").isNumeric()],
    authController.login
  );

app.listen(cfg.port, () => {
  console.log(`Example app listening at http://localhost:${cfg.port}`);
});
