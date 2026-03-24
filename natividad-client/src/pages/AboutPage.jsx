import Button from "../components/Button";

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-100 p-6">
            <div className="flex min-h-72 items-center justify-center rounded-[1.25rem] bg-zinc-900 text-indigo-400 font-mono text-xs p-6 shadow-inner">
              <div className="space-y-1">
                <p className="text-zinc-500">// System Profile</p>
                <p>const developer = &#123;</p>
                <p className="ml-4">name: "JB Natividad",</p>
                <p className="ml-4">specialization: "Mobile & Web",</p>
                <p className="ml-4">goal: "Backend Engineer"</p>
                <p>&#125;;</p>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Personal Profile
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Joseph Brian Natividad: Aspiring Backend Developer.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              I am currently a 3rd-year student at National University
              specializing in Mobile and Web Applications. My focus is on
              building efficient server-side logic and managing the systems that
              power modern applications.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
              <Button to="/article">Learning Logs</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Academic Status
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Quick Technical Overview
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">03</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              BSIT Year
            </p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">MERN</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Primary Stack
            </p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">Windows</p>{" "}
            {/* Updated from Linux */}
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Environment
            </p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">02</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Core Projects
            </p>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Project Focus
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
              Specialization Experience
            </h2>

            <div className="mt-6 space-y-4">
              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  TodaGo (Capstone Project)
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Developing an AI-powered tricycle dispatching platform as part
                  of my Mobile and Web Application specialization.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  Backend Foundations
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Actively studying database management and API design to build
                  robust web applications.
                </p>
              </article>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Hobbies & Interests
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="flex aspect-square flex-col items-center justify-center rounded-[1.25rem] bg-zinc-200 border-2 border-zinc-900">
                <span className="text-2xl">🏀</span>
                <p className="text-[10px] font-bold mt-2">BASKETBALL</p>
              </div>
              <div className="flex aspect-square flex-col items-center justify-center rounded-[1.25rem] bg-zinc-200 border-2 border-zinc-900">
                <span className="text-2xl">🏃</span>
                <p className="text-[10px] font-bold mt-2">RUNNING</p>
              </div>
              <div className="flex aspect-square flex-col items-center justify-center rounded-[1.25rem] bg-zinc-200 border-2 border-zinc-900">
                <span className="text-2xl">🎮</span>
                <p className="text-[10px] font-bold mt-2">GAMING</p>
              </div>
              <div className="flex aspect-square flex-col items-center justify-center rounded-[1.25rem] bg-zinc-200 border-2 border-zinc-900">
                <span className="text-2xl">☁️</span>
                <p className="text-[10px] font-bold mt-2">API DEV</p>
              </div>
            </div>
            <Button className="mt-5 w-full">View Full Journey</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
