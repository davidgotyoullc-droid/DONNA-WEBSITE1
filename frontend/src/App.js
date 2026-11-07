import { useEffect, useRef } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/sonner";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import QuickViewModal from "@/components/QuickViewModal";
import HomePage from "@/pages/HomePage";
import ShopPage from "@/pages/ShopPage";
import ProductPage from "@/pages/ProductPage";
import PaymentSuccess from "@/pages/PaymentSuccess";
import PaymentCancel from "@/pages/PaymentCancel";

function ScrollManager({ lenisRef }) {
  const { pathname } = useLocation();
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname, lenisRef]);
  return null;
}

function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenisRef.current = lenis;
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <CartProvider>
          <ScrollManager lenisRef={lenisRef} />
          <AnnouncementBar />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/cancel" element={<PaymentCancel />} />
          </Routes>
          <Footer />
          <CartDrawer />
          <QuickViewModal />
          <Toaster position="bottom-right" toastOptions={{ style: { background: "#1C2A39", color: "#FDFBF7", border: "none" } }} />
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
