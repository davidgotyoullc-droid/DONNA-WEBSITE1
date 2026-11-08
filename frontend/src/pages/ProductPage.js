import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, Star } from "lucide-react";
import { toast } from "sonner";
import { api, formatPrice } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";

export default function ProductPage() {
  const { slug } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [all, setAll] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [activeImage, setActiveImage] = useState("main");
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setNotFound(false);
    setProduct(null);
    setActiveImage("main");
    setQty(1);
    api
      .get(`/products/${slug}`)
      .then(({ data }) => {
        setProduct(data);
        setSize(data.sizes.includes("M") ? "M" : data.sizes[0]);
      })
      .catch(() => setNotFound(true));
    api.get("/products").then(({ data }) => setAll(data)).catch(() => {});
  }, [slug]);

  const related = useMemo(
    () => all.filter((p) => p.slug !== slug).slice(0, 4),
    [all, slug],
  );

  if (notFound) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-32 text-center" data-testid="product-not-found">
        <h1 className="font-serif-display text-3xl text-[#3E2A33]">This piece has wandered off</h1>
        <Link to="/shop" className="mt-6 inline-block rounded-full bg-[#3E2A33] px-7 py-3 text-sm font-semibold text-[#FDF7FA]">
          Back to the collection
        </Link>
      </main>
    );
  }

  if (!product) {
    return <main className="mx-auto max-w-7xl px-4 py-32 text-center text-[#5A6572]" data-testid="product-loading">Unfolding the tissue paper…</main>;
  }

  const add = () => {
    addItem(product, size, qty);
    toast.success(`${product.name} added to your bag`);
  };

  return (
    <main data-testid="product-page" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-16">
      <Link to="/shop" data-testid="product-back-link" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#5A6572] transition-colors hover:text-[#E6007E]">
        <ArrowLeft className="h-4 w-4" /> Back to the collection
      </Link>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="overflow-hidden rounded-[2rem] bg-[#FBEEF4]" data-testid="product-gallery">
            <motion.img
              key={activeImage}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              src={product.images[activeImage]}
              alt={product.name}
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="mt-4 flex gap-3">
            {["main", "hover"].map((key) => (
              <button
                key={key}
                data-testid={`product-thumb-${key}`}
                onClick={() => setActiveImage(key)}
                className={`w-20 overflow-hidden rounded-2xl border-2 transition-colors ${activeImage === key ? "border-[#E6007E]" : "border-transparent"}`}
              >
                <img src={product.images[key]} alt="" className="aspect-square w-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <p className="font-mono-accent text-[10px] tracking-[0.25em] text-[#E6007E]">{product.category.toUpperCase()}</p>
          <h1 className="font-serif-display mt-2 text-3xl font-semibold tracking-tight text-[#3E2A33] sm:text-4xl" data-testid="product-name">
            {product.name}
          </h1>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex gap-0.5 text-[#E6007E]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-current" : "opacity-30"}`} />
              ))}
            </div>
            <span className="text-sm text-[#5A6572]">{product.rating.toFixed(1)} · {product.reviews} reviews</span>
          </div>
          <p className="font-serif-display mt-4 text-2xl font-bold text-[#3E2A33]" data-testid="product-price">
            {formatPrice(product.price_cents)}
          </p>
          <p className="mt-5 text-base leading-relaxed text-[#5A6572]">{product.description}</p>
          <p className="font-mono-accent mt-3 text-xs tracking-[0.15em] text-[#7D8F4E]">{product.pattern.toUpperCase()}</p>

          {product.sizes.length > 1 && (
            <>
              <p className="font-mono-accent mt-8 text-[10px] tracking-[0.25em] text-[#5A6572]">SIZE</p>
              <div className="mt-2 flex flex-wrap gap-2" data-testid="product-sizes">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    data-testid={`product-size-${s.toLowerCase()}`}
                    onClick={() => setSize(s)}
                    className={`h-11 min-w-11 rounded-full border px-4 text-sm font-semibold transition-colors ${
                      size === s ? "border-[#3E2A33] bg-[#3E2A33] text-[#FDF7FA]" : "border-[#3E2A33]/20 text-[#3E2A33] hover:border-[#E6007E]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center rounded-full border border-[#3E2A33]/20">
              <button data-testid="product-qty-minus" onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-12 w-12 items-center justify-center text-[#3E2A33]" aria-label="Decrease quantity">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-sm font-bold" data-testid="product-qty">{qty}</span>
              <button data-testid="product-qty-plus" onClick={() => setQty((q) => Math.min(20, q + 1))} className="flex h-12 w-12 items-center justify-center text-[#3E2A33]" aria-label="Increase quantity">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              data-testid="product-add-to-cart"
              onClick={add}
              className="flex-1 rounded-full bg-[#E6007E] py-4 text-sm font-semibold text-[#FDF7FA] transition-colors hover:bg-[#3E2A33]"
            >
              Add to bag — {formatPrice(product.price_cents * qty)}
            </button>
          </div>

          <div className="mt-10 border-t border-[#3E2A33]/10 pt-6" data-testid="product-details">
            <p className="font-mono-accent mb-4 text-[10px] tracking-[0.25em] text-[#5A6572]">THE DETAILS</p>
            <ul className="space-y-2.5">
              {product.details.map((d) => (
                <li key={d} className="flex items-start gap-3 text-sm text-[#5A6572]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E6007E]" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {related.length > 0 && (
        <section className="mt-24" data-testid="related-products">
          <h2 className="font-serif-display mb-10 text-2xl font-semibold tracking-tight text-[#3E2A33] sm:text-3xl">
            Complete the set
          </h2>
          <div className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 py-2 sm:-mx-6 sm:px-6">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
