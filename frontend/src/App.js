import { useEffect, useRef } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import QuickViewModal from "@/components/QuickViewModal";
import PromoPopup from "@/components/PromoPopup";
import HomePage from "@/pages/HomePage";
import ShopPage from "@/pages/ShopPage";
import ProductPage from "@/pages/ProductPage";
import ProductsPage from "@/pages/ProductsPage";
import FittingRoomPage from "@/pages/FittingRoomPage";
import StoreLocatorPage from "@/pages/StoreLocatorPage";
import WholesalePage from "@/pages/WholesalePage";
import SignupPage from "@/pages/SignupPage";
import SignInPage from "@/pages/SignInPage";
import AccountPage from "@/pages/AccountPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import AdminPage from "@/pages/AdminPage";
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
        <AuthProvider>
          <CartProvider>
            <ScrollManager lenisRef={lenisRef} />
            <AnnouncementBar />
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:slug" element={<ProductPage />} />
              <Route path="/fitting-room" element={<FittingRoomPage />} />
              <Route path="/store-locator" element={<StoreLocatorPage />} />
              <Route path="/wholesale" element={<WholesalePage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/payment/cancel" element={<PaymentCancel />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
            <Footer />
            <CartDrawer />
            <QuickViewModal />
            <PromoPopup />
            <Toaster position="bottom-right" toastOptions={{ style: { background: "#3E2A33", color: "#FDF7FA", border: "none" } }} />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
