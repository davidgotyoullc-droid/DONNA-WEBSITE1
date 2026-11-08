import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Crown, Dog, Ruler, Shirt } from "lucide-react";

const TABS = [
  {
    id: "collars",
    label: "Collars",
    icon: Crown,
    intro: "Measure the neck, then add comfort room for everyday wear.",
    tips: [
      "Measure the circumference of your dog's neck and add about 2 inches.",
      "You should be able to slip two fingers comfortably between collar and neck.",
      "Use a soft tape measure — or a piece of string and a ruler.",
      "Make sure your dog is standing when you measure.",
      "For broad chests or thick coats, order one size larger.",
      "Between sizes? Always choose the next size up.",
    ],
    columns: ["Collar Size", "Neck Size"],
    rows: [
      ["XS", "7–11″"],
      ["S", "10–15″"],
      ["M", "12–19″"],
      ["L", "15–24″"],
      ["XL", "17–29″"],
    ],
    note: "If your dog sits at the upper end of a range, we suggest the larger size.",
    shopTo: "/shop?category=Designer%20Collars",
    shopLabel: "Shop collars",
  },
  {
    id: "leashes",
    label: "Leashes",
    icon: Dog,
    intro: "Match the width and weight of the lead to your dog's size and strength.",
    tips: [
      "Smaller dogs are usually happiest with lighter, narrower leashes.",
      "Larger or stronger dogs benefit from wider, sturdier styles.",
      "Our standard leashes are 5 feet — freedom to explore, control when you need it.",
      "Match your leash to the collar and vest for a complete coordinated set.",
    ],
    columns: ["Size", "Length", "Width"],
    rows: [
      ["S", "5′", "5/8″"],
      ["L", "5′", "1″"],
    ],
    note: "One length, two widths — choose by your dog's size and strength.",
    shopTo: "/shop?category=Matching%20Leashes",
    shopLabel: "Shop leashes",
  },
  {
    id: "vests",
    label: "Walking Vests",
    icon: Shirt,
    intro: "Measure both the neck and the fullest part of the chest.",
    tips: [
      "Measure comfortably around the neck and the fullest part of the chest.",
      "Use a soft tape measure — or a piece of string and a ruler.",
      "Make sure your dog is standing when you measure.",
      "Broad-chested dogs or thick coats: consider one size larger.",
      "Between sizes? Choose the next size up.",
    ],
    columns: ["Size", "Girth", "Neck"],
    rows: [
      ["MINI", "10–12″", "6–8″"],
      ["XS", "12–14″", "7–8″"],
      ["S", "13–15″", "9–10″"],
      ["M", "16–18″", "12–13″"],
      ["L", "19–22″", "14–15″"],
    ],
    note: "A well-fitted vest should be snug but never tight, with room to move freely.",
    shopTo: "/shop?category=Walking%20Vests",
    shopLabel: "Shop walking vests",
  },
  {
    id: "harnesses",
    label: "Step-In Harness",
    icon: Ruler,
    intro: "Chest girth is the measurement that matters most here.",
    tips: [
      "Measure chest girth all the way around the broadest part of the chest, just behind the front legs.",
      "Use a soft tape measure — or a piece of string and a ruler.",
      "Make sure your pet is standing upright.",
      "Between sizes? Order the next size up.",
    ],
    columns: ["Size", "Girth", "Strap Width"],
    rows: [
      ["XS", "9–15″", "1/2″"],
      ["S", "14–21″", "5/8″"],
      ["M", "17–24″", "3/4″"],
      ["L", "22–30″", "1″"],
    ],
    note: "The right girth keeps the harness secure, comfortable and truly choke-free.",
    shopTo: "/shop?category=Step-In%20Harnesses",
    shopLabel: "Shop harnesses",
  },
];

export default function FittingRoomPage() {
  const [active, setActive] = useState(TABS[0]);

  return (
    <main data-testid="fitting-room-page" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-10 max-w-2xl">
        <p className="font-mono-accent mb-3 text-xs tracking-[0.3em] text-[#E6007E]">FITTING ROOM</p>
        <h1 className="font-serif-display text-4xl font-semibold tracking-tight text-[#3E2A33] sm:text-5xl">
          Find your dog's perfect fit
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#5A6572] sm:text-lg">
          There are no standard sizes in pet wear, so a careful measurement is everything. Pick what
          you're sizing below, measure with your dog standing, and we'll get the fit right the first time.
        </p>
      </motion.div>

      <div className="mb-10 flex flex-wrap gap-2" data-testid="fitting-room-tabs">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              data-testid={`fitting-tab-${tab.id}`}
              onClick={() => setActive(tab)}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
                active.id === tab.id
                  ? "border-[#3E2A33] bg-[#3E2A33] text-[#FDF7FA]"
                  : "border-[#3E2A33]/20 text-[#3E2A33] hover:border-[#E6007E] hover:text-[#E6007E]"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <motion.div
        key={active.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 gap-10 lg:grid-cols-2"
        data-testid={`fitting-panel-${active.id}`}
      >
        <div>
          <h2 className="font-serif-display text-2xl font-semibold text-[#3E2A33]">{active.intro}</h2>
          <ul className="mt-6 space-y-3.5">
            {active.tips.map((tip) => (
              <li key={tip} className="flex items-start gap-3 text-sm leading-relaxed text-[#5A6572]">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E6007E]" />
                {tip}
              </li>
            ))}
          </ul>
          <Link
            to={active.shopTo}
            data-testid={`fitting-shop-${active.id}`}
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#3E2A33] px-7 py-3.5 text-sm font-semibold text-[#FDF7FA] transition-colors hover:bg-[#E6007E]"
          >
            {active.shopLabel}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="h-fit overflow-x-auto rounded-3xl border border-[#3E2A33]/10 bg-white shadow-sm">
          <table className="w-full min-w-[420px] text-sm" data-testid={`fitting-table-${active.id}`}>
            <thead>
              <tr className="bg-[#3E2A33] text-left text-[#FDF7FA]">
                {active.columns.map((col) => (
                  <th key={col} className="font-mono-accent px-6 py-4 text-[10px] font-bold tracking-[0.2em]">
                    {col.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {active.rows.map((row) => (
                <tr key={row[0]} className="border-t border-[#3E2A33]/5">
                  {row.map((cell, i) => (
                    <td key={cell} className={`px-6 py-3.5 ${i === 0 ? "font-serif-display font-bold text-[#3E2A33]" : "text-[#5A6572]"}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="border-t border-[#3E2A33]/10 bg-[#FBEEF4] px-6 py-4 text-xs leading-relaxed text-[#5A6572]">{active.note}</p>
        </div>
      </motion.div>
    </main>
  );
}
