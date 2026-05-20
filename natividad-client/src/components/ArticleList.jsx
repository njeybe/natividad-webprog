import { Link } from "react-router-dom";
import Button from "./Button";

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {articles.map((article, index) => {
        const excerpt = article.content?.[0]
          ? article.content[0].substring(0, 150)
          : "No description available.";

        return (
          <article
            key={article.name}
            className="rounded-3xl border-2 border-(--color-border) bg-(--color-surface-alt) p-4"
          >
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-(--color-surface)">
              <img
                src={article.image}
                alt={article.title}
                className="h-full w-full object-cover rounded-2xl"
              />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-(--color-muted)">
              Product {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-(--color-text)">
              {article.title}
            </h3>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--color-primary)">
              Php {article.price.toLocaleString()} | {article.category}
            </p>
            <p
              className={`mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] ${
                article.availability === "in-stock"
                  ? "text-(--color-success)"
                  : article.availability === "limited"
                    ? "text-(--color-danger)"
                    : "text-(--color-muted)"
              }`}
            >
              {article.availability.replace("-", " ")}
            </p>
            <p className="mt-3 text-sm leading-6 text-(--color-muted)">
              {excerpt}
              {excerpt === "No description available." ? "" : "..."}
            </p>
            <Link to={`/articles/${article.name}`}>
              <Button className="mt-4">Read More</Button>
            </Link>
          </article>
        );
      })}
    </div>
  );
};

export default ArticleList;
