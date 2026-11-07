import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { api } from "@/lib/api";
import { useCart } from "@/context/CartContext";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const { clearCart } = useCart();
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    if (!sessionId) {
      setStatus("unknown");
      return;
    }
    let attempts = 0;
    const poll = async () => {
      try {
        const { data } = await api.get(`/payments/status/${sessionId}`);
        if (data.payment_status === "paid") {
          setStatus("paid");
          clearCart();
          return;
        }
      } catch {
        /* keep polling */
      }
      attempts += 1;
      if (attempts < 8) {
        setTimeout(poll, 2000);
      } else {
        setStatus("pending");
      }
    };
    poll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  return (
    <main data-testid="payment-success-page" className="mx-auto flex max-w-2xl flex-col items-center px-4 py-32 text-center">
      <CheckCircle2 className="h-16 w-16 text-[#8A9A86]" />
      <h1 className="font-serif-display mt-6 text-3xl font-semibold text-[#1C2A39] sm:text-4xl">
        {status === "paid" ? "Thank you — order received" : status === "checking" ? "Confirming your order…" : "Order received"}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-[#5A6572]">
        {status === "paid"
          ? "Your pieces go onto the worktable next. We'll write with tracking as soon as your parcel is on its way."
          : status === "checking"
            ? "One moment while we confirm your payment…"
            : "Your payment is still confirming — if you were charged, your order is safe and we'll be in touch shortly."}
      </p>
      <Link
        to="/shop"
        data-testid="payment-success-continue"
        className="mt-8 rounded-full bg-[#1C2A39] px-8 py-3.5 text-sm font-semibold text-[#FDFBF7] transition-colors hover:bg-[#D96B43]"
      >
        Continue browsing
      </Link>
    </main>
  );
}
