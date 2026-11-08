import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Mail, PawPrint, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";

const PERKS = [
  { icon: Sparkles, title: "First dibs on new prints", detail: "Every collection opens to the pack a full day before anyone else." },
  { icon: PawPrint, title: "Fitting guidance", detail: "Seasonal sizing notes and measuring reminders, so every piece fits the first time." },
  { icon: Gift, title: "Pack-only treats", detail: "Occasional subscriber-only offers and early access to limited runs." },
];

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/newsletter", { email });
      toast.success(`Welcome to the pack${name ? `, ${name}` : ""} — first dibs on new prints.`);
      setEmail("");
      setName("");
    } catch {
      toast.error("Couldn't add you just now — please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main data-testid="signup-page" className="texture-grain relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="font-mono-accent mb-3 text-xs tracking-[0.3em] text-[#D96B43]">JOIN THE PACK</p>
          <h1 className="font-serif-display text-4xl font-semibold tracking-tight text-[#1C2A39] sm:text-5xl">
            One thoughtful letter
            <br />
            <em className="text-[#D96B43]">a month.</em>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[#5A6572] sm:text-lg">
            New prints, fitting wisdom and small stories from the worktable — never noise, never more
            than once a month.
          </p>

          <form onSubmit={submit} className="mt-8 max-w-md space-y-3" data-testid="signup-form">
            <input
              data-testid="signup-name-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (and your pup's, if you like)"
              className="w-full rounded-full border border-[#1C2A39]/15 bg-white px-6 py-4 text-sm outline-none transition-colors placeholder:text-[#5A6572]/60 focus:border-[#D96B43] focus:ring-2 focus:ring-[#D96B43]/30"
            />
            <div className="flex gap-2">
              <input
                data-testid="signup-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full rounded-full border border-[#1C2A39]/15 bg-white px-6 py-4 text-sm outline-none transition-colors placeholder:text-[#5A6572]/60 focus:border-[#D96B43] focus:ring-2 focus:ring-[#D96B43]/30"
              />
              <button
                data-testid="signup-submit-button"
                type="submit"
                disabled={saving}
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#1C2A39] px-7 py-4 text-sm font-semibold text-[#FDFBF7] transition-colors hover:bg-[#D96B43] disabled:opacity-60"
              >
                <Mail className="h-4 w-4" />
                {saving ? "Joining…" : "Join"}
              </button>
            </div>
            <p className="text-[11px] text-[#5A6572]">Unsubscribe anytime with one click.</p>
          </form>
        </motion.div>

        <div className="space-y-5">
          {PERKS.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                className="flex items-start gap-5 rounded-3xl border border-[#1C2A39]/10 bg-white p-6 shadow-sm"
                data-testid={`signup-perk-${i}`}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F4EFEA]">
                  <Icon className="h-5 w-5 text-[#D96B43]" />
                </span>
                <div>
                  <h3 className="font-serif-display text-lg font-semibold text-[#1C2A39]">{perk.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#5A6572]">{perk.detail}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
