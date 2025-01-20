import { Button } from "@/components/ui/button";

interface Deal {
  id: number;
  name: string;
  price: number;
  image: string;
}

const deals = [
  {
    id: 1,
    name: "Intermediate Size Basketball",
    price: 29.99,
    image: "/lovable-uploads/ab7d24b3-7846-4467-a424-f5aa94764e0b.png"
  },
  {
    id: 2,
    name: "Unisex Loudon Lite Backpack",
    price: 32.95,
    image: "/lovable-uploads/381338d8-1507-4f7c-a2a9-eaa9d6af90d7.png"
  },
  {
    id: 3,
    name: "iPhone 14",
    price: 399,
    image: "/lovable-uploads/e72d34fb-ac4a-4ee2-a038-c0d48d24baa5.png"
  },
  {
    id: 4,
    name: "Long Sleeves Shirt for Women",
    price: 32.95,
    image: "/placeholder.svg"
  }
];

const HotDealsSection = () => {
  return (
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
  );
};

export default HotDealsSection;