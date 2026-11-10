import { motion } from "framer-motion";
import { ShoppingBag, Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Sarah Mitchell",
    pet: "Bella · Toy Poodle",
    time: "2 weeks ago",
    product: "The Paw Parade Walking Vest",
    quote:
      "Our vet suggested a choke-free harness and this vest changed our walks completely. Bella used to cough after every outing — that stopped the very first day. The cotton is even prettier in person.",
    photos: ["/images/reviews/r1.webp"],
    color: "#7B1FA2",
  },
  {
    name: "Megan Torres",
    pet: "Oliver · Terrier Mix",
    time: "a month ago",
    product: "The Fresh Meadow Step-In Harness",
    quote:
      "The print is so sharp we get stopped at the dog park every single time. Stepping into it takes seconds, and the stitching has held up to daily walks and a very enthusiastic puller.",
    photos: ["/images/reviews/r2.webp"],
    color: "#1565C0",
  },
  {
    name: "Daniel Okafor",
    pet: "Coco · Chihuahua",
    time: "3 weeks ago",
    product: "The Highlands Walking Vest",
    quote:
      "On in one motion, off just as fast, and my little pup actually leans in to have it put on. Worth every penny — you can feel the handcrafting the moment you pick it up.",
    photos: ["/images/reviews/r3.webp"],
    color: "#2E7D32",
  },
  {
    name: "Priya Raman",
    pet: "Mochi · Dachshund",
    time: "2 months ago",
    product: "The Highlands Walking Vest",
    quote:
      "Mochi is long and broad-chested, so fit is always a gamble — the size guide was spot on. We get compliments from complete strangers at the farmers market.",
    photos: ["/images/reviews/r4.webp"],
    color: "#C62828",
  },
  {
    name: "Ruth Callahan",
    pet: "Winston · Maltese",
    time: "a month ago",
    product: "The Paw Parade Designer Collar",
    quote:
      "The hardware feels substantial, and the cotton hasn't faded after months of wear. Winston basically models for the neighborhood now.",
    photos: ["/images/reviews/r5.webp"],
    color: "#E65100",
  },
  {
    name: "Elena Vasquez",
    pet: "Fig · Shih Tzu",
    time: "3 months ago",
    product: "The Coastal Stripe Leash",
    quote:
      "Light in the hand, soft on the grip, and the stripe matches Fig's whole set. The clasp swivels so smoothly — no more tangled leash mid-walk.",
    photos: ["/images/reviews/r6.webp"],
    color: "#00838F",
  },
];

function GoogleReviewCard({ review, index }) {
  return (
    <article
      className="font-google w-[320px] shrink-0 rounded-xl border border-[#dadce0] bg-white p-4 shadow-sm sm:w-[360px]"
      data-testid={`review-card-${index}`}
    >
      <div className="flex items-center gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-medium text-white"
          style={{ backgroundColor: review.color }}
          data-testid={`review-avatar-${index}`}
        >
          {review.name[0]}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium leading-tight text-[#202124]">{review.name}</p>
          <p className="truncate text-xs leading-tight text-[#70757a]">{review.pet}</p>
        </div>
      </div>
      <div className="mt-2.5 flex items-center gap-2">
        <div className="flex gap-0.5 text-[#FBBC04]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-current" />
          ))}
        </div>
        <span className="text-xs text-[#70757a]">{review.time}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-[#202124]">{review.quote}</p>
      {review.photos.length > 0 && (
        <div className="mt-3 flex gap-2" data-testid={`review-photos-${index}`}>
          {review.photos.map((src) => (
            <img
              key={src}
              src={src}
              alt={`Photo shared by ${review.name}`}
              loading="lazy"
              className="h-20 w-20 rounded-lg object-cover"
            />
          ))}
        </div>
      )}
      <p className="mt-3 flex items-center gap-1.5 border-t border-[#f1f3f4] pt-2.5 text-xs text-[#70757a]">
        <ShoppingBag className="h-3 w-3" />
        Purchased: {review.product}
      </p>
    </article>
  );
}

export default function Testimonials() {
  const doubled = [...REVIEWS, ...REVIEWS];

  return (
    <section data-testid="testimonials" className="overflow-hidden bg-[#FBEEF4] py-20 lg:py-24">
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
            className="flex items-center gap-4 rounded-2xl border border-[#dadce0] bg-white px-6 py-4 shadow-sm"
            data-testid="reviews-summary"
          >
            <span className="font-google text-4xl font-medium text-[#202124]">4.9</span>
            <div>
              <div className="flex gap-0.5 text-[#FBBC04]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="font-google mt-1 text-xs text-[#70757a]">Based on 127 reviews</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="reviews-glide-wrap" data-testid="reviews-glide">
        <div className="animate-reviews-glide flex w-max gap-4 px-4">
          {doubled.map((review, i) => (
            <GoogleReviewCard key={`${review.name}-${i}`} review={review} index={i % REVIEWS.length} />
          ))}
        </div>
      </div>
      <p className="font-google mt-6 text-center text-xs text-[#70757a]">Hover to pause and read</p>
    </section>
  );
}
