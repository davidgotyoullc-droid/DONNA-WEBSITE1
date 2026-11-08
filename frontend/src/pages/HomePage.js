import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { api } from "@/lib/api";
import HeroSection from "@/components/HeroSection";
import PressMarquee from "@/components/PressMarquee";
import CategoryTiles from "@/components/CategoryTiles";
import ProductCarousel from "@/components/ProductCarousel";
import EditorialMarquee from "@/components/EditorialMarquee";
import VideosSection from "@/components/VideosSection";
import BrandStory from "@/components/BrandStory";
import WhyChokeFree from "@/components/WhyChokeFree";
import Testimonials from "@/components/Testimonials";
import CommunityStrip from "@/components/CommunityStrip";
import ContactForm from "@/components/ContactForm";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    api.get("/products").then(({ data }) => setProducts(data)).catch(() => {});
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 150);
    }
  }, [location.hash]);

  const bestSellers = products.filter((p) => p.tags?.includes("best_seller"));
  const newArrivals = products.filter((p) => p.tags?.includes("new_arrival"));

  return (
    <main data-testid="home-page">
      <HeroSection />
      <PressMarquee />
      <CategoryTiles />
      <ProductCarousel id="best-sellers" eyebrow="MOST LOVED" title="Best sellers" products={bestSellers} />
      <EditorialMarquee />
      <ProductCarousel id="new-arrivals" eyebrow="JUST STITCHED" title="New arrivals" products={newArrivals} />
      <VideosSection />
      <BrandStory />
      <WhyChokeFree />
      <Testimonials />
      <CommunityStrip />
      <ContactForm />
    </main>
  );
}
