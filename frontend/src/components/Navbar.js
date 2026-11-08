import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, User, X } from "lucide-react";
import Logo from "@/components/Logo";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Our Products", to: "/products" },
  { label: "Shop", to: "/shop" },
  { label: "Fitting Room", to: "/fitting-room" },
  { label: "Store Locator", to: "/store-locator" },
  { label: "Wholesale", to: "/wholesale" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const MOBILE_EXTRA = [
  { label: "Our Story", to: "/#story" },
  { label: "Join the Pack", to: "/signup" },
];

export default function Navbar() {
  const { count, setIsCartOpen } = useCart();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const go = (to) => {
    setOpen(false);
    if (to.includes("#")) {
      const [path, hash] = to.split("#");
      navigate(path || "/");
      setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" }), 120);
      return;
    }
    if (to === pathname) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(to);
    }
  };

  const isActive = (to) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  const linkCls = (to) =>
    `group relative whitespace-nowrap text-sm font-medium transition-colors ${
      isActive(to) ? "text-[#E6007E]" : "text-[#3E2A33] hover:text-[#E6007E]"
    }`;

  return (
    <header
      data-testid="navbar"
      className="sticky top-0 z-40 border-b border-[#3E2A33]/10 bg-[#FDF7FA]/90 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6">
        <Link to="/" data-testid="nav-logo-link" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-5 xl:flex" data-testid="nav-links">
          {LINKS.map((link) => (
            <button
              key={link.label}
              data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => go(link.to)}
              aria-current={isActive(link.to) ? "page" : undefined}
              className={linkCls(link.to)}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-[#E6007E] transition-[width] duration-300 ${
                  isActive(link.to) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to={user ? "/account" : "/signin"}
            data-testid="account-link"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#3E2A33]/15 bg-white/60 text-[#3E2A33] transition-colors hover:border-[#E6007E] hover:text-[#E6007E]"
            aria-label={user ? "My account" : "Sign in"}
          >
            {user && user.name ? (
              <span className="text-sm font-bold text-[#E6007E]">{user.name[0].toUpperCase()}</span>
            ) : (
              <User className="h-5 w-5" />
            )}
          </Link>
          <button
            data-testid="cart-open-button"
            onClick={() => setIsCartOpen(true)}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#3E2A33]/15 bg-white/60 text-[#3E2A33] transition-colors hover:border-[#E6007E] hover:text-[#E6007E]"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span
                data-testid="cart-count-badge"
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#E6007E] text-[10px] font-bold text-white"
              >
                {count}
              </span>
            )}
          </button>
          <button
            data-testid="mobile-menu-button"
            onClick={() => setOpen((o) => !o)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#3E2A33]/15 text-[#3E2A33] xl:hidden"
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
            className="overflow-hidden border-t border-[#3E2A33]/10 xl:hidden"
            data-testid="mobile-menu"
          >
            <div className="flex flex-col px-6 py-4">
              {[...LINKS, ...MOBILE_EXTRA].map((link) => (
                <button
                  key={link.label}
                  data-testid={`mobile-nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => go(link.to)}
                  aria-current={!link.to.includes("#") && isActive(link.to) ? "page" : undefined}
                  className={`border-b border-[#3E2A33]/5 py-3 text-left font-serif-display text-lg ${
                    !link.to.includes("#") && isActive(link.to) ? "text-[#E6007E]" : "text-[#3E2A33]"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                data-testid="mobile-nav-link-sign-in"
                onClick={() => go(user ? "/account" : "/signin")}
                className="py-3 text-left font-serif-display text-lg text-[#E6007E]"
              >
                {user ? "My account" : "Sign in"}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
