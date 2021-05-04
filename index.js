const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cfg = require("./config.js");
const morgan = require("morgan");
const cors = require("cors");
const usersController = require("./controllers/users");

const uri = `mongodb+srv://${cfg.dbUser}:${cfg.dbUserPassword}@stolle.3qrhz.mongodb.net/${cfg.dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .catch((err) => console.log(err.reason));

app.use(morgan("dev"));
app.use(cors());

app.route("/register").post(usersController.addUser);

app.listen(cfg.port, () => {
  console.log(`Example app listening at http://localhost:${cfg.port}`);
});
