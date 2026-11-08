import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import Logo from "@/components/Logo";
import { useCart } from "@/context/CartContext";

const LINKS = [
  { label: "Shop", to: "/shop" },
  { label: "Fitting Room", to: "/fitting-room" },
  { label: "Our Story", to: "/#story" },
  { label: "Why Choke-Free", to: "/#choke-free" },
  { label: "Contact", to: "/#contact" },
];

export default function Navbar() {
  const { count, setIsCartOpen } = useCart();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const go = (to) => {
    setOpen(false);
    if (to.includes("#")) {
      const [path, hash] = to.split("#");
      navigate(path || "/");
      setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" }), 120);
    } else {
      navigate(to);
    }
  };

  return (
    <header
      data-testid="navbar"
      className="sticky top-0 z-40 border-b border-[#1C2A39]/10 bg-[#FDFBF7]/90 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <button onClick={() => go("/shop")} data-testid="nav-logo-link" className="text-left">
          <Link to="/" onClick={(e) => e.stopPropagation()}>
            <Logo />
          </Link>
        </button>

        <nav className="hidden items-center gap-8 md:flex" data-testid="nav-links">
          {LINKS.map((link) => (
            <button
              key={link.label}
              data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => go(link.to)}
              className="group relative text-sm font-medium text-[#1C2A39] transition-colors hover:text-[#D96B43]"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#D96B43] transition-[width] duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            data-testid="cart-open-button"
            onClick={() => setIsCartOpen(true)}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#1C2A39]/15 bg-white/60 text-[#1C2A39] transition-colors hover:border-[#D96B43] hover:text-[#D96B43]"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span
                data-testid="cart-count-badge"
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#D96B43] text-[10px] font-bold text-[#FDFBF7]"
              >
                {count}
              </span>
            )}
          </button>
          <button
            data-testid="mobile-menu-button"
            onClick={() => setOpen((o) => !o)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1C2A39]/15 text-[#1C2A39] md:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-[#1C2A39]/10 md:hidden"
            data-testid="mobile-menu"
          >
            <div className="flex flex-col px-6 py-4">
              {LINKS.map((link) => (
                <button
                  key={link.label}
                  data-testid={`mobile-nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => go(link.to)}
                  className="border-b border-[#1C2A39]/5 py-3 text-left font-serif-display text-lg text-[#1C2A39]"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
