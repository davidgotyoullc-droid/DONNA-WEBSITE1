import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, Save, ShieldAlert, ToggleLeft, ToggleRight } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import PromoPanel from "@/components/PromoPanel";

const IMAGE_CHOICES = [
  { label: "Garden Party vest on pup", url: "/images/products/garden-party-vest-b.webp" },
  { label: "Cherry Picnic vest on pup", url: "/images/products/cherry-picnic-vest-b.webp" },
  { label: "Scotland Yard harness on pup", url: "/images/products/scotland-yard-harness-b.webp" },
  { label: "Polka Wisp harness on pup", url: "/images/products/polka-wisp-harness-b.webp" },
  { label: "Daisy collar on pup", url: "/images/products/daisy-collar-b.webp" },
  { label: "Ladybug Lane leash", url: "/images/brand/leash-ladybug.webp" },
  { label: "Studio poodle portrait", url: "/images/hero/hero-1.webp" },
  { label: "Dog on the beach", url: "/images/story/dog-on-beach.jpg" },
];

const EMPTY = {
  enabled: false,
  headline: "",
  description: "",
  image_url: "",
  cta_text: "",
  cta_link: "/shop",
  coupon_code: "",
  start_at: "",
  end_at: "",
};

const toLocalInput = (iso) => (iso ? iso.slice(0, 16) : "");

