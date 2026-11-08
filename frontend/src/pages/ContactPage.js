import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Send, Store } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";

const TOPICS = ["Custom sizing help", "A bespoke print request", "Wholesale enquiry", "Order support", "Just saying hello"];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", topic: TOPICS[0], message: "" });
  const [sending, setSending] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const { data } = await api.post("/enquiries", form);
      toast.success(data.message);
      setForm({ name: "", email: "", topic: TOPICS[0], message: "" });
    } catch {
      toast.error("Something went wrong — please try again in a moment.");
    } finally {
      setSending(false);
    }
  };

  const inputCls =
    "w-full rounded-2xl border border-[#3E2A33]/15 bg-white px-5 py-3.5 text-sm text-[#3E2A33] outline-none transition-colors placeholder:text-[#5A6572]/60 focus:border-[#E6007E] focus:ring-2 focus:ring-[#E6007E]/30";

  return (
    <main data-testid="contact-page" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="font-mono-accent mb-3 text-xs tracking-[0.3em] text-[#E6007E]">CONTACT US</p>
          <h1 className="font-serif-display text-4xl font-semibold tracking-tight text-[#3E2A33] sm:text-5xl">
            Write to the studio
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[#5A6572] sm:text-lg">
            Custom sizing, a print you're dreaming of, wholesale, or help with an order — every message
            lands directly on Donna's worktable.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FBEEF4]">
                <Mail className="h-5 w-5 text-[#E6007E]" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#3E2A33]">Email</p>
                <a href="mailto:info@donnadevlindesigns.com" className="text-sm text-[#5A6572] underline decoration-[#E6007E]/40 underline-offset-2 hover:text-[#E6007E]" data-testid="contact-email-link">
                  info@donnadevlindesigns.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FBEEF4]">
                <Clock className="h-5 w-5 text-[#E6007E]" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#3E2A33]">Replies</p>
                <p className="text-sm text-[#5A6572]">Within 1–2 business days, stitched between orders.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FBEEF4]">
                <Store className="h-5 w-5 text-[#E6007E]" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#3E2A33]">Prefer to shop in person?</p>
                <p className="text-sm text-[#5A6572]">
                  13 Southwest Florida stockists carry the collection —{" "}
                  <Link to="/store-locator" className="font-semibold text-[#E6007E] underline underline-offset-2" data-testid="contact-locator-link">
                    find one near you
                  </Link>
                  .
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FBEEF4]">
                <MapPin className="h-5 w-5 text-[#E6007E]" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#3E2A33]">Based in</p>
                <p className="text-sm text-[#5A6572]">Southwest Florida, USA — every piece handcrafted here.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="h-fit space-y-4 rounded-3xl border border-[#3E2A33]/10 bg-[#FBEEF4] p-6 sm:p-8"
          data-testid="contact-page-form"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input data-testid="contact-page-name-input" required value={form.name} onChange={set("name")} placeholder="Your name" className={inputCls} />
            <input data-testid="contact-page-email-input" required type="email" value={form.email} onChange={set("email")} placeholder="Email address" className={inputCls} />
          </div>
          <select data-testid="contact-page-topic-select" value={form.topic} onChange={set("topic")} className={inputCls}>
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <textarea
            data-testid="contact-page-message-input"
            required
            rows={6}
            value={form.message}
            onChange={set("message")}
            placeholder="Tell us about your pup — breed, chest measurement, and what you're dreaming of…"
            className={`${inputCls} resize-none`}
          />
          <button
            data-testid="contact-page-submit-button"
            type="submit"
            disabled={sending}
            className="group inline-flex items-center gap-2 rounded-full bg-[#E6007E] px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#3E2A33] disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send to the studio"}
            <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
          </button>
        </motion.form>
      </div>
    </main>
  );
}
