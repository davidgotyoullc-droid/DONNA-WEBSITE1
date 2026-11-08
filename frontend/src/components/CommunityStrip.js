import { motion } from "framer-motion";

const STRIP = [
  "/images/products/garden-party-vest-b.png",
  "/images/hero/hero-2.png",
  "/images/products/cherry-picnic-vest-b.png",
  "/images/products/daisy-collar-b.png",
  "/images/products/coastal-leash-b.png",
  "/images/products/polka-wisp-harness-b.png",
];

export default function CommunityStrip() {
  return (
    <section data-testid="community-strip" className="overflow-hidden py-16 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-10 text-center"
      >
        <p className="font-mono-accent mb-3 text-xs tracking-[0.3em] text-[#E6007E]">JOIN THE PACK</p>
        <h2 className="font-serif-display text-3xl font-semibold tracking-tight text-[#3E2A33] sm:text-4xl">
          #DonnaDevlinDogs
        </h2>
      </motion.div>
      <div className="flex gap-4 overflow-x-auto px-4 scrollbar-none sm:justify-center">
        {STRIP.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className={`w-40 shrink-0 overflow-hidden rounded-2xl sm:w-48 ${i % 2 === 1 ? "mt-6" : ""}`}
          >
            <img
              src={src}
              alt="A dog in Donna Devlin Designs"
              loading="lazy"
              className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
