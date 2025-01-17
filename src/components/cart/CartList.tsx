import CartItem from "./CartItem";

interface CartProduct {
  name: string;
  price: number;
  image_url: string | null;
}

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: CartProduct;
}

interface CartListProps {
  items: CartItem[];
  onUpdate: () => void;
  isLoading: boolean;
}

export default function CartList({ items, onUpdate, isLoading }: CartListProps) {
  if (isLoading) {
    return <p>Loading cart...</p>;
  }

  if (items.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItem 
          key={item.id} 
          item={item} 
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}