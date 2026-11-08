import { X } from "lucide-react";

export default function PromoPanel({ promo, onClose, preview = false }) {
  return (
    <div
      className="grid overflow-hidden rounded-3xl bg-white shadow-2xl shadow-[#3E2A33]/30 sm:grid-cols-2"
      role="dialog"
      aria-modal="true"
      aria-label={promo.headline}
      data-testid={preview ? "promo-preview-panel" : "promo-panel"}
    >
      {promo.image_url ? (
        <div className="relative h-44 sm:h-auto">
          <img src={promo.image_url} alt="" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      ) : null}
      <div className="relative flex flex-col p-6 sm:p-8">
        {onClose && (
          <button
            onClick={onClose}
            data-testid="promo-close"
            aria-label="Close promotion"
            autoFocus={!preview}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#3E2A33]/10 text-[#3E2A33] transition-colors hover:bg-[#3E2A33] hover:text-[#FDF7FA]"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <p className="font-mono-accent text-[10px] font-bold tracking-[0.3em] text-[#E6007E]">FROM THE STUDIO</p>
        <h3 className="font-serif-display mt-3 pr-8 text-2xl font-semibold leading-snug text-[#3E2A33]" data-testid="promo-headline">
          {promo.headline}
        </h3>
        {promo.description && (
          <p className="mt-3 text-sm leading-relaxed text-[#5A6572]" data-testid="promo-description">
            {promo.description}
          </p>
        )}
        {promo.coupon_code && (
          <p className="mt-4" data-testid="promo-coupon">
            <span className="font-mono-accent inline-block rounded-full border border-dashed border-[#E6007E] bg-[#E6007E]/5 px-4 py-2 text-xs font-bold tracking-[0.2em] text-[#E6007E]">
              CODE: {promo.coupon_code}
            </span>
          </p>
        )}
        <a
          href={preview ? undefined : promo.cta_link}
          data-testid="promo-cta"
          className="mt-6 inline-block w-fit rounded-full bg-[#E6007E] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#3E2A33]"
        >
          {promo.cta_text}
        </a>
      </div>
    </div>
  );
}
