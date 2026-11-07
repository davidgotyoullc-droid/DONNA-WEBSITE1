import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "Our vet suggested a choke-free harness and this vest changed our walks completely — no more coughing fits afterward.",
    name: "Sarah & Bella",
    detail: "Garden Party Walking Vest",
  },
  {
    quote: "The prints are even lovelier in person. We get stopped at the dog park every single time.",
    name: "Megan & Oliver",
    detail: "Scotland Yard Harness",
  },
  {
    quote: "On in one motion, off just as fast, and my little pup actually leans in to have it put on.",
    name: "Daniel & Coco",
    detail: "Polka Wisp Step-In",
  },
];

export default function Testimonials() {
  return (
    <section data-testid="testimonials" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mb-12 max-w-xl"
      >
        <p className="font-mono-accent mb-3 text-xs tracking-[0.3em] text-[#D96B43]">WALKED &amp; LOVED</p>
        <h2 className="font-serif-display text-3xl font-semibold tracking-tight text-[#1C2A39] sm:text-4xl">
          Loved by dogs &amp; their humans
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className="flex flex-col rounded-3xl border border-[#1C2A39]/10 bg-white p-8 shadow-sm"
            data-testid={`testimonial-${i}`}
          >
            <div className="flex gap-1 text-[#C8963E]">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="font-serif-display mt-5 flex-1 text-lg italic leading-relaxed text-[#1C2A39]">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-6 border-t border-[#1C2A39]/10 pt-4">
              <p className="text-sm font-semibold text-[#1C2A39]">— {t.name}</p>
              <p className="font-mono-accent mt-0.5 text-[10px] tracking-[0.2em] text-[#5A6572]">{t.detail.toUpperCase()}</p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
