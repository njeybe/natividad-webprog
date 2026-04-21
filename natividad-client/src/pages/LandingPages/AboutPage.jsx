import Button from "../../components/Button";

const aboutLogs = [
  {
    id: "01",
    title: "Learning the basics of TypeScript",
    description:
      "Learning how type scripts works for future projects purposes.",
    type: "code",
  },
  {
    id: "02",
    title: "TodaGo Dispatch Logic",
    description:
      "Designing the backend architecture for our AI-powered tricycle-hailing capstone project.",
    type: "icon",
  },
  {
    id: "03",
    title: "Healthcare Logistics",
    description:
      "Key takeaways from building the GoRocky PH system during a professional 2025 hackathon.",
    type: "status",
  },
  {
    id: "04",
    title: "NU Specialization",
    description:
      "Exploring the technical connection between Flutter mobile apps and MERN web platforms.",
    type: "icon",
  },
];

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28] text-zinc-500">
          About me
        </p>
        <h1 className="max-w-xl uppercase text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Documenting my journey to the Backend.
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          A collection of notes and insights from my studies at National
          University.
        </p>
        <div className="mt-6 flex gap-3">
          <Button to="/" variant="primary">
            Back Home
          </Button>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28] text-zinc-500">
            Recent Logs
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Study Notes & Project Insights
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {aboutLogs.map((article) => (
            <article
              key={article.id}
              className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4 flex flex-col"
            >
              <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-900 p-4">
                {article.type === "code" && (
                  <span className="text-indigo-400 font-mono text-[10px]">
                    {"// dev_env.win"}
                  </span>
                )}
                {article.id === "02" && <span className="text-2xl">🚕</span>}
                {article.id === "03" && (
                  <span className="text-green-400 font-mono text-[10px]">
                    {"{ status: 'success' }"}
                  </span>
                )}
                {article.id === "04" && <span className="text-2xl">📚</span>}
              </div>

              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                Log {article.id}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-zinc-900 leading-snug">
                {article.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600 grow">
                {article.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;
