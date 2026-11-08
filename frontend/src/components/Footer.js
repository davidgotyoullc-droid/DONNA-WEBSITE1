import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Logo from "@/components/Logo";
import { api } from "@/lib/api";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const subscribe = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/newsletter", { email });
      toast.success("Welcome to the pack — first dibs on new prints.");
      setEmail("");
    } catch {
      toast.error("Couldn't add you just now — please try again.");
    } finally {
      setSaving(false);
    }
  };

  const go = (hash) => {
    navigate("/");
    setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" }), 120);
  };

  return (
    <footer data-testid="footer" className="border-t border-[#1C2A39]/10 bg-[#FDFBF7]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#5A6572]">
            Handcrafted, choke-free walking wear for dogs with delicate necks and impeccable taste.
            Cut and sewn in the USA.
          </p>
        </div>

        <div>
          <p className="font-mono-accent mb-4 text-[10px] tracking-[0.3em] text-[#5A6572]">SHOP</p>
          <ul className="space-y-2.5 text-sm">
            {["Walking Vests", "Step-In Harnesses", "Designer Collars", "Matching Leashes"].map((cat) => (
              <li key={cat}>
                <Link
                  to={`/shop?category=${encodeURIComponent(cat)}`}
                  data-testid={`footer-shop-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-[#1C2A39] transition-colors hover:text-[#D96B43]"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono-accent mb-4 text-[10px] tracking-[0.3em] text-[#5A6572]">THE STUDIO</p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <button data-testid="footer-story-link" onClick={() => go("story")} className="text-[#1C2A39] transition-colors hover:text-[#D96B43]">
                Our story
              </button>
            </li>
            <li>
              <Link to="/fitting-room" data-testid="footer-fitting-room-link" className="text-[#1C2A39] transition-colors hover:text-[#D96B43]">
                Fitting room
              </Link>
            </li>
            <li>
              <Link to="/store-locator" data-testid="footer-store-locator-link" className="text-[#1C2A39] transition-colors hover:text-[#D96B43]">
                Store locator
              </Link>
            </li>
            <li>
              <Link to="/wholesale" data-testid="footer-wholesale-link" className="text-[#1C2A39] transition-colors hover:text-[#D96B43]">
                Wholesale
              </Link>
            </li>
            <li>
              <Link to="/signup" data-testid="footer-signup-link" className="text-[#1C2A39] transition-colors hover:text-[#D96B43]">
                Join the pack
              </Link>
            </li>
            <li>
              <button data-testid="footer-contact-link" onClick={() => go("contact")} className="text-[#1C2A39] transition-colors hover:text-[#D96B43]">
                Contact the studio
              </button>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-mono-accent mb-4 text-[10px] tracking-[0.3em] text-[#5A6572]">FIRST DIBS ON NEW PRINTS</p>
          <form onSubmit={subscribe} className="flex gap-2" data-testid="newsletter-form">
            <input
              data-testid="newsletter-email-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full rounded-full border border-[#1C2A39]/15 bg-white px-5 py-3 text-sm outline-none transition-colors placeholder:text-[#5A6572]/60 focus:border-[#D96B43] focus:ring-2 focus:ring-[#D96B43]/30"
            />
            <button
              data-testid="newsletter-submit-button"
              type="submit"
              disabled={saving}
              className="shrink-0 rounded-full bg-[#1C2A39] px-5 py-3 text-sm font-semibold text-[#FDFBF7] transition-colors hover:bg-[#D96B43] disabled:opacity-60"
            >
              Join
            </button>
          </form>
          <p className="mt-3 text-[11px] leading-relaxed text-[#5A6572]">One thoughtful letter a month. Never noise.</p>
        </div>
      </div>

      <div className="border-t border-[#1C2A39]/10">
        <div className="font-mono-accent mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-[10px] tracking-[0.2em] text-[#5A6572] sm:flex-row sm:px-6">
          <p>© 2026 DONNA DEVLIN DESIGNS</p>
          <p>HANDCRAFTED IN THE USA</p>
        </div>
      </div>
    </footer>
  );
}
