import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/api";

export default function ProductCard({ product, index = 0 }) {
  const { setQuickView } = useCart();
  const [frame, setFrame] = useState(0);
  const frames = [product.images.main, product.images.hover].filter(Boolean);
  const tag = product.tags?.includes("best_seller") ? "Best Seller" : product.tags?.includes("new_arrival") ? "New In" : null;

  useEffect(() => {
    if (frames.length < 2) return undefined;
    const id = setInterval(() => setFrame((f) => (f + 1) % frames.length), 1400);
    return () => clearInterval(id);
  }, [frames.length]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="group w-[270px] shrink-0 snap-start sm:w-[300px]"
      data-testid={`product-card-${product.slug}`}
    >
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-white">
        <Link to={`/product/${product.slug}`} data-testid={`product-link-${product.slug}`} aria-label={product.name}>
          {frames.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={i === 0 ? product.name : `${product.name} detail`}
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-contain p-5 transition-opacity duration-700 ease-in-out ${
                i === frame ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </Link>
        {tag && (
          <span
            data-testid={`product-tag-${product.slug}`}
            className="font-mono-accent absolute left-3 top-3 rounded-full bg-[#3E2A33] px-3 py-1 text-[10px] tracking-[0.15em] text-[#FDF7FA]"
          >
            {tag.toUpperCase()}
          </span>
        )}
        <button
          data-testid={`quick-view-${product.slug}`}
          onClick={() => setQuickView(product)}
          className="absolute inset-x-3 bottom-3 translate-y-3 rounded-full bg-[#FDF7FA]/95 py-2.5 text-sm font-semibold text-[#3E2A33] opacity-0 shadow-lg backdrop-blur transition-all duration-300 hover:bg-[#3E2A33] hover:text-[#FDF7FA] group-hover:translate-y-0 group-hover:opacity-100"
        >
          Quick view
        </button>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <Link to={`/product/${product.slug}`}>
            <h3 className="font-serif-display text-lg font-semibold leading-snug text-[#3E2A33] transition-colors hover:text-[#E6007E]">
              {product.name}
            </h3>
          </Link>
          <p className="font-mono-accent mt-1 text-[10px] tracking-[0.2em] text-[#5A6572]">{product.category.toUpperCase()}</p>
          <div className="mt-1.5 flex items-center gap-1 text-[#E6007E]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-3 w-3 ${i < Math.round(product.rating) ? "fill-current" : "opacity-30"}`} />
            ))}
            <span className="ml-1 text-xs text-[#5A6572]">({product.reviews})</span>
          </div>
        </div>
        <p className="font-serif-display text-lg font-bold text-[#3E2A33]" data-testid={`product-price-${product.slug}`}>
          {formatPrice(product.price_cents)}
        </p>
      </div>
    </motion.article>
  );
}
