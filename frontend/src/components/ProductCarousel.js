import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";

export default function ProductCarousel({ id, title, eyebrow, products, shopAllTo = "/shop" }) {
  const trackRef = useRef(null);

  const scroll = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  if (!products?.length) return null;

  return (
    <section id={id} data-testid={`carousel-${id}`} className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="font-mono-accent mb-3 text-xs tracking-[0.3em] text-[#D96B43]">{eyebrow}</p>
          <h2 className="font-serif-display text-3xl font-semibold tracking-tight text-[#1C2A39] sm:text-4xl">{title}</h2>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to={shopAllTo}
            data-testid={`carousel-${id}-shop-all`}
            className="hidden text-sm font-semibold text-[#1C2A39] underline decoration-[#D96B43] decoration-2 underline-offset-4 transition-colors hover:text-[#D96B43] sm:block"
          >
            Shop all
          </Link>
          <button
            data-testid={`carousel-${id}-prev`}
            onClick={() => scroll(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1C2A39]/15 text-[#1C2A39] transition-colors hover:border-[#D96B43] hover:text-[#D96B43]"
            aria-label="Previous products"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            data-testid={`carousel-${id}-next`}
            onClick={() => scroll(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1C2A39]/15 text-[#1C2A39] transition-colors hover:border-[#D96B43] hover:text-[#D96B43]"
            aria-label="Next products"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div ref={trackRef} className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 py-2 sm:-mx-6 sm:px-6">
        {products.map((product, i) => (
          <ProductCard key={product.slug} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}
