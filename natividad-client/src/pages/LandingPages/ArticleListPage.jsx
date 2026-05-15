import { useCallback, useEffect, useState } from "react";
import Button from "../../components/Button.jsx";
import ArticleList from "../../components/ArticleList.jsx";
import { fetchArticles } from "../../services/ArticleService";
import { resolveImage } from "../../assets/articleImages";

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadArticles = useCallback(async () => {
    try {
      const { data } = await fetchArticles();
      const mapped = (data.articles || [])
        .filter((a) => String(a.status).toLowerCase() === "active")
        .map((a) => ({
          name: a.slug,
          title: a.title,
          image: resolveImage(a.image),
          price: a.price,
          availability: a.availability,
          category: a.category,
          content: a.content || [],
        }));
      setArticles(mapped);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to load articles.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  useEffect(() => {
    const onFocus = () => loadArticles();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [loadArticles]);

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
          Explore floral pieces by occasion and availability — handcrafted
          bouquets fetched fresh from our catalog.
        </p>
        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      <section className="border-y-2 border-(--color-border) bg-(--color-surface) px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {loading ? (
          <p className="text-sm text-(--color-muted)">Loading bouquets…</p>
        ) : error ? (
          <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </p>
        ) : articles.length === 0 ? (
          <p className="text-sm text-(--color-muted)">
            No bouquets available yet.
          </p>
        ) : (
          <ArticleList articles={articles} />
        )}
      </section>
    </div>
  );
};

export default ArticleListPage;
