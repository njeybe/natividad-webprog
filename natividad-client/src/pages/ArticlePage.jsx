import Button from "../components/Button";

const ArticlePage = () => {
  const logs = [
    { id: "01", title: "Backend on Windows", desc: "Setting up my device for Node.js and MongoDB." },
    { id: "02", title: "TodaGo Dispatch Logic", desc: "Documenting the AI logic for our tricycle platform capstone." },
    { id: "03", title: "Healthcare Logistics", desc: "Insights from building the GoRocky PH system." },
    { id: "04", title: "NU Specialization", desc: "Exploring Flutter and MERN stack connections." },
  ];

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl">Learning Logs.</h1>
        <p className="mt-4 max-w-lg text-sm text-zinc-600">Documentation of my journey as a student at National University.</p>
        <div className="mt-6 flex gap-3"><Button to="/">Home</Button><Button to="/about">About</Button></div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {logs.map((log) => (
            <article key={log.id} className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
              <div className="aspect-4/3 bg-zinc-200 rounded-[1.25rem] mb-4 border-2 border-zinc-300" />
              <p className="text-[10px] font-bold text-zinc-400 uppercase">Log {log.id}</p>
              <h3 className="text-lg font-semibold text-zinc-900 mt-2">{log.title}</h3>
              <p className="text-sm text-zinc-600 mt-3">{log.desc}</p>
              <Button className="mt-4">Read Notes</Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;