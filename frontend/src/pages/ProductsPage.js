import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const TYPES = [
  {
    name: "Walking Vests",
    tagline: "The signature piece",
    description:
      "Soft, lightweight vests that take pressure off the neck and onto the chest. Whimsical cotton prints, dual D-ring security, and a wrap fit that tiny pups and broad-chested dogs both love.",
    features: ["Choke-free chest-distribution design", "100% premium pre-washed cotton", "Sizes MINI through L"],
    images: ["/images/products/garden-party-vest-b.png", "/images/products/cherry-picnic-vest-a.png"],
    to: "/shop?category=Walking%20Vests",
  },
  {
    name: "Step-In Harnesses",
    tagline: "On in seconds",
    description:
      "Choke-free designs that are as easy to put on as they are comfortable to wear. Step in, one click, and you're out the door — pressure glides across the chest, never the throat.",
    features: ["One-click closure, no over-the-head struggle", "Reinforced stitching at every stress point", "Sizes XS through L"],
    images: ["/images/products/scotland-yard-harness-b.png", "/images/products/polka-wisp-harness-a.png"],
    to: "/shop?category=Step-In%20Harnesses",
  },
  {
    name: "Designer Collars",
    tagline: "Everyday elegance",
    description:
      "Premium cotton collars reinforced for strength and gentle on delicate necks — finished with removable bows and brass-finish hardware that turn a walk into an occasion.",
    features: ["Reinforced core inside soft cotton", "Removable designer bow", "Neck sizes 7″ to 29″"],
    images: ["/images/products/daisy-collar-b.png", "/images/products/daisy-collar-c.png"],
    to: "/shop?category=Designer%20Collars",
  },
  {
    name: "Matching Leashes",
    tagline: "Complete the set",
    description:
      "Beautifully coordinated 5-foot leashes in the same prints and palettes as our vests and collars — soft in the hand, with solid brass swivel clasps that never tangle.",
    features: ["5 ft length, two widths", "Solid brass swivel clasp", "Matches every print in the collection"],
    images: ["/images/products/coastal-leash-b.png", "/images/products/coastal-leash-c.png"],
    to: "/shop?category=Matching%20Leashes",
  },
];

export default function ProductsPage() {
  return (
    <main data-testid="products-page" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16 max-w-2xl">
        <p className="font-mono-accent mb-3 text-xs tracking-[0.3em] text-[#E6007E]">OUR PRODUCTS</p>
        <h1 className="font-serif-display text-4xl font-semibold tracking-tight text-[#3E2A33] sm:text-5xl">
          Four ways to walk beautifully
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#5A6572] sm:text-lg">
          Every piece is cut and sewn in the USA from the softest cotton — designed to protect delicate
          necks while keeping every dog the best-dressed at the park.
        </p>
      </motion.div>

      <div className="space-y-20">
        {TYPES.map((type, i) => (
          <motion.section
            key={type.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
            data-testid={`product-type-${type.name.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-3xl border-4 border-white shadow-lg">
                <img src={type.images[0]} alt={`${type.name} on a dog`} loading="lazy" className="aspect-[3/4] w-full object-cover" />
              </div>
              <div className="mt-8 overflow-hidden rounded-3xl border-4 border-white shadow-lg">
                <img src={type.images[1]} alt={`${type.name} detail`} loading="lazy" className="aspect-[3/4] w-full object-cover" />
              </div>
            </div>
            <div>
              <p className="font-mono-accent text-[10px] tracking-[0.25em] text-[#7D8F4E]">{type.tagline.toUpperCase()}</p>
              <h2 className="font-serif-display mt-2 text-3xl font-semibold tracking-tight text-[#3E2A33]">{type.name}</h2>
              <p className="mt-4 text-base leading-relaxed text-[#5A6572]">{type.description}</p>
              <ul className="mt-6 space-y-2.5">
                {type.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-[#5A6572]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#7D8F4E]">
                      <Check className="h-3 w-3 text-[#FDF7FA]" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to={type.to}
                data-testid={`product-type-shop-${type.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#3E2A33] px-7 py-3.5 text-sm font-semibold text-[#FDF7FA] transition-colors hover:bg-[#E6007E]"
              >
                Shop {type.name.toLowerCase()}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.section>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-20 rounded-3xl bg-[#3E2A33] p-8 text-center sm:p-12"
      >
        <h2 className="font-serif-display text-2xl font-semibold text-[#FDF7FA] sm:text-3xl">Not sure which size?</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#FDF7FA]/70">
          Our Fitting Room walks you through measuring for every product type — two minutes now saves an exchange later.
        </p>
        <Link
          to="/fitting-room"
          data-testid="products-fitting-room-link"
          className="mt-6 inline-block rounded-full bg-[#E6007E] px-8 py-3.5 text-sm font-semibold text-[#FDF7FA] transition-colors hover:bg-[#FDF7FA] hover:text-[#3E2A33]"
        >
          Visit the Fitting Room
        </Link>
      </motion.div>
    </main>
  );
}
