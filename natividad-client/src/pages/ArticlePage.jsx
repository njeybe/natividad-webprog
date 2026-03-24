import Button from "../components/Button";

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* Header Section: Connects to Home and About */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28] text-zinc-500">
          Learning Logs
        </p>
        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Documenting my journey to the Backend.
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          A collection of notes and insights from my studies at National
          University, focusing on how I build the "brains" of mobile and web
          applications.
        </p>
        <div className="mt-6 flex gap-3">
          <Button to="/" variant="primary">
            Back Home
          </Button>
          <Button to="/about">My Journey</Button>
        </div>
      </section>

      {/* Featured Articles Grid */}
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
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4 flex flex-col">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-900 text-indigo-400 font-mono text-[10px] p-4">
              <span>{"// dev_env.win"}</span>
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Log 01
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900 leading-snug">
              Backend on Windows
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600 grow">
              How I configured my device for Node.js and MongoDB development.
            </p>
            <Button className="mt-4">Read Notes</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4 flex flex-col">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
              <span className="text-2xl">🚕</span>
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Log 02
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900 leading-snug">
              TodaGo Dispatch Logic
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600 grow">
              Designing the backend architecture for our AI-powered
              tricycle-hailing platform.
            </p>
            <Button className="mt-4">Read Notes</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4 flex flex-col">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-900 text-green-400 font-mono text-[10px] p-4">
              <span>{"{ status: 'success' }"}</span>
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Log 03
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900 leading-snug">
              Healthcare Logistics
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600 grow">
              Key takeaways from building the GoRocky PH system during a 2025
              hackathon.
            </p>
            <Button className="mt-4">Read Notes</Button>
          </article>

          {/* Article 04: Mobile & Web Bridge */}
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4 flex flex-col">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
              <span className="text-2xl">📚</span>
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Log 04
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900 leading-snug">
              NU Specialization
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600 grow">
              Exploring the connection between Flutter mobile apps and MERN web
              platforms.
            </p>
            <Button className="mt-4">Read Notes</Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;
