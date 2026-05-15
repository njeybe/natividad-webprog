import Article from "../models/Article.js";

export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find({}).sort({ createdAt: -1 });
    res.json({ articles });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getArticleBySlug = async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createArticle = async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(article);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Article deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
