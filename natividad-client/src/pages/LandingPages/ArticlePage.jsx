import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button.jsx";
import NotFoundPage from "../NotFoundPage.jsx";
import { fetchArticleBySlug } from "../../services/ArticleService";
import { resolveImage } from "../../assets/articleImages";

function ArticlePage() {
  const { name } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    setError("");
    fetchArticleBySlug(name)
      .then(({ data }) => {
        if (cancelled) return;
        const normalized = {
          ...data,
          content: Array.isArray(data.content)
            ? data.content
            : data.content
              ? [String(data.content)]
              : [],
        };
        setArticle(normalized);
      })
      .catch((err) => {
        if (cancelled) return;
        if (err.response?.status === 404) setNotFound(true);
        else
          setError(
            err.response?.data?.message ||
              err.message ||
              "Unable to load article.",
          );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [name]);

  if (loading) {
    return (
      <div className="flex w-full flex-col gap-6">
        <section className="border-y-2 border-(--color-border) bg-(--color-surface) px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <p className="text-sm text-(--color-muted)">Loading bouquet…</p>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full flex-col gap-6">
        <section className="border-y-2 border-(--color-border) bg-(--color-surface) px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </p>
          <div className="mt-4">
            <Button to="/articles">Back to Articles</Button>
          </div>
        </section>
      </div>
    );
  }

  if (notFound || !article) {
    return <NotFoundPage />;
  }

  const prettyName = (article.slug || article.title || "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-(--color-border) bg-(--color-surface) px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-4">
            <Button to="/articles">Back to Articles</Button>
          </div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-(--color-muted)">
            Product Detail
          </p>
          <h1 className="text-3xl font-bold leading-tight text-(--color-text) sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-2 text-sm text-(--color-muted)">{prettyName}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-(--color-border) bg-(--color-surface-alt) px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-primary)">
              {article.category}
            </span>
            <span className="rounded-full border border-(--color-border) bg-(--color-surface-alt) px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-primary)">
              Php {Number(article.price).toLocaleString()}
            </span>
            <span
              className={`rounded-full border border-(--color-border) px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                article.availability === "in-stock"
                  ? "bg-(--color-surface-alt) text-(--color-success)"
                  : article.availability === "limited"
                    ? "bg-(--color-surface-alt) text-(--color-danger)"
                    : "bg-(--color-surface-alt) text-(--color-muted)"
              }`}
            >
              {String(article.availability).replace("-", " ")}
            </span>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-(--color-border) bg-(--color-surface) px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex aspect-4/3 items-center justify-center rounded-[1.25rem] border-2 border-(--color-border) bg-(--color-surface-alt)">
            <img
              src={resolveImage(article.image)}
              alt={article.title}
              className="h-full w-full object-cover rounded-2xl"
            />
          </div>

          <div className="prose prose-sm max-w-none space-y-4 text-(--color-text)">
            {(article.content || []).map((paragraph, index) => (
              <p
                key={index}
                className="whitespace-pre-wrap text-base leading-7 text-(--color-text)"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-8 border-t-2 border-(--color-border) pt-6">
            <Button to="/articles"> Back to Articles</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArticlePage;
