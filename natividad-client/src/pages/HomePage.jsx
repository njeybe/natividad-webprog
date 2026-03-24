// src/pages/HomePage.jsx
import Button from "../components/Button";

const HomePage = () => {
  const stats = [
    { label: "GitHub Commits", value: "200+" },
    { label: "Public Repos", value: "10" },
    { label: "Projects", value: "05" },
    { label: "Tech Stack", value: "06" },
  ];

  const socialLinks = [
    {
      platform: "GitHub",
      handle: "@njeybe",
      description:
        "Explore my repositories, open-source contributions, and backend project progress.",
      link: "https://github.com/njeybe",
      variant: "primary",
    },
    {
      platform: "LinkedIn",
      handle: "Joseph Brian Natividad",
      description:
        "Connect with me for professional opportunities and updates on my journey at National University.",
      link: "https://linkedin.com/in/njeybe",
      variant: "secondary",
    },
    {
      platform: "Gmail",
      handle: "Contact Me",
      description:
        "Send me an email for collaboration, inquiries, or any technical discussions regarding backend development.",
      link: "mailto:natividadjosephbrian@gmail.com",
      variant: "secondary",
    },
  ];

  return (
    <div className="flex w-full flex-col gap-12 py-12">
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-blue-600">
              BSIT Student • Mobile & Web Specialization
            </p>
            <h1 className="text-4xl font-black text-zinc-900 sm:text-6xl leading-tight">
              Aspiring Backend Developer.
            </h1>
            <p className="max-w-lg text-lg text-zinc-600 leading-relaxed">
              I'm Joseph Brian Natividad, a 3rd-year student at National
              University. I specialize in Mobile and Web Applications with a
              strong focus on learning server-side logic and database
              architecture.
            </p>
            <div className="flex gap-4">
              <Button to="/about" variant="primary">
                My Journey
              </Button>
              <Button to="/article">Learning Logs</Button>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 from-blue-600 to-indigo-600 rounded-3xl blur opacity-25" />
            <div className="relative aspect-video w-full rounded-2xl bg-zinc-900 p-6 border border-white/10 font-mono text-[11px] sm:text-xs text-indigo-300">
              <div className="flex gap-1.5 mb-6">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <p className="text-zinc-500 mb-2">// Server Setup</p>
              <p>
                <span className="text-pink-500">const</span> app = express();
              </p>
              <p>app.use(express.json());</p>
              <p className="mt-4">
                app.listen(<span className="text-orange-400">3000</span>, ()
                =&gt; &#123;
              </p>
              <p className="ml-4 text-green-400">
                console.log(
                <span className="text-yellow-200">'Backend Active'</span>);
              </p>
              <p>&#125;);</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-900 py-12 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
              Activity Overview
            </p>
            <h2 className="text-2xl font-bold mt-1">Code & Contributions</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="rounded-3xl border-2 border-zinc-700 bg-zinc-800/50 p-6 transition-colors hover:border-blue-500"
              >
                <p className="text-3xl font-black">{stat.value}</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-6">
        <div className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Connect With Me
          </p>
          <h2 className="mt-2 text-3xl font-bold text-zinc-900">
            Professional Directory
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {socialLinks.map((social) => (
            <article
              key={social.platform}
              className="rounded-[2.5rem] border-2 border-zinc-900 bg-white p-8 flex flex-col transition-all hover:shadow-[8px_8px_0px_0px_rgba(24,24,27,1)]"
            >
              <div className="flex aspect-square w-12 items-center justify-center rounded-2xl bg-zinc-100 border-2 border-zinc-900 mb-6">
                <span className="font-black text-xl">{social.platform[0]}</span>
              </div>
              <h3 className="text-2xl font-bold text-zinc-900">
                {social.platform}
              </h3>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mt-1">
                {social.handle}
              </p>
              <p className="mt-4 text-sm leading-6 text-zinc-600 grow">
                {social.description}
              </p>
              <div className="mt-8">
                <a
                  href={social.link}
                  target={social.platform === "Gmail" ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className={`inline-flex w-full items-center justify-center rounded-full border-2 border-zinc-900 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all active:scale-95 ${
                    social.variant === "primary"
                      ? "bg-zinc-900 text-white hover:bg-zinc-800"
                      : "bg-white text-zinc-900 hover:bg-zinc-50"
                  }`}
                >
                  {social.platform === "Gmail" ? "Send Email" : "Visit Profile"}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
