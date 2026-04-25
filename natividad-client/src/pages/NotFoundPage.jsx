import Button from "../components/Button";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen w-full px-4 pt-24 flex items-start justify-center">
      <div className="w-full max-w-3xl border-2 border-(--color-border) rounded-2xl p-8 bg-(--color-surface)">
        <div className="text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-(--color-muted) font-text">
            Error
          </p>
          <h1 className="text-6xl font-bold leading-tight text-(--color-text) sm:text-7xl font-head">
            404
          </h1>
          <p className="mt-4 text-lg leading-7 text-(--color-muted) font-text">
            Page not found. The page you&apos;re looking for doesn&apos;t exist
            or has been moved.
          </p>
          <div className="mt-6 flex justify-center gap-3 font-text">
            <Button to="/">Back Home</Button>
            <Button to="/articles">View Collection</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
