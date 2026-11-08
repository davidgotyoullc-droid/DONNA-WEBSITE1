import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { api } from "@/lib/api";
import PromoPanel from "@/components/PromoPanel";

const DISMISS_KEY = "ddd_promo_dismissed";

export default function PromoPopup() {
  const { pathname } = useLocation();
  const [promo, setPromo] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pathname !== "/" || sessionStorage.getItem(DISMISS_KEY)) return undefined;
    let timer;
    api
      .get("/promotions/active")
      .then(({ data }) => {
        if (data && data.enabled) {
          setPromo(data);
          timer = setTimeout(() => setOpen(true), 5000);
        }
      })
      .catch(() => {});
    return () => clearTimeout(timer);
  }, [pathname]);

  const close = () => {
    setOpen(false);
    sessionStorage.setItem(DISMISS_KEY, "1");
  };

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (pathname !== "/") return null;

  return (
    <AnimatePresence>
      {open && promo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#3E2A33]/50 p-4 backdrop-blur-sm sm:items-center"
          onClick={close}
          data-testid="promo-popup"
        >
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg sm:max-w-2xl"
          >
            <PromoPanel promo={promo} onClose={close} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
