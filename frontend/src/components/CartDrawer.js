import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { api, formatPrice } from "@/lib/api";

const FREE_SHIPPING_CENTS = 7500;

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, subtotal } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);

  const progress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_CENTS) * 100));
  const remaining = FREE_SHIPPING_CENTS - subtotal;

  const checkout = async () => {
    setCheckingOut(true);
    try {
      const { data } = await api.post("/payments/checkout", {
        items: items.map((i) => ({ slug: i.slug, size: i.size, quantity: i.quantity })),
        origin_url: window.location.origin,
      });
      window.location.href = data.checkout_url;
    } catch (err) {
      if (err?.response?.status === 503) {
        toast.error("Online checkout is being stitched up — send us an enquiry below and we'll complete your order personally.");
      } else {
        toast.error("Checkout couldn't start — please try again.");
      }
      setCheckingOut(false);
    }
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent
        side="right"
        data-testid="cart-drawer"
        className="flex w-full flex-col border-l border-[#3E2A33]/10 bg-[#FDF7FA] p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-[#3E2A33]/10 px-6 py-5">
          <SheetTitle className="font-serif-display text-xl text-[#3E2A33]">Your bag</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-serif-display text-xl text-[#3E2A33]">Your bag is empty</p>
            <p className="text-sm text-[#5A6572]">Every walk deserves a little ceremony.</p>
            <Link
              to="/shop"
              onClick={() => setIsCartOpen(false)}
              data-testid="cart-start-shopping"
              className="rounded-full bg-[#3E2A33] px-7 py-3 text-sm font-semibold text-[#FDF7FA] transition-colors hover:bg-[#E6007E]"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="border-b border-[#3E2A33]/10 px-6 py-4">
              <p className="mb-2 text-xs text-[#5A6572]" data-testid="shipping-progress-label">
                {remaining > 0 ? (
                  <>You're <strong className="text-[#E6007E]">{formatPrice(remaining)}</strong> from free US shipping</>
                ) : (
                  <span className="font-semibold text-[#7D8F4E]">Free US shipping unlocked</span>
                )}
              </p>
              <div className="h-1.5 overflow-hidden rounded-full bg-[#3E2A33]/10">
                <div
                  data-testid="shipping-progress-bar"
                  className="h-full rounded-full bg-[#E6007E] transition-[width] duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.map((item) => (
                <div key={item.key} className="flex gap-4 border-b border-[#3E2A33]/5 py-4" data-testid={`cart-item-${item.key}`}>
                  <img src={item.image} alt={item.name} className="h-20 w-20 rounded-2xl object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-serif-display text-sm font-semibold leading-snug text-[#3E2A33]">{item.name}</p>
                        <p className="font-mono-accent mt-0.5 text-[10px] tracking-[0.2em] text-[#5A6572]">SIZE {item.size.toUpperCase()}</p>
                      </div>
                      <button
                        data-testid={`cart-remove-${item.key}`}
                        onClick={() => removeItem(item.key)}
                        className="text-[#5A6572] transition-colors hover:text-[#E6007E]"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-[#3E2A33]/15">
                        <button
                          data-testid={`cart-qty-minus-${item.key}`}
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center text-[#3E2A33]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold" data-testid={`cart-qty-${item.key}`}>{item.quantity}</span>
                        <button
                          data-testid={`cart-qty-plus-${item.key}`}
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center text-[#3E2A33]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="text-sm font-bold text-[#3E2A33]">{formatPrice(item.price_cents * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#3E2A33]/10 px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-[#5A6572]">Subtotal</span>
                <span className="font-serif-display text-xl font-bold text-[#3E2A33]" data-testid="cart-subtotal">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <button
                data-testid="checkout-button"
                onClick={checkout}
                disabled={checkingOut}
                className="w-full rounded-full bg-[#E6007E] py-4 text-sm font-semibold text-[#FDF7FA] transition-colors hover:bg-[#3E2A33] disabled:opacity-60"
              >
                {checkingOut ? "Preparing checkout…" : "Checkout securely"}
              </button>
              <p className="mt-3 text-center text-[11px] text-[#5A6572]">Taxes and shipping calculated at checkout</p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
