import { PawPrint } from "lucide-react";

const PILLARS = [
  "Choke-Free Design",
  "Handcrafted in the USA",
  "Soft 100% Cotton",
  "Whimsical Prints",
  "Dual D-Ring Security",
  "Made for Delicate Necks",
];

export default function EditorialMarquee() {
  const row = [...PILLARS, ...PILLARS];
  return (
    <div data-testid="editorial-marquee" className="overflow-hidden bg-[#7D8F4E] py-4">
      <div className="animate-marquee-slow flex w-max items-center gap-10 pr-10">
        {row.map((pillar, i) => (
          <span key={`${pillar}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-serif-display text-xl italic text-[#FDF7FA] sm:text-2xl">{pillar}</span>
            <PawPrint className="h-4 w-4 text-[#E6007E]" />
          </span>
        ))}
      </div>
    </div>
  );
}
