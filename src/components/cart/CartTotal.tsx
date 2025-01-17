import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
  const { toast } = useToast();

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const handleCheckout = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { items },
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to initiate checkout",
      });
    }
  };

  return (
    <div className="pt-4 border-t">
      <div className="flex justify-between items-center">
        <span className="font-semibold">Total:</span>
        <span className="font-semibold">${calculateTotal().toFixed(2)}</span>
      </div>
      <Button 
        className="w-full mt-4"
        onClick={handleCheckout}
      >
        Subscribe - €10.00/month
      </Button>
    </div>
  );
}