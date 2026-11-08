import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/api";

export default function QuickViewModal() {
  const { quickView, setQuickView, addItem } = useCart();
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (quickView) {
      setSize(quickView.sizes.includes("M") ? "M" : quickView.sizes[0]);
      setQty(1);
    }
  }, [quickView]);

  const close = () => setQuickView(null);

  const add = () => {
    addItem(quickView, size, qty);
    toast.success(`${quickView.name} added to your bag`);
    close();
  };

  return (
    <AnimatePresence>
      {quickView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#3E2A33]/40 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={close}
          data-testid="quick-view-modal"
        >
          <motion.div
            initial={{ scale: 0.95, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.97, y: 12, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="grid max-h-[92vh] w-full max-w-3xl grid-cols-1 overflow-y-auto rounded-t-3xl bg-[#FDF7FA] sm:grid-cols-2 sm:rounded-3xl"
          >
            <div className="relative aspect-square bg-[#FBEEF4]">
              <img src={quickView.images.main} alt={quickView.name} className="h-full w-full object-cover" />
              <button
                data-testid="quick-view-close"
                onClick={close}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#FDF7FA] text-[#3E2A33] shadow-md transition-colors hover:bg-[#3E2A33] hover:text-[#FDF7FA] sm:hidden"
                aria-label="Close quick view"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="relative flex flex-col p-6 sm:p-8">
              <button
                data-testid="quick-view-close-desktop"
                onClick={close}
                className="absolute right-5 top-5 hidden h-10 w-10 items-center justify-center rounded-full border border-[#3E2A33]/10 text-[#3E2A33] transition-colors hover:bg-[#3E2A33] hover:text-[#FDF7FA] sm:flex"
                aria-label="Close quick view"
              >
                <X className="h-4 w-4" />
              </button>
              <p className="font-mono-accent text-[10px] tracking-[0.25em] text-[#E6007E]">{quickView.category.toUpperCase()}</p>
              <h3 className="font-serif-display mt-2 pr-10 text-2xl font-semibold text-[#3E2A33]">{quickView.name}</h3>
              <p className="font-serif-display mt-2 text-xl font-bold text-[#3E2A33]" data-testid="quick-view-price">
                {formatPrice(quickView.price_cents)}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#5A6572]">{quickView.description}</p>

              <p className="font-mono-accent mt-6 text-[10px] tracking-[0.25em] text-[#5A6572]">SIZE</p>
              <div className="mt-2 flex flex-wrap gap-2" data-testid="quick-view-sizes">
                {quickView.sizes.map((s) => (
                  <button
                    key={s}
                    data-testid={`quick-view-size-${s.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => setSize(s)}
                    className={`h-10 min-w-10 rounded-full border px-3 text-sm font-semibold transition-colors ${
                      size === s
                        ? "border-[#3E2A33] bg-[#3E2A33] text-[#FDF7FA]"
                        : "border-[#3E2A33]/20 text-[#3E2A33] hover:border-[#E6007E]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center rounded-full border border-[#3E2A33]/20">
                  <button data-testid="quick-view-qty-minus" onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-11 w-11 items-center justify-center text-[#3E2A33]" aria-label="Decrease quantity">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold" data-testid="quick-view-qty">{qty}</span>
                  <button data-testid="quick-view-qty-plus" onClick={() => setQty((q) => Math.min(20, q + 1))} className="flex h-11 w-11 items-center justify-center text-[#3E2A33]" aria-label="Increase quantity">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  data-testid="quick-view-add-to-cart"
                  onClick={add}
                  className="flex-1 rounded-full bg-[#E6007E] py-3.5 text-sm font-semibold text-[#FDF7FA] transition-colors hover:bg-[#3E2A33]"
                >
                  Add to bag
                </button>
              </div>

              <Link
                to={`/product/${quickView.slug}`}
                onClick={close}
                data-testid="quick-view-full-details"
                className="mt-5 text-center text-sm font-semibold text-[#3E2A33] underline decoration-[#E6007E] decoration-2 underline-offset-4 transition-colors hover:text-[#E6007E]"
              >
                View full details
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
