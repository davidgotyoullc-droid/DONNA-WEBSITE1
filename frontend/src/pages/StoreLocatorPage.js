import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, Store } from "lucide-react";

const REGIONS = [
  {
    city: "Naples, FL",
    stores: [
      { name: "Naples Dog Center", address: "630 Tamiami Trail N, Naples, FL 34102", phone: "+12395303647" },
      { name: "Posh Paws — Alexander Buildings", address: "4077 Tamiami Trail N #D103, Naples, FL 34103", phone: "+12392766600" },
      { name: "Paw-Paw Patch Pet Grooming — Marquesa Plaza", address: "13020 Livingston Rd #7, Naples, FL 34105", phone: "+12392607345" },
      { name: "Paws Pet Boutique", address: "759 12th Ave S, Naples, FL 34102", phone: "+12396318122" },
      { name: "The Grooming Table", address: "4424 Tamiami Trail E, Naples, FL 34112", phone: "+12394557297" },
    ],
  },
  {
    city: "Ave Maria, FL",
    stores: [
      { name: "Backwoods Feed & Grooming", address: "Ave Maria, FL", phone: null },
      { name: "Dog Gone Cleaners", address: "5334 Ave Maria Blvd, Ave Maria, FL 34142", phone: "+12394555530" },
    ],
  },
  {
    city: "Bonita Springs & nearby, FL",
    stores: [
      { name: "The Wonder Gardens", address: "27180 Old 41 Rd, Bonita Springs, FL 34135", phone: "+12399922591" },
      { name: "Dipidy Dawg — Estero", address: "21301 S Tamiami Trail Suite 430, Estero, FL 33928", phone: "+12399499885" },
      { name: "Shampooch Pet Salon", address: "28200 Old 41 Rd Suite 203, Bonita Springs, FL 34135", phone: "+12036925259" },
      { name: "Paws and Claws Flea Market — Booth Red Aisle RT50 (Entrance 2)", address: "11902 Bonita Beach Rd SE, Bonita Springs, FL 34135", phone: null },
      { name: "Happy Tails Pet Salon — Bay Crossings", address: "26251 S Tamiami Trail #12, Bonita Springs, FL 34135", phone: "+12399487300" },
      { name: "Bubbles and Biscuits Pet Spa and Social Club", address: "8951 Bonita Beach Rd SE #500, Bonita Springs, FL 34135", phone: "+12394959663" },
    ],
  },
];

const directionsUrl = (address) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export default function StoreLocatorPage() {
  const total = REGIONS.reduce((n, r) => n + r.stores.length, 0);

  return (
    <main data-testid="store-locator-page" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12 max-w-2xl">
        <p className="font-mono-accent mb-3 text-xs tracking-[0.3em] text-[#D96B43]">STORE LOCATOR</p>
        <h1 className="font-serif-display text-4xl font-semibold tracking-tight text-[#1C2A39] sm:text-5xl">
          Find us in the wild
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#5A6572] sm:text-lg">
          {total} boutiques, groomers and pet salons across Southwest Florida carry the collection.
          Call ahead for the current selection — prints move fast.
        </p>
      </motion.div>

      <div className="space-y-14">
        {REGIONS.map((region, ri) => (
          <motion.section
            key={region.city}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: ri * 0.05 }}
            data-testid={`region-${region.city.toLowerCase().replace(/[^a-z]+/g, "-")}`}
          >
            <h2 className="font-serif-display mb-6 flex items-center gap-3 text-2xl font-semibold text-[#1C2A39]">
              <MapPin className="h-5 w-5 text-[#D96B43]" />
              {region.city}
            </h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {region.stores.map((store) => (
                <div
                  key={store.name}
                  className="flex flex-col rounded-3xl border border-[#1C2A39]/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                  data-testid={`store-${store.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}`}
                >
                  <Store className="mb-3 h-5 w-5 text-[#8A9A86]" />
                  <h3 className="font-serif-display text-lg font-semibold leading-snug text-[#1C2A39]">{store.name}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[#5A6572]">{store.address}</p>
                  <div className="mt-5 flex gap-2">
                    {store.phone && (
                      <a
                        href={`tel:${store.phone}`}
                        data-testid={`store-call-${store.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30)}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#1C2A39]/15 px-4 py-2 text-xs font-semibold text-[#1C2A39] transition-colors hover:border-[#D96B43] hover:text-[#D96B43]"
                      >
                        <Phone className="h-3.5 w-3.5" /> Call
                      </a>
                    )}
                    <a
                      href={directionsUrl(store.address)}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`store-directions-${store.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30)}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#1C2A39] px-4 py-2 text-xs font-semibold text-[#FDFBF7] transition-colors hover:bg-[#D96B43]"
                    >
                      <MapPin className="h-3.5 w-3.5" /> Directions
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-16 rounded-3xl bg-[#1C2A39] p-8 text-center sm:p-12"
        data-testid="locator-wholesale-cta"
      >
        <h2 className="font-serif-display text-2xl font-semibold text-[#FDFBF7] sm:text-3xl">Own a boutique or grooming salon?</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#FDFBF7]/70">
          Join our stockist family and bring choke-free, handcrafted design to your neighborhood.
        </p>
        <Link
          to="/wholesale"
          data-testid="locator-wholesale-link"
          className="mt-6 inline-block rounded-full bg-[#D96B43] px-8 py-3.5 text-sm font-semibold text-[#FDFBF7] transition-colors hover:bg-[#FDFBF7] hover:text-[#1C2A39]"
        >
          Become a stockist
        </Link>
      </motion.div>
    </main>
  );
}
