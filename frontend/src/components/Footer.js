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
    <footer data-testid="footer" className="border-t-2 border-[#E6007E] bg-[#3E2A33] text-[#FDF7FA]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#FDF7FA]/70">
            Handcrafted, choke-free walking wear for dogs with delicate necks and impeccable taste.
            Cut and sewn in the USA.
          </p>
        </div>

        <div>
          <p className="font-mono-accent mb-4 text-[10px] tracking-[0.3em] text-[#FDF7FA]/50">SHOP</p>
          <ul className="space-y-2.5 text-sm">
            {["Walking Vests", "Step-In Harnesses", "Designer Collars", "Matching Leashes"].map((cat) => (
              <li key={cat}>
                <Link
                  to={`/shop?category=${encodeURIComponent(cat)}`}
                  data-testid={`footer-shop-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-[#FDF7FA]/80 transition-colors hover:text-[#E6007E]"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono-accent mb-4 text-[10px] tracking-[0.3em] text-[#FDF7FA]/50">THE STUDIO</p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <button data-testid="footer-story-link" onClick={() => go("story")} className="text-[#FDF7FA]/80 transition-colors hover:text-[#E6007E]">
                Our story
              </button>
            </li>
            <li>
              <Link to="/fitting-room" data-testid="footer-fitting-room-link" className="text-[#FDF7FA]/80 transition-colors hover:text-[#E6007E]">
                Fitting room
              </Link>
            </li>
            <li>
              <Link to="/store-locator" data-testid="footer-store-locator-link" className="text-[#FDF7FA]/80 transition-colors hover:text-[#E6007E]">
                Store locator
              </Link>
            </li>
            <li>
              <Link to="/wholesale" data-testid="footer-wholesale-link" className="text-[#FDF7FA]/80 transition-colors hover:text-[#E6007E]">
                Wholesale
              </Link>
            </li>
            <li>
              <Link to="/signup" data-testid="footer-signup-link" className="text-[#FDF7FA]/80 transition-colors hover:text-[#E6007E]">
                Join the pack
              </Link>
            </li>
            <li>
              <Link to="/contact" data-testid="footer-contact-link" className="text-[#FDF7FA]/80 transition-colors hover:text-[#E6007E]">
                Contact the studio
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-mono-accent mb-4 text-[10px] tracking-[0.3em] text-[#FDF7FA]/50">FIRST DIBS ON NEW PRINTS</p>
          <form onSubmit={subscribe} className="flex gap-2" data-testid="newsletter-form">
            <input
              data-testid="newsletter-email-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm text-[#FDF7FA] outline-none transition-colors placeholder:text-[#FDF7FA]/40 focus:border-[#E6007E] focus:ring-2 focus:ring-[#E6007E]/40"
            />
            <button
              data-testid="newsletter-submit-button"
              type="submit"
              disabled={saving}
              className="shrink-0 rounded-full bg-[#E6007E] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#FDF7FA] hover:text-[#3E2A33] disabled:opacity-60"
            >
              Join
            </button>
          </form>
          <p className="mt-3 text-[11px] leading-relaxed text-[#FDF7FA]/50">One thoughtful letter a month. Never noise.</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="font-mono-accent mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-[10px] tracking-[0.2em] text-[#FDF7FA]/50 sm:flex-row sm:px-6">
          <p>© 2026 DONNA DEVLIN DESIGNS</p>
          <p>HANDCRAFTED IN THE USA</p>
        </div>
      </div>
    </footer>
  );
}
