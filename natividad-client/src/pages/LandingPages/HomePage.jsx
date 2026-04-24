import Button from "../../components/Button";
import fullLogo from "../../assets/images/kraftine_logo.png";
import loc1 from "../../assets/images/loc1.png";
import collab from "../../assets/images/collab.png";
import car from "../../assets/images/car.png";

const HomePage = () => {
  const stats = [
    { label: "Signature Bouquets", value: "25+" },
    { label: "Same-Day Slots", value: "12" },
    { label: "Event Setups", value: "40+" },
    { label: "Happy Clients", value: "500+" },
  ];

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-(--color-border) bg-(--color-surface) px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className=" grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-(--color-muted)">
              Kraftin'e Flower Studio
            </p>
            <h1 className="max-w-xl uppercase text-3xl font-bold leading-tight text-(--color-text) sm:text-4xl">
              Handcrafted Bouquets for Every Milestone.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-(--color-muted) sm:text-base">
              We design fresh floral arrangements for birthdays, anniversaries,
              weddings, and meaningful everyday gifting. Place your bouquet
              request and let us craft it with care.
            </p>
            <div className="mt-6">
              <Button to="/articles" variant="primary">
                View Collection
              </Button>
            </div>
          </div>
          <div className="flex aspect-video w-full items-center justify-center">
            <img
              src={fullLogo}
              alt="Kraftin'e floral visual"
              className="h-150 w-165 object-cover rounded-full"
            />
          </div>
        </div>
      </section>

      <section className="border-y-2 border-(--color-border) bg-(--color-surface) px-4 py-6 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="rounded-3xl border-2 border-(--color-border) bg-(--color-surface-alt) p-5"
            >
              <p className="text-2xl font-bold text-(--color-text)">
                {stat.value}
              </p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-(--color-muted)">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y-2 border-(--color-border) bg-(--color-surface) px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-(--color-text)">
            Connect With Kraftin'e
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              label: "Location",
              image: loc1,
              desc: "Our studio pickup spot and local delivery area.",
            },
            {
              label: "Collaboration",
              image: collab,
              desc: "Partnerships, styling support, and event coordination.",
            },
            {
              label: "Delivery",
              image: car,
              desc: "Swift bouquet drop-offs for orders and special occasions.",
            },
          ].map((item) => (
            <article
              key={item.label}
              className="overflow-hidden rounded-3xl border-2 border-(--color-border) bg-(--color-surface-alt) p-4"
            >
              <div className="overflow-hidden rounded-[1.25rem] border-2 border-(--color-border) bg-(--color-surface)">
                <img
                  src={item.image}
                  alt={item.label}
                  className="aspect-4/3 w-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-(--color-text)">
                {item.label}
              </h3>
              <p className="mt-3 text-sm leading-6 text-(--color-muted)">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
