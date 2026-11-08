import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";

const TERMS = [
  { title: "$300 first order", detail: "New accounts open with a $300 minimum. Re-orders carry no minimum at all." },
  { title: "Free shipping over $300", detail: "Every wholesale order over $300 ships free within the contiguous US." },
  { title: "1–2 day verification", detail: "We verify your Tax ID / resale certificate and brick-and-mortar presence quickly." },
  { title: "Welcome packet", detail: "Approved accounts receive a unique coupon code, a welcome packet and a storefront display sign." },
];

const CHANNELS = ["Store front", "Website", "Facebook", "Google Shopping", "Other"];

const EMPTY = {
  company: "",
  name: "",
  taxId: "",
  phone: "",
  email: "",
  website: "",
  channels: [],
  description: "",
  yearlySales: "",
};

export default function WholesalePage() {
  const [form, setForm] = useState(EMPTY);
  const [sending, setSending] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const toggleChannel = (channel) =>
    setForm((f) => ({
      ...f,
      channels: f.channels.includes(channel) ? f.channels.filter((c) => c !== channel) : [...f.channels, channel],
    }));

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    const message = [
      `Tax ID / Resale Certificate: ${form.taxId}`,
      `Website: ${form.website || "—"}`,
      `Sales channels: ${form.channels.length ? form.channels.join(", ") : "—"}`,
      `Projected yearly sales: ${form.yearlySales || "—"}`,
      "",
      form.description,
    ].join("\n");
    try {
      await api.post("/enquiries", {
        name: form.name,
        email: form.email,
        topic: "Wholesale application",
        company: form.company,
        phone: form.phone,
        message,
      });
      toast.success("Application received — we verify within 1–2 business days and email your approval.");
      setForm(EMPTY);
    } catch {
      toast.error("Something went wrong — please try again in a moment.");
    } finally {
      setSending(false);
    }
  };

  const inputCls =
    "w-full rounded-2xl border border-[#3E2A33]/15 bg-white px-5 py-3.5 text-sm text-[#3E2A33] outline-none transition-colors placeholder:text-[#5A6572]/60 focus:border-[#E6007E] focus:ring-2 focus:ring-[#E6007E]/30";

  return (
    <main data-testid="wholesale-page" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12 max-w-2xl">
        <p className="font-mono-accent mb-3 text-xs tracking-[0.3em] text-[#E6007E]">WHOLESALE</p>
        <h1 className="font-serif-display text-4xl font-semibold tracking-tight text-[#3E2A33] sm:text-5xl">
          Stock the studio
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#5A6572] sm:text-lg">
          Wholesale pricing and ordering are open to registered businesses that sell pet products —
          retail stores, groomers, veterinarians and more. Questions first? Write to us at{" "}
          <a href="mailto:info@donnadevlindesigns.com" className="font-semibold text-[#E6007E] underline underline-offset-2">
            info@donnadevlindesigns.com
          </a>
          .
        </p>
      </motion.div>

      <div className="mb-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" data-testid="wholesale-terms">
        {TERMS.map((term, i) => (
          <motion.div
            key={term.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-3xl border border-[#3E2A33]/10 bg-white p-6 shadow-sm"
          >
            <CheckCircle2 className="mb-3 h-5 w-5 text-[#7D8F4E]" />
            <h3 className="font-serif-display text-lg font-semibold text-[#3E2A33]">{term.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#5A6572]">{term.detail}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2"
        >
          <h2 className="font-serif-display text-2xl font-semibold text-[#3E2A33] sm:text-3xl">How approval works</h2>
          <ol className="mt-6 space-y-5">
            {[
              "Send the application with your company name, current Tax ID / resale certificate number and a valid email.",
              "We verify your business within 1–2 business days.",
              "You receive your unique coupon code by email, applied at checkout.",
              "Your first order ships with a complimentary welcome packet and storefront display sign.",
            ].map((step, i) => (
              <li key={step} className="flex items-start gap-4">
                <span className="font-serif-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E6007E] text-sm font-bold text-[#FDF7FA]">
                  {i + 1}
                </span>
                <p className="pt-1.5 text-sm leading-relaxed text-[#5A6572]">{step}</p>
              </li>
            ))}
          </ol>
        </motion.div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4 rounded-3xl border border-[#3E2A33]/10 bg-[#FBEEF4] p-6 sm:p-8 lg:col-span-3"
          data-testid="wholesale-form"
        >
          <h2 className="font-serif-display text-2xl font-semibold text-[#3E2A33]">Wholesale application</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input data-testid="wholesale-company-input" required value={form.company} onChange={set("company")} placeholder="Company name *" className={inputCls} />
            <input data-testid="wholesale-name-input" required value={form.name} onChange={set("name")} placeholder="Your name *" className={inputCls} />
            <input data-testid="wholesale-taxid-input" required value={form.taxId} onChange={set("taxId")} placeholder="Tax ID / resale certificate *" className={inputCls} />
            <input data-testid="wholesale-phone-input" required value={form.phone} onChange={set("phone")} placeholder="Phone *" className={inputCls} />
            <input data-testid="wholesale-email-input" required type="email" value={form.email} onChange={set("email")} placeholder="Email *" className={inputCls} />
            <input data-testid="wholesale-website-input" value={form.website} onChange={set("website")} placeholder="Website / URL" className={inputCls} />
          </div>

          <div>
            <p className="font-mono-accent mb-2 text-[10px] tracking-[0.25em] text-[#5A6572]">WHERE WILL YOU SELL OUR PRODUCTS?</p>
            <div className="flex flex-wrap gap-2" data-testid="wholesale-channels">
              {CHANNELS.map((channel) => (
                <button
                  type="button"
                  key={channel}
                  data-testid={`wholesale-channel-${channel.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => toggleChannel(channel)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                    form.channels.includes(channel)
                      ? "border-[#3E2A33] bg-[#3E2A33] text-[#FDF7FA]"
                      : "border-[#3E2A33]/20 bg-white text-[#3E2A33] hover:border-[#E6007E]"
                  }`}
                >
                  {channel}
                </button>
              ))}
            </div>
          </div>

          <textarea
            data-testid="wholesale-description-input"
            required
            rows={4}
            value={form.description}
            onChange={set("description")}
            placeholder="Describe your business *"
            className={`${inputCls} resize-none`}
          />
          <input
            data-testid="wholesale-sales-input"
            value={form.yearlySales}
            onChange={set("yearlySales")}
            placeholder="Projected yearly sales"
            className={inputCls}
          />
          <button
            data-testid="wholesale-submit-button"
            type="submit"
            disabled={sending}
            className="group inline-flex items-center gap-2 rounded-full bg-[#E6007E] px-8 py-4 text-sm font-semibold text-[#FDF7FA] transition-colors hover:bg-[#3E2A33] disabled:opacity-60"
          >
            {sending ? "Sending…" : "Submit application"}
            <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
          </button>
        </motion.form>
      </div>
    </main>
  );
}
