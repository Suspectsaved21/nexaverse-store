import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-nexa-primary to-nexa-secondary text-white">
        <div className="text-center space-y-6 px-4">
          <h1 className="text-5xl font-bold mb-4">Welcome to Nexa</h1>
          <p className="text-xl mb-8">Your one-stop online shop for everything!</p>
          <Link to="/shop">
            <Button size="lg" className="bg-white text-nexa-primary hover:bg-gray-100">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-nexa-primary">Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link 
                key={category.name}
                to={`/shop?category=${category.link}`}
                className="transform transition-transform hover:scale-105"
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="h-48 bg-gray-200">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-nexa-primary">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Deals Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-nexa-primary">Hot Deals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {deals.map((deal) => (
              <div key={deal.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200">
                  <img 
                    src={deal.image} 
                    alt={deal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{deal.name}</h3>
                  <p className="text-2xl font-bold text-nexa-primary mb-4">${deal.price}</p>
                  <Button className="w-full">Add to Cart</Button>
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
    image: "/placeholder.svg"
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