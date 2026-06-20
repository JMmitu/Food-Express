import TopBar from "../components/layout/TopBar";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/home/hero/HeroSection";
import { DealsSection } from "../components/home/deals/DealsSection";
import { CategoriesSection } from "../components/home/categories/CategoriesSection";
import { PopularFoodsSection } from "../components/home/foods/PopularFoodsSection";
import { RestaurantsSection } from "../components/home/restaurants/RestaurantsSection";
import { AppPromoSection } from "../components/home/app/AppPromoSection";
import { StatsSection } from "../components/home/statistics/StatsSection";
import { TestimonialsSection } from "../components/home/testimonials/TestimonialsSection";
import { Footer } from "../components/layout/Footer";

const HomePage = () => {
  return (
    <>
      <TopBar />
      <Navbar />
      <HeroSection />
      <DealsSection />
      <CategoriesSection />
      <PopularFoodsSection />
      <RestaurantsSection />
      <AppPromoSection />
      <StatsSection />
      <TestimonialsSection />
      <Footer />
    </>
  );
};

export default HomePage;
