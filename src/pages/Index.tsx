import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-nexa-primary mb-4">Welcome to Nexa</h1>
        <p className="text-xl text-gray-600 mb-8">Discover our amazing collection of products</p>
        <Link to="/shop">
          <Button size="lg" className="bg-nexa-primary hover:bg-nexa-secondary">
            Shop Now
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-nexa-primary mb-4">Quality Products</h2>
          <p className="text-gray-600">Carefully curated selection of premium items</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-nexa-primary mb-4">Fast Shipping</h2>
          <p className="text-gray-600">Quick and reliable delivery to your doorstep</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-nexa-primary mb-4">24/7 Support</h2>
          <p className="text-gray-600">Always here to help with your questions</p>
        </div>
      </div>
    </div>
  );
}