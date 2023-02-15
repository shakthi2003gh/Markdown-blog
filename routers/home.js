const { Article } = require("../models/article");

const router = require("express").Router();

router.get("/", async (_, res) => {
  const articles = await Article.find().sort("-createAt");

  res.render("articles/index", { articles });
});

module.exports = router;
