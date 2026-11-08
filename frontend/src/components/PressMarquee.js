const PRESS = ["Pawprint Journal", "The Daily Wag", "Bark & Bloom", "City Pup Post", "Modern Hound", "The Velvet Leash"];

export default function PressMarquee() {
  const row = [...PRESS, ...PRESS];
  return (
    <section data-testid="press-marquee" className="bg-[#FF00B8] py-7 overflow-hidden">
      <p className="font-mono-accent mb-4 text-center text-[10px] font-bold tracking-[0.35em] text-white">AS FEATURED IN</p>
      <div className="relative">
        <div className="animate-marquee-press flex w-max items-center gap-14 pr-14">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className={`whitespace-nowrap text-lg text-white ${i % 2 === 0 ? "font-serif-display italic" : "font-mono-accent text-sm font-bold tracking-[0.2em]"}`}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
