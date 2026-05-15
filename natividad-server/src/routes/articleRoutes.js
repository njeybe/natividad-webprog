import express from "express";
import {
  getArticles,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/articleController.js";

const router = express.Router();

router.get("/slug/:slug", getArticleBySlug);
router.route("/").get(getArticles).post(createArticle);
router.route("/:id").put(updateArticle).delete(deleteArticle);

export default router;
