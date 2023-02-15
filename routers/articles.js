const mongoose = require("mongoose");
const router = require("express").Router();
const { Article } = require("../models/article");

router.get("/new", (_, res) => {
  res.render("articles/new", { article: new Article() });
});

router.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("articles/edit", { article });
});

router.get("/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });

  if (!article) return res.redirect("/");
  res.render("articles/show", { article });
});

router.post(
  "/",
  (req, _, next) => {
    req.article = new Article();
    next();
  },
  saveArticleAndRedirect("new")
);

router.put(
  "/:id",
  async (req, _, next) => {
    req.article = await Article.findById(req.params.id);

    next();
  },
  saveArticleAndRedirect("edit")
);

router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    const { title, description, markdown } = req.body;

    const article = req.article;

    article.title = title;
    article.description = description;
    article.markdown = markdown;

    try {
      await article.save();
      res.redirect(`/articles/${article.slug}`);
    } catch (e) {
      res.render("articles/" + path, { article });
    }
  };
}

module.exports = router;
