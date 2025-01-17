import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

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
  const [isLoading, setIsLoading] = useState(false);

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { items },
      });

      if (error) {
        console.error('Checkout error:', error);
        throw error;
      }

      if (!data?.url) {
        throw new Error('No checkout URL received');
      }

      // Redirect to Stripe checkout
      window.location.href = data.url;
    } catch (error) {
      console.error('Detailed error:', error);
      toast({
        variant: "destructive",
        title: "Checkout Error",
        description: "There was a problem initiating checkout. Please try again later.",
      });
    } finally {
      setIsLoading(false);
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
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Proceed to Checkout"}
      </Button>
    </div>
  );
}