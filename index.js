require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const notFound = require("./routers/404");
const home = require("./routers/home");
const article = require("./routers/articles");
const methodOverride = require("method-override");

const app = express();

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    app.listen(process.env.PORT || 3000, (error) => {
      if (error) console.log(error);
      else console.log("listening on port 3000...");
    });
  })
  .catch(() => console.log("Could not connect to MongoDB..."));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use("/articles", article);
app.use("/", home);
app.use("*", notFound);
