import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Scissors, ShieldCheck, Sparkles } from "lucide-react";

const PILLARS = [
  { icon: Scissors, text: "Handcrafted quality with reinforced stitching at every stress point." },
  { icon: Heart, text: "Breathable, comfortable materials that stay soft against the skin." },
  { icon: Sparkles, text: "Fabric patterns you won't see on every other dog at the park." },
  { icon: ShieldCheck, text: "Matching sets that complete the look from collar to leash." },
];

export default function AboutPage() {
  return (
    <main data-testid="about-page">
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="font-mono-accent mb-3 text-xs tracking-[0.3em] text-[#E6007E]">ABOUT US</p>
            <h1 className="font-serif-display text-4xl font-semibold tracking-tight text-[#3E2A33] sm:text-5xl">
              For over 20 years, designing gentle, beautiful dog wear.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-[#5A6572] sm:text-lg">
              What began as a simple passion for sewing grew into a mission: help dogs feel safe,
              supported and stylish on every walk. Each Donna Devlin piece is handcrafted from premium
              fabrics, with thoughtful stitching and a deep respect for delicate necks and sensitive airways.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="overflow-hidden rounded-[2rem] border-8 border-white shadow-2xl shadow-[#3E2A33]/15"
          >
            <img src="/images/story/dog-on-beach.jpg" alt="A dog in a Donna Devlin walking vest on the beach" className="aspect-[4/3] w-full object-cover" />
          </motion.div>
        </div>
      </section>

      <section className="bg-[#FBEEF4] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <h2 className="font-serif-display text-3xl font-semibold tracking-tight text-[#3E2A33] sm:text-4xl">
              Where function meets fashion
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#5A6572] sm:text-lg">
              Early on, Donna noticed how many traditional collars and harnesses caused discomfort —
              especially for small dogs and those with sensitive airways. That insight became the heart
              of every design: each vest and harness is made to help your dog look adorable and feel even better.
            </p>
          </motion.div>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-3xl border border-[#3E2A33]/10 bg-white p-6 shadow-sm"
                  data-testid={`about-pillar-${i}`}
                >
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FBEEF4]">
                    <Icon className="h-5 w-5 text-[#E6007E]" />
                  </span>
                  <p className="text-sm leading-relaxed text-[#5A6572]">{pillar.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden rounded-[2rem] border-8 border-white shadow-xl shadow-[#3E2A33]/10"
          >
            <img src="/images/story/fabric-swatch.jpg" alt="Donna Devlin Designs fabric and stitching detail" className="aspect-[4/3] w-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-mono-accent mb-3 text-xs tracking-[0.3em] text-[#7D8F4E]">CRAFT &amp; DETAIL</p>
            <h2 className="font-serif-display text-3xl font-semibold tracking-tight text-[#3E2A33] sm:text-4xl">
              From fabric to finished piece
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#5A6572] sm:text-lg">
              Every design begins with premium cotton — softer and less abrasive than traditional nylon —
              reinforced with webbing where strength matters, never where bulk would bother. Stress points
              are double-stitched, hardware is chosen for reliability, and every closure is tested for
              comfort. Donna personally selects each fabric, so it meets her standards for your pampered pet.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#3E2A33] py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] border-8 border-white/10 shadow-2xl"
          >
            <img src="/images/story/donna-founder.jpg" alt="Donna Devlin, founder and designer" className="aspect-[4/5] w-full object-cover" data-testid="about-donna-photo" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="font-mono-accent mb-3 text-xs tracking-[0.3em] text-[#E6007E]">MEET DONNA</p>
            <p className="font-mono-accent mb-2 text-[10px] tracking-[0.25em] text-[#FDF7FA]/60">DESIGNER · MAKER · DOG LOVER</p>
            <h2 className="font-serif-display text-3xl font-semibold tracking-tight text-[#FDF7FA] sm:text-4xl">
              An artist's eye, a lifelong love of dogs
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#FDF7FA]/75 sm:text-lg">
              Donna has spent decades in the world of design. When she learned how common tracheal
              issues are in small breeds, she turned that experience toward creating safer, softer,
              choke-free alternatives to traditional collars.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#FDF7FA]/75 sm:text-lg">
              Today, every piece that carries her name reflects that mission — gentle, stylish,
              thoughtfully made designs that let dogs move, breathe and live comfortably while looking
              their very best. Because every pet deserves to walk safely… in style.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:py-20">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 className="font-serif-display text-3xl font-semibold tracking-tight text-[#3E2A33] sm:text-4xl">
            Our promise to you &amp; your dog
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#5A6572] sm:text-lg">
            Gentle, secure and beautiful — so you can enjoy every walk with confidence, knowing your dog
            is both protected and stylish.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/shop"
              data-testid="about-shop-link"
              className="group inline-flex items-center gap-2 rounded-full bg-[#3E2A33] px-7 py-3.5 text-sm font-semibold text-[#FDF7FA] transition-colors hover:bg-[#E6007E]"
            >
              Explore the collection
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/fitting-room"
              data-testid="about-fitting-link"
              className="inline-flex items-center gap-2 rounded-full border border-[#3E2A33]/20 px-7 py-3.5 text-sm font-semibold text-[#3E2A33] transition-colors hover:border-[#E6007E] hover:text-[#E6007E]"
            >
              Visit the Fitting Room
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
