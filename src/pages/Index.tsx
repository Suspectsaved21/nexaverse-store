import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import ScrollableCategories from "@/components/home/ScrollableCategories";
import HotDealsSection from "@/components/home/HotDealsSection";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <CategoriesSection />
      <ScrollableCategories />
      <HotDealsSection />
    </div>
  );
}