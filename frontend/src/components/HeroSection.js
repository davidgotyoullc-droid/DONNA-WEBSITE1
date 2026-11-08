import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Ruler } from "lucide-react";

const FRAMES = [
  "/images/hero/hero-1.webp",
  "/images/hero/pose-2.webp",
  "/images/hero/pose-3.webp",
  "/images/hero/pose-4.webp",
  "/images/hero/pose-5.webp",
  "/images/hero/pose-6.webp",
];

const LINES = [
  { text: "Gentle by design.", accent: false },
  { text: "Dressed for", accent: false },
  { text: "every walk.", accent: true },
];

function MaskedLine({ children, delay }) {
  return (
    <span className="block overflow-hidden pb-1">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function HeroSection() {
  const [frame, setFrame] = useState(0);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const yMain = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const ySmall = useTransform(scrollYProgress, [0, 1], [0, -60]);

  useEffect(() => {
    const id = setInterval(() => setFrame((f) => (f + 1) % FRAMES.length), 750);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={sectionRef} data-testid="hero-section" className="texture-grain relative overflow-hidden bg-[#FDF7FA]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:pb-28 lg:pt-20">
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="font-mono-accent mb-6 text-xs tracking-[0.3em] text-[#E6007E]"
            data-testid="hero-overline"
          >
            HANDCRAFTED WALKING VESTS &amp; HARNESSES
          </motion.p>

          <h1 className="font-serif-display text-4xl font-bold leading-[1.08] tracking-tight text-[#3E2A33] sm:text-5xl lg:text-6xl" data-testid="hero-heading">
            {LINES.map((line, i) => (
              <MaskedLine key={line.text} delay={0.25 + i * 0.14}>
                {line.accent ? <em className="text-[#E6007E]">{line.text}</em> : line.text}
              </MaskedLine>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="mt-6 max-w-md text-base leading-relaxed text-[#5A6572] sm:text-lg"
            data-testid="hero-subcopy"
          >
            Boutique pet wear thoughtfully made to take pressure off delicate necks — soft cotton,
            whimsical prints, and a fit that keeps every dog comfortable and confident.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/shop"
              data-testid="hero-shop-button"
              className="group inline-flex items-center gap-2 rounded-full bg-[#3E2A33] px-7 py-3.5 text-sm font-semibold text-[#FDF7FA] transition-colors hover:bg-[#E6007E]"
            >
              Shop the collection
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/fitting-room"
              data-testid="hero-fit-button"
              className="inline-flex items-center gap-2 rounded-full border border-[#3E2A33]/20 px-7 py-3.5 text-sm font-semibold text-[#3E2A33] transition-colors hover:border-[#E6007E] hover:text-[#E6007E]"
            >
              <Ruler className="h-4 w-4" />
              Find your perfect fit
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="font-mono-accent mt-10 flex gap-6 text-[11px] tracking-[0.2em] text-[#5A6572]"
          >
            <span>100% COTTON</span>
            <span>USA MADE</span>
            <span>CHOKE-FREE</span>
          </motion.div>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <motion.div
            style={{ y: yMain }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border-8 border-white shadow-2xl shadow-[#3E2A33]/20"
            data-testid="hero-main-frame"
          >
            {FRAMES.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={i === 0 ? "Dog wearing a handcrafted Donna Devlin floral walking vest" : ""}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out ${i === frame ? "opacity-100" : "opacity-0"}`}
              />
            ))}
            <span
              data-testid="hero-live-tag"
              className="font-mono-accent absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-[#3E2A33]/85 px-3 py-1.5 text-[9px] font-bold tracking-[0.2em] text-[#FDF7FA] backdrop-blur"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#E6007E]" />
              IN MOTION
            </span>
          </motion.div>

          <motion.div
            style={{ y: ySmall }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-8 -left-4 hidden w-44 overflow-hidden rounded-3xl border-8 border-white shadow-xl shadow-[#3E2A33]/25 sm:block lg:-left-12 lg:w-56"
            data-testid="hero-detail-frame"
          >
            <img src="/images/hero/hero-3.webp" alt="Hand-stitched cotton detail" className="aspect-square w-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, rotate: -12, scale: 0.8 }}
            animate={{ opacity: 1, rotate: -8, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono-accent absolute -right-3 top-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#E6007E] text-center text-[10px] font-bold leading-tight tracking-[0.15em] text-[#FDF7FA] shadow-lg lg:-right-6 lg:h-28 lg:w-28"
            data-testid="hero-badge"
          >
            CHOKE-
            <br />
            FREE
            <br />
            FIT
          </motion.div>
        </div>
      </div>
    </section>
  );
}
