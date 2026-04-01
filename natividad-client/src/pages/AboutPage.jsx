import Button from "../components/Button";

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-100 p-6 text-center">
            <div className="flex min-h-72 items-center justify-center rounded-[1.25rem] bg-zinc-200">
              <div className="h-28 w-28 rounded-full border-2 border-zinc-900 bg-zinc-100 flex items-center justify-center font-bold">JB</div>
            </div>
          </div>
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">About Me</p>
            <h1 className="text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">JB Natividad: Mobile & Web Specialist.</h1>
            <p className="mt-4 text-sm leading-7 text-zinc-600">I am a 3rd-year student at National University. I specialize in Mobile and Web Applications and aim to build high-performance backend systems.</p>
            <div className="mt-6 flex gap-3"><Button to="/" variant="primary">Home</Button><Button to="/articles">Articles</Button></div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-900">Core Projects</h2>
            <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
              <h3 className="font-semibold text-zinc-900">TodaGo (Capstone)</h3>
              <p className="mt-2 text-sm text-zinc-600">Developing an AI-powered tricycle dispatching platform as part of my studies at NU.</p>
            </article>
            <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
              <h3 className="font-semibold text-zinc-900">GoRocky PH</h3>
              <p className="mt-2 text-sm text-zinc-600">A healthcare logistics system built during a professional hackathon.</p>
            </article>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28] text-zinc-500">Hobbies</p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="aspect-square bg-zinc-200 border-2 border-zinc-900 rounded-2xl flex items-center justify-center font-bold">🏀</div>
              <div className="aspect-square bg-zinc-200 border-2 border-zinc-900 rounded-2xl flex items-center justify-center font-bold">🏃</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;