import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BadgeCheck, Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Sarah Mitchell",
    pet: "Bella · Toy Poodle",
    time: "2 weeks ago",
    product: "The Garden Party Walking Vest",
    quote:
      "Our vet suggested a choke-free harness and this vest changed our walks completely. Bella used to cough after every outing — that stopped the very first day. The floral cotton is even prettier in person.",
    photos: ["/images/reviews/r1.webp"],
    color: "#7B1FA2",
  },
  {
    name: "Megan Torres",
    pet: "Oliver · Terrier Mix",
    time: "a month ago",
    product: "The Scotland Yard Step-In Harness",
    quote:
      "The plaid is so sharp we get stopped at the dog park every single time. Stepping into it takes seconds, and the stitching has held up to daily walks and a very enthusiastic puller.",
    photos: ["/images/reviews/r2.webp"],
    color: "#1565C0",
  },
  {
    name: "Daniel Okafor",
    pet: "Coco · Chihuahua",
    time: "3 weeks ago",
    product: "The Polka Wisp Step-In Harness",
    quote:
      "On in one motion, off just as fast, and my little pup actually leans in to have it put on. Worth every penny — you can feel the handcrafting the moment you pick it up.",
    photos: ["/images/reviews/r3.webp"],
    color: "#2E7D32",
  },
  {
    name: "Priya Raman",
    pet: "Mochi · Dachshund",
    time: "2 months ago",
    product: "The Cherry Picnic Walking Vest",
    quote:
      "Mochi is long and broad-chested, so fit is always a gamble — the size guide was spot on. The cherry gingham gets compliments from complete strangers at the farmers market.",
    photos: ["/images/reviews/r4.webp"],
    color: "#C62828",
  },
  {
    name: "Ruth Callahan",
    pet: "Winston · Maltese",
    time: "a month ago",
    product: "The Daisy Chain Designer Collar",
    quote:
      "The little bow is removable, the brass hardware feels substantial, and the cotton hasn't faded after months of wear. Winston basically models for the neighborhood now.",
    photos: ["/images/reviews/r5.webp"],
    color: "#E65100",
  },
  {
    name: "Elena Vasquez",
    pet: "Fig · Shih Tzu",
    time: "3 months ago",
    product: "The Coastal Stripe Leash",
    quote:
      "Light in the hand, soft on the grip, and the sage stripe matches Fig's whole set. The clasp swivels so smoothly — no more tangled leash mid-walk.",
    photos: ["/images/reviews/r6.webp"],
    color: "#00838F",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % REVIEWS.length), 7000);
    return () => clearInterval(id);
  }, [paused]);

  const review = REVIEWS[index];
  const go = (dir) => setIndex((i) => (i + dir + REVIEWS.length) % REVIEWS.length);

  return (
    <section data-testid="testimonials" className="bg-[#FBEEF4] py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-mono-accent mb-3 text-xs tracking-[0.3em] text-[#E6007E]">WALKED &amp; LOVED</p>
            <h2 className="font-serif-display text-3xl font-semibold tracking-tight text-[#3E2A33] sm:text-4xl">
              Loved by dogs &amp; their humans
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center gap-4 rounded-2xl border border-[#3E2A33]/10 bg-white px-6 py-4 shadow-sm"
            data-testid="reviews-summary"
          >
            <span className="font-serif-display text-4xl font-bold text-[#3E2A33]">4.9</span>
            <div>
              <div className="flex gap-0.5 text-[#FBBC04]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-1 text-xs text-[#5A6572]">Based on 127 verified reviews</p>
            </div>
          </motion.div>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          data-testid="reviews-slider"
        >
          <div className="mx-auto max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.article
                key={index}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="rounded-3xl border border-[#3E2A33]/10 bg-white p-6 shadow-sm sm:p-8"
                data-testid={`review-card-${index}`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-semibold text-white"
                    style={{ backgroundColor: review.color }}
                    data-testid={`review-avatar-${index}`}
                  >
                    {review.name[0]}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[#3E2A33]">{review.name}</p>
                    <p className="text-xs text-[#5A6572]">
                      {review.pet} · {review.time}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <div className="flex gap-0.5 text-[#FBBC04]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-xs font-medium text-[#5A6572]">
                    <BadgeCheck className="h-3.5 w-3.5 text-[#7D8F4E]" />
                    Verified purchase
                  </span>
                </div>

                <p className="mt-4 text-base leading-relaxed text-[#3A4654]">{review.quote}</p>

                <div className="mt-5 flex flex-wrap gap-3" data-testid={`review-photos-${index}`}>
                  {review.photos.map((src) => (
                    <img
                      key={src}
                      src={src}
                      alt={`${review.product} purchased by ${review.name}`}
                      loading="lazy"
                      className="h-20 w-20 rounded-xl border border-[#3E2A33]/10 object-cover sm:h-24 sm:w-24"
                    />
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[#3E2A33]/5 pt-4">
                  <p className="font-mono-accent text-[10px] tracking-[0.15em] text-[#5A6572]">
                    PURCHASED: {review.product.toUpperCase()}
                  </p>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              data-testid="reviews-prev"
              onClick={() => go(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#3E2A33]/15 text-[#3E2A33] transition-colors hover:border-[#E6007E] hover:text-[#E6007E]"
              aria-label="Previous review"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2" data-testid="reviews-dots">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  data-testid={`review-dot-${i}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-[width,background-color] duration-300 ${i === index ? "w-7 bg-[#E6007E]" : "w-2 bg-[#3E2A33]/20"}`}
                  aria-label={`Review ${i + 1}`}
                />
              ))}
            </div>
            <button
              data-testid="reviews-next"
              onClick={() => go(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#3E2A33]/15 text-[#3E2A33] transition-colors hover:border-[#E6007E] hover:text-[#E6007E]"
              aria-label="Next review"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
