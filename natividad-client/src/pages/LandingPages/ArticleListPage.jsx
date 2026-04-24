import Button from "../../components/Button.jsx";
import ArticleList from "../../components/ArticleList.jsx";
import articles from "../../assets/article-content.js";

const ArticlePage = () => {
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
        <ArticleList articles={articles} />
      </section>
    </div>
  );
};

export default ArticlePage;
