import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/api";

export default function ProductCard({ product, index = 0 }) {
  const { setQuickView } = useCart();
  const tag = product.tags?.includes("best_seller") ? "Best Seller" : product.tags?.includes("new_arrival") ? "New In" : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="group w-[270px] shrink-0 snap-start sm:w-[300px]"
      data-testid={`product-card-${product.slug}`}
    >
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-[#F4EFEA]">
        <Link to={`/product/${product.slug}`} data-testid={`product-link-${product.slug}`} aria-label={product.name}>
          <img
            src={product.images.main}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          <img
            src={product.images.hover}
            alt={`${product.name} on a dog`}
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"
          />
        </Link>
        {tag && (
          <span
            data-testid={`product-tag-${product.slug}`}
            className="font-mono-accent absolute left-3 top-3 rounded-full bg-[#1C2A39] px-3 py-1 text-[10px] tracking-[0.15em] text-[#FDFBF7]"
          >
            {tag.toUpperCase()}
          </span>
        )}
        <button
          data-testid={`quick-view-${product.slug}`}
          onClick={() => setQuickView(product)}
          className="absolute inset-x-3 bottom-3 translate-y-3 rounded-full bg-[#FDFBF7]/95 py-2.5 text-sm font-semibold text-[#1C2A39] opacity-0 shadow-lg backdrop-blur transition-all duration-300 hover:bg-[#1C2A39] hover:text-[#FDFBF7] group-hover:translate-y-0 group-hover:opacity-100"
        >
          Quick view
        </button>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <Link to={`/product/${product.slug}`}>
            <h3 className="font-serif-display text-lg font-semibold leading-snug text-[#1C2A39] transition-colors hover:text-[#D96B43]">
              {product.name}
            </h3>
          </Link>
          <p className="font-mono-accent mt-1 text-[10px] tracking-[0.2em] text-[#5A6572]">{product.category.toUpperCase()}</p>
          <div className="mt-1.5 flex items-center gap-1 text-[#C8963E]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-3 w-3 ${i < Math.round(product.rating) ? "fill-current" : "opacity-30"}`} />
            ))}
            <span className="ml-1 text-xs text-[#5A6572]">({product.reviews})</span>
          </div>
        </div>
        <p className="font-serif-display text-lg font-bold text-[#1C2A39]" data-testid={`product-price-${product.slug}`}>
          {formatPrice(product.price_cents)}
        </p>
      </div>
    </motion.article>
  );
}
