import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";
import Cart from "../../cart/Cart";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  username: string | null;
}

interface AuthSectionProps {
  user: any;
  profile: Profile | null;
}

export default function AuthSection({ user, profile }: AuthSectionProps) {
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } else {
      toast({
        title: "Success",
        description: "You have been signed out successfully.",
      });
    }
  };

  return (
    <div className="flex items-center space-x-6">
      <Cart />
      {user ? (
        <>
          <Link to="/profile">
            <Button variant="ghost" size="icon">
              <UserCircle className="h-5 w-5" />
            </Button>
          </Link>
          <span className="text-sm text-gray-600">
            {profile?.username || 'Set username'}
          </span>
          <Button
            variant="outline"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
        </>
      )}
    </div>
  );
}