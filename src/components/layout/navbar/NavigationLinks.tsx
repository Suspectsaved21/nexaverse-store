import { Link } from "react-router-dom";

export default function NavigationLinks() {
  return (
    <div className="hidden md:flex items-center space-x-12">
      <Link to="/" className="text-gray-600 hover:text-nexa-primary transition-colors">Home</Link>
      <Link to="/shop" className="text-gray-600 hover:text-nexa-primary transition-colors">Shop</Link>
      <Link to="/contact" className="text-gray-600 hover:text-nexa-primary transition-colors">Contact</Link>
    </div>
  );
}