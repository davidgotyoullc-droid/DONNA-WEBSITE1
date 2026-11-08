import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PaymentCancel() {
  return (
    <main data-testid="payment-cancel-page" className="mx-auto flex max-w-2xl flex-col items-center px-4 py-32 text-center">
      <h1 className="font-serif-display text-3xl font-semibold text-[#3E2A33] sm:text-4xl">Checkout paused</h1>
      <p className="mt-4 text-base leading-relaxed text-[#5A6572]">
        No charge was made and your bag is still saved — pick up right where you left off whenever you're ready.
      </p>
      <Link
        to="/shop"
        data-testid="payment-cancel-back"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#3E2A33] px-8 py-3.5 text-sm font-semibold text-[#FDF7FA] transition-colors hover:bg-[#E6007E]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to the collection
      </Link>
    </main>
  );
}
