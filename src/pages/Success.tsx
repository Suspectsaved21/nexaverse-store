import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle } from "lucide-react";

export default function Success() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Payment Successful",
      description: "Thank you for your subscription!",
    });
  }, []);

  return (
    <div className="container max-w-md mx-auto mt-20 p-6 text-center">
      <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
      <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-gray-600 mb-8">
        Thank you for your subscription. Your payment has been processed successfully.
      </p>
      <Button onClick={() => navigate("/")}>
        Return to Home
      </Button>
    </div>
  );
}