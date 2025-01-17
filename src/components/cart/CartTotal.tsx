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

interface CartTotalProps {
  items: CartItem[];
}

export default function CartTotal({ items }: CartTotalProps) {
  const calculateTotal = () => {
    return items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  return (
    <div className="pt-4 border-t">
      <div className="flex justify-between items-center">
        <span className="font-semibold">Total:</span>
        <span className="font-semibold">${calculateTotal().toFixed(2)}</span>
      </div>
      <Button className="w-full mt-4">
        Proceed to Checkout
      </Button>
    </div>
  );
}