const mongoose = require("mongoose");
const { marked } = require("marked");
const slugify = require("slugify");
const { JSDOM } = require("jsdom");
const dompurify = require("dompurify")(new JSDOM().window);

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  markdown: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  sanitizedHTML: {
    type: String,
    required: true,
  },
});

articleSchema.pre("validate", function (next) {
  if (this.title)
    this.slug = slugify(this.title, { lower: true, strict: true });

  if (this.markdown)
    this.sanitizedHTML = dompurify.sanitize(marked(this.markdown));

  next();
});

module.exports.Article = mongoose.model("Article", articleSchema);
