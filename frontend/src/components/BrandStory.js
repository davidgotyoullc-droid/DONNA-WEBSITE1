import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

const STATS = [
  { value: "100%", label: "Premium cotton" },
  { value: "USA", label: "Cut & sewn by hand" },
  { value: "0", label: "Pressure on the neck" },
];

export default function BrandStory() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="story" ref={ref} data-testid="brand-story" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div className="relative">
          <motion.div style={{ y }} className="overflow-hidden rounded-[2rem] border-8 border-white shadow-2xl shadow-[#3E2A33]/15">
            <img
              src="/images/brand/founder.webp"
              alt="Donna Devlin, founder and designer"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
              data-testid="story-portrait"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="absolute -bottom-8 -right-2 w-40 overflow-hidden rounded-3xl border-8 border-white shadow-xl sm:w-52 lg:-right-8"
          >
            <img src="/images/story/fabric-swatch.jpg" alt="Fabric and stitching detail" loading="lazy" className="aspect-square w-full object-cover" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono-accent mb-3 text-xs tracking-[0.3em] text-[#E6007E]">OUR STORY</p>
          <h2 className="font-serif-display text-3xl font-semibold tracking-tight text-[#3E2A33] sm:text-4xl">
            Designed with love.
            <br />
            Made for real dogs.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[#5A6572] sm:text-lg">
            Donna Devlin Designs began with one simple conviction: gentle, choke-free pet wear should
            never have to compromise on style. Decades of design experience — and one very opinionated
            dog — shape every piece that leaves the studio.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#5A6572] sm:text-lg">
            From walking vests to step-in harnesses with matching collars and leashes, each set is cut
            and sewn in the USA from the softest cotton, in prints chosen to make the everyday walk feel
            like a small occasion.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-[#3E2A33]/10 pt-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <p className="font-serif-display text-3xl font-bold text-[#E6007E]">{stat.value}</p>
                <p className="font-mono-accent mt-1 text-[10px] tracking-[0.2em] text-[#5A6572]">{stat.label.toUpperCase()}</p>
              </motion.div>
            ))}
          </div>
          <a
            href="#contact"
            data-testid="story-contact-link"
            className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-[#3E2A33] transition-colors hover:text-[#E6007E]"
          >
            Say hello to the studio
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