export default function AdminPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (user === false) navigate("/signin");
  }, [user, navigate]);

  useEffect(() => {
    if (user && user.role === "admin") {
      api
        .get("/admin/promotion")
        .then(({ data }) => setForm({ ...data, start_at: toLocalInput(data.start_at), end_at: toLocalInput(data.end_at) }))
        .catch(() => toast.error("Couldn't load the promotion settings."));
    }
  }, [user]);

  if (!user) {
    return <main className="mx-auto max-w-7xl px-4 py-32 text-center text-[#5A6572]" data-testid="admin-loading">Checking your session…</main>;
  }

  if (user.role !== "admin") {
    return (
      <main className="mx-auto max-w-7xl px-4 py-32 text-center" data-testid="admin-denied">
        <ShieldAlert className="mx-auto h-12 w-12 text-[#E6007E]" />
        <h1 className="font-serif-display mt-4 text-2xl text-[#3E2A33]">Administrators only</h1>
        <p className="mt-2 text-sm text-[#5A6572]">This area manages the shop's promotions. Please sign in with the studio account.</p>
      </main>
    );
  }

  if (!form) {
    return <main className="mx-auto max-w-7xl px-4 py-32 text-center text-[#5A6572]">Loading promotion settings…</main>;
  }

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const save = async () => {
    setSaving(true);
    try {
      await api.put("/admin/promotion", {
        ...form,
        start_at: form.start_at || null,
        end_at: form.end_at || null,
      });
      toast.success(form.enabled ? "Campaign saved and published." : "Campaign saved (currently off).");
    } catch (e) {
      const detail = e?.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : "Couldn't save — please check the fields.");
    } finally {
      setSaving(false);
    }
  };

  const inputCls =
    "w-full rounded-2xl border border-[#3E2A33]/15 bg-white px-5 py-3.5 text-sm text-[#3E2A33] outline-none transition-colors placeholder:text-[#5A6572]/60 focus:border-[#E6007E] focus:ring-2 focus:ring-[#E6007E]/30";
  const labelCls = "font-mono-accent mb-2 block text-[10px] tracking-[0.25em] text-[#5A6572]";

  return (
    <main data-testid="admin-page" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p className="font-mono-accent mb-3 text-xs tracking-[0.3em] text-[#E6007E]">ADMIN STUDIO</p>
        <h1 className="font-serif-display text-4xl font-semibold tracking-tight text-[#3E2A33] sm:text-5xl">
          Promotional pop-up
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#5A6572] sm:text-lg">
          Design the campaign, preview it exactly as visitors will see it, then publish. It appears on
          the homepage 5 seconds after load, at most once per visit session.
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="space-y-5" data-testid="promo-form">
          <button
            type="button"
            data-testid="promo-enabled-toggle"
            onClick={() => setForm((f) => ({ ...f, enabled: !f.enabled }))}
            className={`flex w-full items-center justify-between rounded-3xl border p-5 text-left transition-colors ${
              form.enabled ? "border-[#7D8F4E] bg-[#7D8F4E]/10" : "border-[#3E2A33]/15 bg-white"
            }`}
          >
            <span>
              <span className="block text-sm font-semibold text-[#3E2A33]">{form.enabled ? "Campaign is LIVE" : "Campaign is off"}</span>
              <span className="text-xs text-[#5A6572]">{form.enabled ? "Visitors will see this pop-up" : "Nothing shows on the site until you switch this on"}</span>
            </span>
            {form.enabled ? <ToggleRight className="h-8 w-8 text-[#7D8F4E]" /> : <ToggleLeft className="h-8 w-8 text-[#5A6572]" />}
          </button>

          <div>
            <label className={labelCls} htmlFor="promo-headline-input">HEADLINE</label>
            <input id="promo-headline-input" data-testid="promo-headline-input" value={form.headline} onChange={set("headline")} maxLength={120} className={inputCls} placeholder="A Little Something Special for Your Pup!" />
          </div>
          <div>
            <label className={labelCls} htmlFor="promo-description-input">DESCRIPTION</label>
            <textarea id="promo-description-input" data-testid="promo-description-input" value={form.description} onChange={set("description")} maxLength={400} rows={3} className={`${inputCls} resize-none`} placeholder="A short, warm sentence or two…" />
          </div>

          <div>
            <label className={labelCls}>IMAGE</label>
            <div className="grid grid-cols-4 gap-2" data-testid="promo-image-picker">
              {IMAGE_CHOICES.map((img) => (
                <button
                  key={img.url}
                  type="button"
                  title={img.label}
                  data-testid={`promo-image-${img.url.split("/").pop().replace(".", "-")}`}
                  onClick={() => setForm((f) => ({ ...f, image_url: img.url }))}
                  className={`overflow-hidden rounded-xl border-2 transition-colors ${form.image_url === img.url ? "border-[#E6007E]" : "border-transparent hover:border-[#E6007E]/40"}`}
                >
                  <img src={img.url} alt={img.label} className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
            <input data-testid="promo-image-url-input" value={form.image_url} onChange={set("image_url")} className={`${inputCls} mt-3`} placeholder="…or paste an image URL" />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className={labelCls} htmlFor="promo-cta-text-input">BUTTON TEXT</label>
              <input id="promo-cta-text-input" data-testid="promo-cta-text-input" value={form.cta_text} onChange={set("cta_text")} maxLength={40} className={inputCls} placeholder="Explore Our Collection" />
            </div>
            <div>
              <label className={labelCls} htmlFor="promo-cta-link-input">BUTTON DESTINATION</label>
              <input id="promo-cta-link-input" data-testid="promo-cta-link-input" value={form.cta_link} onChange={set("cta_link")} className={inputCls} placeholder="/shop" />
            </div>
          </div>

          <div>
            <label className={labelCls} htmlFor="promo-coupon-input">COUPON CODE (OPTIONAL)</label>
            <input id="promo-coupon-input" data-testid="promo-coupon-input" value={form.coupon_code} onChange={set("coupon_code")} maxLength={40} className={inputCls} placeholder="e.g. PUPLOVE15 — leave empty for none" />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className={labelCls} htmlFor="promo-start-input">STARTS (OPTIONAL)</label>
              <input id="promo-start-input" data-testid="promo-start-input" type="datetime-local" value={form.start_at} onChange={set("start_at")} className={inputCls} />
            </div>
            <div>
              <label className={labelCls} htmlFor="promo-end-input">ENDS (OPTIONAL)</label>
              <input id="promo-end-input" data-testid="promo-end-input" type="datetime-local" value={form.end_at} onChange={set("end_at")} className={inputCls} />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              data-testid="promo-save-button"
              onClick={save}
              disabled={saving || !form.headline}
              className="inline-flex items-center gap-2 rounded-full bg-[#E6007E] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#3E2A33] disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving…" : "Save campaign"}
            </button>
            <button
              data-testid="promo-preview-button"
              onClick={() => setShowPreview((s) => !s)}
              className="inline-flex items-center gap-2 rounded-full border border-[#3E2A33]/20 px-7 py-3.5 text-sm font-semibold text-[#3E2A33] transition-colors hover:border-[#E6007E] hover:text-[#E6007E]"
            >
              <Eye className="h-4 w-4" />
              {showPreview ? "Hide preview" : "Preview pop-up"}
            </button>
          </div>
        </div>

        <div>
          <p className={labelCls}>LIVE PREVIEW</p>
          <div className="rounded-3xl border border-[#3E2A33]/10 bg-[#FBEEF4] p-4 sm:p-6" data-testid="promo-preview-area">
            {showPreview || true ? (
              <PromoPanel
                preview
                promo={{
                  headline: form.headline || "Your headline appears here",
                  description: form.description,
                  image_url: form.image_url,
                  cta_text: form.cta_text || "Button text",
                  cta_link: form.cta_link,
                  coupon_code: form.coupon_code,
                }}
              />
            ) : null}
            <p className="mt-4 text-center text-xs text-[#5A6572]">
              This is exactly what visitors see — image left on desktop, stacked on mobile.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
