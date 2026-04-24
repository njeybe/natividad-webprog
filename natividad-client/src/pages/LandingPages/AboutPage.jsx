import Button from "../../components/Button";
import daily from "../../assets/images/daily.png";
import grab from "../../assets/images/grab.png";
import event from "../../assets/images/event.png";
import occasion from "../../assets/images/occasion.png";

const aboutLogs = [
  {
    id: "01",
    title: "Daily Fresh Flower Prep",
    description:
      "Our team starts early to sort, hydrate, and prep premium stems for same-day bouquet assembly.",
    type: "daily",
  },
  {
    id: "02",
    title: "Bespoke Order Styling",
    description:
      "Each arrangement is customized by occasion, color preference, and card message.",
    type: "occasion",
  },
  {
    id: "03",
    title: "On-Time Delivery Workflow",
    description:
      "Order queue and dispatch coordination help keep gift moments on schedule.",
    type: "deliver",
  },
  {
    id: "04",
    title: "Event Floral Setups",
    description:
      "We style intimate events with cohesive floral themes for table, stage, and entrance accents.",
    type: "event",
  },
];

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-(--color-border) bg-(--color-surface) px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28] text-(--color-muted)">
          About Kraftin'e
        </p>
        <h1 className="max-w-xl uppercase text-3xl font-bold leading-tight text-(--color-text) sm:text-4xl">
          Crafted Blooms, Meaningful Moments.
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-(--color-muted) sm:text-base">
          Kraftin'e is a boutique floral brand focused on premium bouquet
          craftsmanship, thoughtful gifting, and reliable fulfillment.
        </p>
        <div className="mt-6 flex gap-3">
          <Button to="/" variant="primary">
            Back to Home
          </Button>
        </div>
      </section>

      <section className="border-y-2 border-(--color-border) bg-(--color-surface) px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28] text-(--color-muted)">
            Brand Highlights
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-(--color-text)">
            How We Build Each Floral Experience
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {aboutLogs.map((article) => (
            <article
              key={article.id}
              className="rounded-3xl border-2 border-(--color-border) bg-(--color-surface-alt) p-4 flex flex-col"
            >
              <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-(--color-primary) p-4">
                {article.type === "daily" && <img src={daily} alt="daily" className="h-90 w-100 object-cover rounded-3xl" />}
                {article.type === "occasion" && (
                  <img src={occasion} alt="occasion" className="h-90 w-100 object-cover rounded-3xl"/>
                )}
                {article.type === "deliver" && <img src={grab} alt="deliver" className="h-90 w-100 object-cover rounded-3xl"/>}
                {article.type === "event" && <img src={event} alt="event"  className="h-90 w-100 object-cover rounded-3xl" />}
              </div>

              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-(--color-muted)">
                {article.id}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-(--color-text) leading-snug">
                {article.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-(--color-muted) grow">
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
