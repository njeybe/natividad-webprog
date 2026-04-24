import { useMemo, useState } from "react";
import Button from "../../components/Button.jsx";
import ArticleList from "../../components/ArticleList.jsx";
import articles from "../../assets/article-content.js";

const ArticlePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  const categories = useMemo(
    () => ["all", ...new Set(articles.map((article) => article.category))],
    [],
  );

  const filteredArticles = useMemo(
    () =>
      articles.filter((article) => {
        const categoryMatch =
          selectedCategory === "all" || article.category === selectedCategory;
        const stockMatch =
          !showInStockOnly || article.availability === "in-stock";
        return categoryMatch && stockMatch;
      }),
    [selectedCategory, showInStockOnly],
  );

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-(--color-border) bg-(--color-surface) px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-(--color-muted)">
          Collection
        </p>
        <h1 className="max-w-xl uppercase text-3xl font-bold leading-tight text-(--color-text) sm:text-4xl">
          Browse Kraftin'e Bouquets
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-(--color-muted) sm:text-base">
          Explore floral pieces by occasion and availability using our local
          catalog preview.
        </p>
        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      <section className="border-y-2 border-(--color-border) bg-(--color-surface) px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-(--color-muted)">
            Catalog Controls
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-(--color-text)">
            Filter Products
          </h2>
        </div>

        <div className="mb-6 grid gap-3 rounded-2xl border-2 border-(--color-border) bg-(--color-surface-alt) p-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-(--color-text) font-text">
            Category
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="mt-2 w-full rounded-xl border border-(--color-border) bg-(--color-surface) px-3 py-2 text-sm text-(--color-text)"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.replace("-", " ")}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-2 pt-7 text-sm font-medium text-(--color-text) font-text">
            <input
              type="checkbox"
              checked={showInStockOnly}
              onChange={(event) => setShowInStockOnly(event.target.checked)}
              className="h-4 w-4 rounded border-(--color-border) accent-(--color-primary)"
            />
            Show in-stock only
          </label>
        </div>

        <ArticleList articles={filteredArticles} />
      </section>
    </div>
  );
};

export default ArticlePage;
