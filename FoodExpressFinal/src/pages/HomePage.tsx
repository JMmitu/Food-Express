import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "../components/home/hero/HeroSection";
import { DealsSection } from "../components/home/deals/DealsSection";
import { CategoriesSection } from "../components/home/categories/CategoriesSection";
import { PopularFoodsSection } from "../components/home/foods/PopularFoodsSection";
import { RestaurantsSection } from "../components/home/restaurants/RestaurantsSection";
import { AppPromoSection } from "../components/home/app/AppPromoSection";
import { StatsSection } from "../components/home/statistics/StatsSection";
import { TestimonialsSection } from "../components/home/testimonials/TestimonialsSection";

const HomePage = () => {
  const { hash } = useLocation();

  // Supports navigating here from another page with a section anchor, e.g. "/#offers"
  useEffect(() => {
    if (!hash) return;

    const id = hash.replace("#", "");
    const el = document.getElementById(id);

    el?.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  return (
    <>
      <HeroSection />
      <DealsSection />
      <CategoriesSection />
      <PopularFoodsSection />
      <RestaurantsSection />
      <AppPromoSection />
      <StatsSection />
      <TestimonialsSection />
    </>
  );
};

export default HomePage;
