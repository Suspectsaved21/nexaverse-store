import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
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

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Categories</h2>
          <div className="category-grid">
            {categories.map((category) => (
              <Link 
                key={category.name}
                to={`/shop?category=${category.link}`}
                className="transform transition-transform hover:scale-105"
              >
                <div className="category-card">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="scrollable-section">
        <div className="video-background-container">
          <video autoPlay muted loop className="video-loop">
            <source src="/placeholder.svg" type="video/mp4" />
          </video>
          <div className="scrollable-container">
            {categories.map((category) => (
              <Link 
                key={category.name}
                to={`/shop?category=${category.link}`}
                className="category-card flex-shrink-0"
              >
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-32 object-cover rounded-md"
                />
                <p className="mt-2 font-medium">{category.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Deals Section */}
      <section className="deals-section">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Hot Deals</h2>
          <div className="deals-grid">
            {deals.map((deal) => (
              <div key={deal.id} className="deal-card">
                <img 
                  src={deal.image} 
                  alt={deal.name}
                  className="w-full h-48 object-contain mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{deal.name}</h3>
                <p className="text-2xl font-bold text-[#721244] mb-4">${deal.price}</p>
                <div className="cart-controls">
                  <button className="decrease-qty">-</button>
                  <Button className="addtocart">Add to Cart</Button>
                  <button className="increase-qty">+</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const categories = [
  {
    name: "Electronics",
    link: "electronics",
    image: "/lovable-uploads/1722e92e-a100-4aad-8b40-f32d19077504.png"
  },
  {
    name: "Fashion",
    link: "fashion",
    image: "/placeholder.svg"
  },
  {
    name: "Furniture",
    link: "furniture",
    image: "/placeholder.svg"
  },
  {
    name: "Beauty",
    link: "beauty",
    image: "/placeholder.svg"
  }
];

const deals = [
  {
    id: 1,
    name: "Intermediate Size Basketball",
    price: 29.99,
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Unisex Loudon Lite Backpack",
    price: 32.95,
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "iPhone 14",
    price: 399,
    image: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Long Sleeves Shirt for Women",
    price: 32.95,
    image: "/placeholder.svg"
  }
];