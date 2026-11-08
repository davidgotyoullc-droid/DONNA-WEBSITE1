import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";

const TOPICS = ["Custom sizing help", "A bespoke print request", "Wholesale enquiry", "Order support", "Just saying hello"];

export default function ContactForm() {
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
    <section id="contact" data-testid="contact-section" className="bg-[#3E2A33] py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono-accent mb-3 text-xs tracking-[0.3em] text-[#E6007E]">WRITE TO THE STUDIO</p>
          <h2 className="font-serif-display text-3xl font-semibold tracking-tight text-[#FDF7FA] sm:text-4xl">
            Custom fit? Special print?
            <br />
            <em className="text-[#E6007E]">Just ask.</em>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-[#FDF7FA]/70 sm:text-lg">
            Whether your pup is between sizes, you dream of a print we haven't stitched yet, or you'd
            like to stock the collection — every message lands directly on Donna's worktable.
          </p>
          <div className="font-mono-accent mt-10 space-y-2 text-xs tracking-[0.2em] text-[#FDF7FA]/50">
            <p>REPLIES WITHIN 1–2 BUSINESS DAYS</p>
            <p>HANDCRAFTED IN THE USA</p>
          </div>
        </motion.div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="space-y-4"
          data-testid="contact-form"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              data-testid="contact-name-input"
              required
              value={form.name}
              onChange={set("name")}
              placeholder="Your name"
              className={inputCls}
            />
            <input
              data-testid="contact-email-input"
              required
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="Email address"
              className={inputCls}
            />
          </div>
          <select data-testid="contact-topic-select" value={form.topic} onChange={set("topic")} className={inputCls}>
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <textarea
            data-testid="contact-message-input"
            required
            rows={5}
            value={form.message}
            onChange={set("message")}
            placeholder="Tell us about your pup — breed, chest measurement, and what you're dreaming of…"
            className={`${inputCls} resize-none`}
          />
          <button
            data-testid="contact-submit-button"
            type="submit"
            disabled={sending}
            className="group inline-flex items-center gap-2 rounded-full bg-[#E6007E] px-8 py-4 text-sm font-semibold text-[#FDF7FA] transition-colors hover:bg-[#FDF7FA] hover:text-[#3E2A33] disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send to the studio"}
            <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
          </button>
        </motion.form>
      </div>
    </section>
  );
}
