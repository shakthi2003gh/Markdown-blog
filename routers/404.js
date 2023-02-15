const router = require("express").Router();

router.get("/", (_, res) => {
  res.render("404.ejs");
});

module.exports = router;
