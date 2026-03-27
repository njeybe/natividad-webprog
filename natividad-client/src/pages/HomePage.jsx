import Button from "../components/Button";

const HomePage = () => {
  const stats = [
    { label: "GitHub Commits", value: "200+" },
    { label: "Public Repos", value: "10" },
    { label: "Projects", value: "05" },
    { label: "Environment", value: "Windows" },
  ];

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Aspiring Backend Developer</p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">Building the logic that powers the web.</h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              I'm Joseph Brian Natividad, a 3rd-year BSIT student at National University specializing in Mobile and Web Applications.
            </p>
            <div className="mt-6"><Button to="/about" variant="primary">Learn More</Button></div>
          </div>

          <div className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-900 p-6">
            <div className="flex min-h-65 items-center justify-center rounded-[1.25rem] bg-zinc-800 font-mono text-[10px] text-indigo-300 p-4">
              <div className="space-y-1">
                <p>const app = express();</p>
                <p>app.get('/', (req, res) =&gt; &#123;</p>
                <p className="ml-4">res.send('Backend Active');</p>
                <p>&#125;);</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i} className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
              <p className="text-2xl font-bold text-zinc-900">{stat.value}</p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6"><h2 className="text-2xl font-semibold text-zinc-900">Professional Directory</h2></div>
        <div className="grid gap-4 md:grid-cols-3">
          {['GitHub', 'LinkedIn', 'Gmail'].map((platform) => (
            <article key={platform} className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
              <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
                <div className="h-12 w-12 border-2 border-zinc-900 bg-zinc-100 flex items-center justify-center font-bold">{platform[0]}</div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-zinc-900">{platform}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">Connect with me for professional inquiries and collaborations.</p>
              <Button className="mt-4" variant="primary">Visit Profile</Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;