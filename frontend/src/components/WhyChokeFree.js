import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const POINTS = [
  "Small breeds and sensitive airways can be vulnerable to pressure placed directly on the throat.",
  "A collar concentrates every pull on one small point of the neck.",
  "Our vests and harnesses spread that same pressure gently across the chest instead.",
  "The result: less coughing, less gagging, and a calmer, happier walk.",
];

function PressureDiagram({ mode }) {
  const isHarness = mode === "harness";
  return (
    <svg viewBox="0 0 320 300" className="w-full max-w-md" data-testid="choke-free-diagram">
      {/* dog silhouette */}
      <g>
        <ellipse cx="170" cy="190" rx="85" ry="48" fill="#3E2A33" />
        <circle cx="92" cy="130" r="34" fill="#3E2A33" />
        <path d="M 60 120 Q 45 100 62 95 Q 72 105 70 118 Z" fill="#3E2A33" />
        <rect x="110" y="225" width="16" height="52" rx="8" fill="#3E2A33" />
        <rect x="200" y="225" width="16" height="52" rx="8" fill="#3E2A33" />
        <path d="M 250 175 Q 285 150 275 125" stroke="#3E2A33" strokeWidth="12" fill="none" strokeLinecap="round" />
      </g>
      {/* pressure zones */}
      {isHarness ? (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <ellipse cx="150" cy="180" rx="58" ry="40" fill="#7D8F4E" opacity="0.85" />
          <text x="150" y="184" textAnchor="middle" fill="#FDF7FA" fontSize="13" fontWeight="700" fontFamily="Space Mono, monospace">
            EVEN PRESSURE
          </text>
          <circle cx="96" cy="152" r="7" fill="#7D8F4E" />
          <text x="110" y="120" fill="#7D8F4E" fontSize="12" fontWeight="700" fontFamily="Space Mono, monospace">NECK: FREE</text>
        </motion.g>
      ) : (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <ellipse cx="102" cy="158" rx="14" ry="20" fill="#E6007E" opacity="0.9" />
          <text x="140" y="120" fill="#E6007E" fontSize="12" fontWeight="700" fontFamily="Space Mono, monospace">ALL PRESSURE HERE</text>
          <path d="M 138 124 L 110 148" stroke="#E6007E" strokeWidth="2" />
        </motion.g>
      )}
    </svg>
  );
}

export default function WhyChokeFree() {
  const [mode, setMode] = useState("harness");

  return (
    <section id="choke-free" data-testid="choke-free-section" className="bg-[#FBEEF4] py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono-accent mb-3 text-xs tracking-[0.3em] text-[#E6007E]">GENTLE BY DESIGN</p>
          <h2 className="font-serif-display text-3xl font-semibold tracking-tight text-[#3E2A33] sm:text-4xl">
            Why choke-free matters
          </h2>
          <ul className="mt-8 space-y-4">
            {POINTS.map((point, i) => (
              <motion.li
                key={point}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-3 text-base leading-relaxed text-[#5A6572]"
              >
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#7D8F4E]">
                  <Check className="h-3 w-3 text-[#FDF7FA]" />
                </span>
                {point}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl border border-[#3E2A33]/10 bg-white p-8 shadow-sm"
        >
          <div className="mx-auto mb-6 flex w-fit rounded-full border border-[#3E2A33]/15 p-1" data-testid="choke-free-toggle">
            <button
              data-testid="toggle-collar"
              onClick={() => setMode("collar")}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${mode === "collar" ? "bg-[#E6007E] text-[#FDF7FA]" : "text-[#3E2A33]"}`}
            >
              Standard collar
            </button>
            <button
              data-testid="toggle-harness"
              onClick={() => setMode("harness")}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${mode === "harness" ? "bg-[#3E2A33] text-[#FDF7FA]" : "text-[#3E2A33]"}`}
            >
              Devlin harness
            </button>
          </div>
          <PressureDiagram mode={mode} />
          <p className="mt-4 text-center text-sm text-[#5A6572]" data-testid="choke-free-caption">
            {mode === "harness"
              ? "Pressure spreads across the chest — the neck stays completely free."
              : "Every pull lands on one delicate point of the throat."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
