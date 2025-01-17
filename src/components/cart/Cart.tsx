import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import CartList from "./CartList";
import CartTotal from "./CartTotal";
import { useCart } from "./useCart";

export default function Cart() {
  const { cartItems, isLoading, fetchCartItems } = useCart();

  useEffect(() => {
    fetchCartItems();
    
    const handleRefreshCart = () => {
      fetchCartItems();
    };
    
    window.addEventListener('refreshCart', handleRefreshCart);
    
    return () => {
      window.removeEventListener('refreshCart', handleRefreshCart);
    };
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-nexa-primary text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-8">
          <CartList 
            items={cartItems} 
            onUpdate={fetchCartItems}
            isLoading={isLoading}
          />
          {cartItems.length > 0 && (
            <CartTotal items={cartItems} />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}