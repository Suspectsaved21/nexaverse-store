import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="hero-section relative">
      <img 
        src="/lovable-uploads/d8e71c37-83cd-4f24-9782-a884ca1aa993.png" 
        alt="Nexa Fashion Collection" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">Welcome to Nexa</h1>
        <p className="text-xl md:text-2xl mb-8 text-white">Your one-stop online shop for everything!</p>
        <div className="flex justify-center w-full">
          <Link to="/shop">
            <Button size="lg" className="bg-nexa-primary hover:bg-nexa-dark text-white text-lg px-8 py-6">
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;