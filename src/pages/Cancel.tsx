import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { XCircle } from "lucide-react";

export default function Cancel() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    toast({
      variant: "destructive",
      title: "Payment Cancelled",
      description: "Your payment was cancelled. No charges were made.",
    });
  }, []);

  return (
    <div className="container max-w-md mx-auto mt-20 p-6 text-center">
      <XCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
      <h1 className="text-2xl font-bold mb-4">Payment Cancelled</h1>
      <p className="text-gray-600 mb-8">
        Your payment was cancelled and no charges were made to your card.
      </p>
      <div className="space-y-4">
        <Button onClick={() => navigate("/")}>
          Return to Home
        </Button>
        <Button 
          variant="outline" 
          className="ml-4"
          onClick={() => window.dispatchEvent(new Event('refreshCart'))}
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}