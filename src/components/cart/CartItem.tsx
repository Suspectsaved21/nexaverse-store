import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CartItemProps {
  item: {
    id: string;
    quantity: number;
    product: {
      name: string;
      price: number;
      image_url: string;
    };
  };
  onUpdate: () => void;
}

export default function CartItem({ item, onUpdate }: CartItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', item.id);

      if (error) throw error;
      onUpdate();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update quantity",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const removeItem = async () => {
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', item.id);

      if (error) throw error;
      onUpdate();
      toast({
        title: "Success",
        description: "Item removed from cart",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove item",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
      <img
        src={item.product.image_url || "/placeholder.svg"}
        alt={item.product.name}
        className="w-16 h-16 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-medium">{item.product.name}</h3>
        <p className="text-sm text-gray-600">${item.product.price.toFixed(2)}</p>
        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            disabled={isUpdating}
            onClick={() => updateQuantity(item.quantity - 1)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            disabled={isUpdating}
            onClick={() => updateQuantity(item.quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="ml-2"
            disabled={isUpdating}
            onClick={removeItem}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}